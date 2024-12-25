import { Text, View, StyleSheet, Image ,Dimensions, Switch, Button} from 'react-native';
import React, { useState, useEffect } from 'react';
// import Gauge from '@/components/shared/Chart/Gauge';
import { windowHeight, windowWidth } from '@/utils/Dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAddData, useNewestFieldData } from '@/hooks/data';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useCallback, useMemo } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import DatePickerModal from '@/components/shared/DatePickerModal';
import { useUpdateAllSchedulewithOnActive } from '@/hooks/schedule';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useFieldDetail } from '@/hooks/field';
import LoadingScreen from '@/screen/loading/loading.screen';
import { setManualIrrgation, setAutoIrrgation } from '@/store/controllerReducer';
import Gauge from '@/components/shared/Chart/Gauge';
import Toast from 'react-native-toast-message';
import notificationsTemplate from '@/constants/notifications.template';
import ModalQuestion from '@/components/shared/Modal/ModalQuestion';
import { setSoil } from '@/store/feedReducer';
export default function PumpScreen() {
  const field = useSelector((state: RootState) => state.field);
  const feed = useSelector((state: RootState) => state.feed);
  const irrigation = useSelector((state: RootState) => state.controller);
  const dispatch = useDispatch()
  const soil = useNewestFieldData(field.fieldID, "Soil moisturize");
  const [auto, setAuto] = useState(irrigation.controller.pump.auto);
  const [manual, setManual] = useState(irrigation.controller.pump.manual);
  const [visibleAcceptManual, setVisibleAcceptManual] = useState(false);
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['100%'], []); 
  const [soildData, setSoildData] = useState(Number(feed.feed[3].value) | 0);
  const [schedule, setSchedule] = useState(false);
  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime: 3000,
      autoHide: true,
      position:'top',
    });
  };
  useEffect(() => {
    if(soil.data) {
      dispatch(setSoil({
        value: soil.data?.value,
        timeUpdate: new Date().toLocaleString(),
      }))
      if(schedule) {
        unactivePumpAuto()
      }
    }
  }, [soil.data]);

  useEffect(() => {
    setSoildData(feed.feed[3].value);
  }, [feed])


  const toggleAuto = (value: boolean) => {
    setAuto(value);
    useUpdateAllSchedulewithOnActive(value);
    dispatch(setAutoIrrgation(value))
    //Chưa giải quyết vấn đề khi bật tắt thì tắt cái onActive
  }
  const activePumpAuto = () => {
    useAddData(true, field.fieldID, "pump");
    showToast('success', 'Turn ON PUMP', 'Hệ thông đang bật pump');
    setSchedule(true);
  }
  const unactivePumpAuto = () => {
    if(soildData > 40) {
      useAddData(false, field.fieldID, "pump");
      showToast('error', 'Turn OFF PUMP', 'Hệ thông đã tắt pump');
      setSchedule(false);
    }
  }
  const activePumpManual = () => {
    useAddData(true, field.fieldID, "pump");
    showToast('success', 'Turn ON PUMP', 'Hệ thông đang bật pump');
  }
  const unactivePumpManual = () => {
    useAddData(false, field.fieldID, "pump");
    showToast('error', 'Turn OFF PUMP', 'Hệ thông đã tắt pump');
  }
  const toggleManual = (value: boolean) => {
    setManual(value)
    if(value === true) activePumpManual();
    else unactivePumpManual();
    dispatch(setManualIrrgation(value))
  }
  const toggleManualLogic = (value: boolean) => {
    if(value === true) {
      if(soildData < field.plantStage.maxSoil ) {
        toggleManual(value)
      }
      else {
        setVisibleAcceptManual(true)
      }
    } 
    else {
      if(soildData > field.plantStage.minSoil) {
        toggleManual(value)
      }
      else {
        setVisibleAcceptManual(true)
      }
    }
  }

  //Đây là hàm mở màn hình schedule - irrigation
  const openPresentBottomSheetModal = useCallback(() => {
    BottomSheetModalRef.current?.present();
    BottomSheetModalRef.current?.snapToIndex(0);
  }, []);
  // Hàm đóng BottomSheetModal
  const handleDismissModal = () => {
    BottomSheetModalRef.current?.dismiss();
  };
  //Đây là hàm onclick để mở schedule
  const onClickScheduleBtn = () => {
    openPresentBottomSheetModal();
  }
  //Đây là hàm mở tắt chế độ schedule irrigation

  return (
    // soil.loading && irrigationData.loading ? <LoadingScreen /> :
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style= {styles.mainContainer}>
              <View style={styles.chartContainer}>
                <Gauge data={feed?.feed[3].value || 0}   title='Soil Moiturizer' label='Soil moisturize'/>
              </View>
              <View style={styles.imageContainer}>
              <Image 
                  style={styles.image} 
                  source={require('@/assets/images/Watering.png')}
              />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.btnItem}>
                <View style={styles.btnTitleContain}>
                  <View style={styles.btnTitleRight}>
                    <Text style={styles.btnTitle}>Automic</Text>
                    <Text style={styles.subbtnTitle}>Next irrigates in 8:00</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.btnTitleLeft} 
                    onPress={onClickScheduleBtn}
                  >
                    <Image 
                      source={require('@/assets/images/setting.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Switch 
                    value={auto} 
                    style = {styles.button}
                    onValueChange={(value) => {
                      toggleAuto(value)
                    }} 
                    trackColor={{false: '#D9D9D9' , true: '#13852F'}}
                  />
                </View>
              </View>
              <View style={styles.btnItem}>
                <View style={styles.btnTitleContain}>
                  <View style={styles.btnTitleRight}>
                    <Text style={styles.btnTitle}>Manually</Text>
                    <Text style={styles.subbtnTitle}>System will turn of after the soil moisture is enough.</Text>
                  </View>
                  <View style={styles.btnTitleLeft}>

                  </View>
                </View>
                <View>
                  <Switch 
                    value={manual} 
                    style = {styles.button}
                    onValueChange={(value) => {
                      toggleManualLogic(value)
                    }} 
                    trackColor={{false: '#D9D9D9' , true: '#13852F'}}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <BottomSheetModal 
            ref={BottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle ={styles.bottomModal}
            enablePanDownToClose={true}
            onDismiss={handleDismissModal} // Xử lý khi modal đóng
          >
            <BottomSheetView style={styles.contentContainer}>
              <DatePickerModal activePumpAuto={activePumpAuto}/>
            </BottomSheetView>
          </BottomSheetModal>
          <ModalQuestion isOpen = {visibleAcceptManual} setIsOpen={setVisibleAcceptManual} 
                submit={() => {
                  //Turn on when
                  if(soildData > field.plantStage.maxSoil) {
                    toggleManual(true)
                  }
                  //Turn off when
                  else if (soildData < field.plantStage.minSoil) {
                    toggleManual(false)
                  }
                  setVisibleAcceptManual(false);
                }}
          >
            <View>
              <Text style={styles.modalTitle}>
                  { soildData > field.plantStage.maxSoil ? 'Vượt quá độ ẩm' : soildData < field.plantStage.minSoil ? 'Chưa đủ ẩm' : ''}
              </Text>
              <View style={styles.datePickerWrapper}>
                  <Text>                  
                    { soildData > field.plantStage.maxSoil ? `Độ ẩm đang vượt quá cho phép \nbạn vẫn muốn bật máy bơm?` : 
                      soildData < field.plantStage.minSoil ? `Độ ẩm đang chưa đủ \nbạn vẫn muốn tắt máy bơm?` : ''
                    }
                  </Text>
              </View>
            </View>
          </ModalQuestion>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: windowWidth,
  },
  wrapper: {
    width: windowWidth - 40,
    marginHorizontal: 'auto',
    gap: 30,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    minHeight: windowHeight *0.5,
  },
  imageContainer: { 
    position: 'absolute',
    right: '-40%',
    width: 370,
    bottom: -20,
  },
  image: {},
  chartContainer: {
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  btnItem: {
    borderWidth: 1,
    borderColor: '#BCBEC0',
    borderRadius: 10,
    width: windowWidth / 2 - 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 30,
  },
  btnTitleContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTitleRight:{},
  btnTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5A1C',
  },
  subbtnTitle: {
    color: '#BFBFBB',
    fontSize: 10,
  },
  btnTitleLeft:{},
  button: {},
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bottomModal: {
    borderRadius: 50, 
    backgroundColor: '#C6E9CA',
    // Shadow cho iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // Shadow cho Android
    elevation: 5, 
  }, 
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red'
  },
  datePickerWrapper: {
    marginBottom: 20,
    gap: 20,
    justifyContent: 'center',
  },
});
