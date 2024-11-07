import { Text, SafeAreaView, StyleSheet, Image ,Dimensions, Switch} from 'react-native';
import React, { useState, useEffect } from 'react';
import Gauge from '@/components/shared/Chart/Gauge';
import { windowHeight, windowWidth } from '@/utils/Dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNewestFieldData } from '@/hooks/data';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useCallback, useMemo } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import DatePickerModal from '@/components/shared/DatePickerModal';
export default function SettingScreen() {
  const {data} = useNewestFieldData('field2'); //field humidity
  const [isOn, setIsOn] = useState(false);
  const [isSchedualing, setIsSchedualing] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [isRunning, setIsRunning] = useState(false); // Trạng thái của timer
  const [visibilityturnOn, setVisibilityturnOn] = useState(false);
  const [visibilityturnOff, setVisibilityturnOff] = useState(false);
  const [humidity, setHumidity] = useState(0);
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['100%'], []); 
  const [isOpen, setIsOpen] = useState(false);


  //Hàm lấy API độ ẩm         //CODE THÊM NHA
  useEffect(() => {
    setHumidity(data.field);
  }, [humidity, data])
  

  //Đây là hàm tính đếm ngược
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null; 
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }
    if (seconds === 0) {
      setMinutes(prevMinutes => prevMinutes - 1);
      setSeconds(59);
      if(minutes === 0){
        if(interval !== null)
        clearInterval(interval);
        resetTimer();
      }
    }
    if(!isRunning) resetTimer()
    return () => {
      if (interval !== null) clearInterval(interval); // Xóa interval khi unmount
    };
  }, [isRunning, seconds]);
  const resetTimer = () => {
    setSeconds(59);
    setMinutes(5);
    setIsRunning(false);
    setIsOn(false);
  };

  //Đây là hàm bật nước
  const turnOn = () => {
    setIsOn(true);
    setVisibilityturnOn(false);
  }
  //Đây là hàm tắt nước
  const turnOff = () => {
    setIsOn(false);
    setVisibilityturnOff(false);
  }
  //Đây là hàm tắt lên lịch
  const turnOffSchedule = () => {
    setIsSchedualing(false);
  }
  //Đây là hàm bật lên lịch
  const turnOnSchedule = () => {
    setIsSchedualing(true);
  }

  //Đây là hàm mở màn hình schedule - irrigation
  const openPresentBottomSheetModal = useCallback(() => {
    BottomSheetModalRef.current?.present();
    BottomSheetModalRef.current?.snapToIndex(0);
    setIsOpen(true);
  }, []);
  // Hàm đóng BottomSheetModal
  const handleDismissModal = () => {
    BottomSheetModalRef.current?.dismiss();
    setIsOpen(false);
  };
  //Đây là hàm onclick để mở schedule
  const onClickScheduleBtn = () => {
    openPresentBottomSheetModal();
  }
  //Đây là hàm mở tắt chế độ schedule irrigation

  return (
  <GestureHandlerRootView>
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.wrapper}>
          <SafeAreaView style= {styles.mainContainer}>
            <SafeAreaView style={styles.chartContainer}>
              <Gauge data={humidity || 0} />
            </SafeAreaView>
            <SafeAreaView style={styles.imageContainer}>
            <Image 
                style={styles.image} 
                source={require('@/assets/images/Watering.png')}
            />
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.buttonContainer}>
            <SafeAreaView style={styles.btnItem}>
              <SafeAreaView style={styles.btnTitleContain}>
                <SafeAreaView style={styles.btnTitleRight}>
                  <Text style={styles.btnTitle}>Automic</Text>
                  <Text style={styles.subbtnTitle}>Next irrigates in 8:00</Text>
                </SafeAreaView>
                <TouchableOpacity 
                  style={styles.btnTitleLeft} 
                  onPress={onClickScheduleBtn}
                >
                  <Image 
                    source={require('@/assets/images/setting.png')}
                  />
                </TouchableOpacity>
              </SafeAreaView>
              <SafeAreaView>
                <Switch 
                  value={isSchedualing} 
                  style = {styles.button}
                  onValueChange={(value) => {
                    setIsSchedualing(value)
                  }} 
                  trackColor={{false: '#D9D9D9' , true: '#13852F'}}
                />
              </SafeAreaView>
            </SafeAreaView>
            <SafeAreaView style={styles.btnItem}>
              <SafeAreaView style={styles.btnTitleContain}>
                <SafeAreaView style={styles.btnTitleRight}>
                  <Text style={styles.btnTitle}>Manually</Text>
                  <Text style={styles.subbtnTitle}>System will turn of after</Text>
                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 10}}>{minutes}:{seconds}</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.btnTitleLeft}>

                </SafeAreaView>
              </SafeAreaView>
              <SafeAreaView>
                <Switch 
                  value={isOn} 
                  style = {styles.button}
                  onValueChange={(value) => {
                    setIsOn(value)
                    setIsRunning(value)
                  }} 
                  trackColor={{false: '#D9D9D9' , true: '#13852F'}}
                />
              </SafeAreaView>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView>
        <BottomSheetModal 
          ref={BottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle ={styles.bottomModal}
          enablePanDownToClose={true}
          onDismiss={handleDismissModal} // Xử lý khi modal đóng
        >
          <BottomSheetView style={styles.contentContainer}>
            <DatePickerModal 
              isScheduling ={isSchedualing}
              setIsScheduling={setIsSchedualing}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </SafeAreaView>
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
  }
});
