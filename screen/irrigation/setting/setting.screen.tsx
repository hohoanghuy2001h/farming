import { Text, View, StyleSheet, Image ,Dimensions, Switch} from 'react-native';
import React, { useState, useEffect } from 'react';
import Gauge from '@/components/shared/Chart/Gauge';
import { windowHeight, windowWidth } from '@/utils/Dimensions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNewestFieldData } from '@/hooks/data';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useCallback, useMemo } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import DatePickerModal from '@/components/shared/DatePickerModal';
import { useUpdateAllSchedulewithOnActive } from '@/hooks/schedule';
export default function SettingScreen() {
  const {data} = useNewestFieldData('field2'); //field humidity
  const [manual, setManual] = useState(false);
  const [auto, setAuto] = useState(false);
  const [humidity, setHumidity] = useState(0);
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['100%'], []); 


  //Hàm lấy API độ ẩm         //CODE THÊM NHA
  useEffect(() => {
    setHumidity(data.field);
  }, [humidity, data])
  

  const toggleAuto = (value: boolean) => {
    setAuto(value);
    useUpdateAllSchedulewithOnActive(value);
    //Chưa giải quyết vấn đề khi bật tắt thì tắt cái onActive
  }

  const toggleManual = (value: boolean) => {
    setManual(value);
    //Nếu active gửi data cho pump
    if(value === true) {

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
  <GestureHandlerRootView>
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style= {styles.mainContainer}>
            <View style={styles.chartContainer}>
              <Gauge data={humidity || 0} />
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
                    setAuto(value)
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
                    setManual(value)
                    toggleManual(value)
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
            <DatePickerModal />
          </BottomSheetView>
        </BottomSheetModal>
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
