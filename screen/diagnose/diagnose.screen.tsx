import { windowHeight, windowWidth } from '@/utils/Dimensions';
import { CameraView, CameraType, useCameraPermissions, CameraCapturedPicture} from 'expo-camera';
import { useEffect, useRef, useState  } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert, Image, ImageBackground  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import uploadImage from '@/hooks/diagnose';
import ModalNotice from '@/components/shared/Modal/ModalNotice';
import * as ImagePicker from 'expo-image-picker';
import { findDisease } from '@/utils/findDisease';

import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getCurrentHealth } from '@/store/fieldReducer';
import { useAddNotification } from '@/hooks/notification';
import notificationsTemplate from '@/constants/notifications.template';
import sendEmail from '@/utils/gmailPush';
const DiagnoseScreen = () => {
  const field = useSelector((state: RootState) => state.field);
  const dispatch = useDispatch();
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [visibleModal, setVisibleModal] = useState(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<CameraView | null>(null);  // Tham chiếu tới CameraView
  const [visibleText, setVisibleText] = useState(true);
  const [disease, setDisease] = useState([]);
  const [imagePicker, setImagePicker] = useState<string | null>(null);
  const [diseaseDetail, setDiseaseDetail] = useState<diseaseItem | null>(null);
  useEffect(() => {
    // Dùng setTimeout để thay đổi trạng thái sau 5 giây
    const timer = setTimeout(() => {
      setVisibleText(false);
    }, 50000);

    // Dọn dẹp (cleanup) để tránh memory leak khi component bị unmount
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    requestPermission();
  },[]);
  useEffect(() =>{
    if(disease.length !== 0 )  {
      setDiseaseDetail(findDisease(disease[0]["class"]))
    }
  }, [disease])
  useEffect(() => {
    if(diseaseDetail) {
      dispatch(getCurrentHealth(diseaseDetail.title))
      useAddNotification({
        label: 'Disease',
        content: 'Đã phát hiện bệnh ở cây!!!',
        date: new Date(),
        image: '',
        isRead: false,
        navigateLink: '/(routes)/controller/diseases',
        fieldID: field.fieldID,
      })
      sendEmail('Detect Disease', field.fieldID, new Date().toLocaleDateString(),`Đã phát hiện bệnh ${diseaseDetail.title} ở cây!!!`, "Hãy vào app kiểm tra.");

    }
  }, [diseaseDetail])
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
    if (!result.canceled) {
      setImagePicker(result.assets[0].uri);
    }
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
              diseaseDetail === null ? 
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
              diseaseDetail === null ? 
              <View style={styles.textWrapper}>            
                <Text style={styles.textModal}>Không có phát hiện được bệnh ở cây.</Text>
                <Image source={require('@/assets/images/strong.png')} style={{margin: 'auto'}}/>
              </View> :
              <View style={styles.textWrapper}>  
                <View style={styles.imageDiseaseWrapper}>
                  <Image source={diseaseDetail.image} resizeMode='contain'/>
                </View>
                <View style ={styles.contentModalText}>
                  <Text style={{fontWeight: 'bold', color: '#4CAF50'}}>BỆNH MẮC PHẢI: </Text>
                  <Text>{diseaseDetail.title}</Text>
                </View>
                <TouchableOpacity onPress={() => redictNewPage(diseaseDetail._id)}><Text style={styles.textLink}>Xem thông tin chi tiết tại đây</Text></TouchableOpacity>
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
  }, 
  imageDiseaseWrapper: {
    width: '100%',
    overflow:'hidden',
    height: 150,
    borderRadius: 20,
  }
});
export default DiagnoseScreen