import { windowHeight, windowWidth } from '@/utils/Dimensions';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture} from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useRef, useState  } from 'react';
import { StatusBar } from 'react-native';
import {StyleSheet, TouchableOpacity, View, AppState, Platform  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createField } from '@/hooks/field';
const QrCodeScreen = () => {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);  // Tham chiếu tới CameraView
  useEffect(() => {
    requestPermission();
  },[]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false; // Reset khóa QR khi ứng dụng hoạt động lại
      }
      appState.current = nextAppState;
    });
  
    return () => {
      subscription.remove();
    };
  }, []);

  const redictNewPage = () => {//Đây là function điều hướng trang
    router.back();
  };
  const create = async (data: any) => {
    try {
      // Phân tích chuỗi JSON từ data
      const parsedData = JSON.parse(data);

      // Kiểm tra và truyền các giá trị cần thiết vào createField
      if (parsedData.aio_fieldname && parsedData.aio_key && parsedData.aio_username && parsedData.device) {
        await createField(
          parsedData.aio_fieldname,
          parsedData.aio_key,
          parsedData.aio_username,
          parsedData.device,
        );
        redictNewPage();
      } else {
        console.warn("QR code không hợp lệ hoặc thiếu dữ liệu.");
      }
    } catch (err) {
      console.error("Lỗi phân tích JSON từ mã QR:", err);
    }
  }

  return (
    <View style={styles.container}>     
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView style={styles.camera} 
          facing={facing} 
          ref={cameraRef}
          onBarcodeScanned={ async ({data}) => {
            if (data) {
              create(data)
            }
          }}
      >
      </CameraView>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth,
    marginVertical: 40,
    marginHorizontal: 20,
  },
  frame: {
    position: 'absolute',
    width: 300,
    height: 400,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: 'transparent', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  buttonLibrary: {
    position: 'relative',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTake: {
    position: 'relative',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  cameraIcon: {
    position: 'absolute',
    zIndex: 1,
  }, 
  buttonReverse: {
    position: 'relative',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconReverse: {
    color: 'white',
  },
  overLay: {
    width: windowWidth + 200,
    height: windowHeight,
    position: 'absolute',
    opacity: 0.5, // Làm mờ toàn bộ thành phần
    backgroundColor: 'black',
    top: 0,
  }, 
  childOverLay: {
    zIndex: 2,
    width: 300,
    height: 300,
    backgroundColor: 'white',
  }
});
export default QrCodeScreen