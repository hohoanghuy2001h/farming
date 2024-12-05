import { windowHeight, windowWidth } from '@/utils/Dimensions';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture} from 'expo-camera';
import { useEffect, useRef, useState  } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Image  } from 'react-native';
import diseaseAPI from '@/constants/disease.api';
import Icon from 'react-native-vector-icons/FontAwesome';
import uploadImage from '@/hooks/diagnose';
import ModalNotice from '@/components/shared/Modal/ModalNotice';
import { ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { router } from 'expo-router';
const DiagnoseScreen = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [visibleModal, setVisibleModal] = useState(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<CameraView | null>(null);  // Tham chiếu tới CameraView
  const [visibleText, setVisibleText] = useState(true);
  const [disease, setDisease] = useState([]);
  const [imagePicker, setImagePicker] = useState<string | null>(null);

  useEffect(() => {
    // Dùng setTimeout để thay đổi trạng thái sau 5 giây
    const timer = setTimeout(() => {
      setVisibleText(false);
    }, 5000);

    // Dọn dẹp (cleanup) để tránh memory leak khi component bị unmount
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    requestPermission();
  },[]);
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync();  // Chụp ảnh
        if (picture) {  // Kiểm tra nếu picture không phải là undefined
          setPhoto(picture);  // Lưu ảnh vào state
        }
      } catch (err) {
        console.log('Error while taking the picture: ', err);  // Xử lý lỗi
      }
    }
  };

  const diagnose = async () => {
    if(photo) {
      await uploadImage(photo.uri, setDisease, setVisibleModal);
    }
    if(imagePicker) {
      await uploadImage(imagePicker, setDisease, setVisibleModal);
    }
  }
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));  // Đổi camera giữa trước và sau
  };

  const redictNewPage = (id: string) => {//Đây là function điều hiếu trang
    setVisibleModal(false);
    router.push({
      pathname: `/(routes)/disease/[id]`,
      params: { id: id },
    });
  };


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImagePicker(result.assets[0].uri);
    }
    console.log(imagePicker)
  };
  return (
    <View style={styles.container}>
      {!photo && !imagePicker ?       
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <View style={styles.frame}>
            {visibleText && <Text style={styles.text}>Vui lòng đặt lá ngay khung hình.</Text>}
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.buttonTake} onPress={pickImage}>
              <Icon name="photo" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTake} onPress={takePicture}>
              <Icon name="circle" size={60} color="gray" />
              <Icon name="camera" size={25} color="white" style={styles.cameraIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonReverse} onPress={toggleCameraFacing}>
              <Icon name="refresh" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </CameraView> : 
      <View>
        <Image source={{ uri: imagePicker? imagePicker: photo?.uri }} style={styles.image} />
        <View style={styles.buttonContainerForImage}>
          <View style={styles.buttonWrapperForImage}>
            <TouchableOpacity style={styles.buttonTake} onPress={() => {
              setPhoto(null) 
              setImagePicker(null)
            }}>
              <Icon name="circle" size={60} color="gray" />
              <Icon name="camera" size={25} color="white" style={styles.cameraIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonReverse}  onPress={diagnose}>
              <Image source={require('@/assets/images/diagnose.png')} style={{width: 50, height: 50}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      }
        <ModalNotice isOpen = {visibleModal} setIsOpen={setVisibleModal}>
          <View style={styles.modalTitleWrapper}>
            {
              disease.length === 0? 
              <View style={styles.modalTitleTextWrapper}>       
                <Icon name="check-circle" size={30} color="#4CAF50" />       
                <Text style={[styles.modalTitleText, {color: "#4CAF50"}]}>SỨC KHỎE TỐT</Text>
              </View> :
              <View style={styles.modalTitleTextWrapper}>  
                <Icon name="exclamation-triangle" size={30} color="#FF0000" />       
                <Text style={[styles.modalTitleText, {color: "#FF0000"}]}>CÂY MẮC BỆNH</Text>
              </View>
            }
            <View>
              <TouchableOpacity style={styles.buttonClose} onPress={() => setVisibleModal(false)}>
                <Icon name="circle" size={40} color="#F5F5F5" />
                <Icon name="close" size={25} color="white" style={styles.cameraIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.modalTextWrapper}>
            {
              disease.length === 0 ? 
              <View style={styles.textWrapper}>            
                <Text style={styles.textModal}>Không có phát hiện được bệnh ở cây.</Text>
                <Image source={require('@/assets/images/strong.png')} style={{margin: 'auto'}}/>
              </View> :
              <View style={styles.textWrapper}>  
                <Image />
                <View style ={styles.contentModalText}>
                  <Text style={{fontWeight: 'bold'}}>BỆNH MẮC PHẢI: </Text>
                  <Text>{disease[0]["class"]}</Text>
                </View>
                <TouchableOpacity onPress={() => redictNewPage('1')}><Text style={styles.textLink}>Xem thông tin chi tiết tại đây</Text></TouchableOpacity>
              </View>
            }
          </View>
        </ModalNotice>
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
  image: {
    width: windowWidth,
    height: windowHeight,
  },
  buttonContainerForImage: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginVertical: 64,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 0,
  },
  buttonWrapperForImage: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  }, 
  modalTitleTextWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  buttonClose: {
    position: 'relative',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTextWrapper: {

  },
  textWrapper: {
    justifyContent: 'center',
    gap: 30,
  }, 
  textModal: {
    fontSize: 16,
    textAlign: 'center',
  },
  contentModalText: {
    flexDirection: 'row',
  }, 
  imageDisease: {
    width: '100%',
    height: 114,
    borderRadius: 20,
  },
  textLink: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#90CAF9',
  }
});
export default DiagnoseScreen