import { Text, View, StyleSheet, Image ,Dimensions, Switch} from 'react-native';
import React, { useState, useEffect } from 'react';
// import Gauge from '@/components/shared/Chart/Gauge';
import { windowHeight, windowWidth } from '@/utils/Dimensions';
import { useAddData, useNewestFieldData } from '@/hooks/data';
import { useRef, useCallback, useMemo } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import { useUpdateAllSchedulewithOnActive } from '@/hooks/schedule';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useFieldDetail } from '@/hooks/field';
import LoadingScreen from '@/screen/loading/loading.screen';
import { setRightFan, setLeftFan} from '@/store/controllerReducer';
import Gauge from '@/components/shared/Chart/Gauge';
import Toast from 'react-native-toast-message';
import { setHumid, setTemp } from '@/store/feedReducer';
import ModalQuestion from '@/components/shared/Modal/ModalQuestion';
export default function FanScreen() {
  const field = useSelector((state: RootState) => state.field);
  const feed = useSelector((state: RootState) => state.feed);
  
  const irrigation = useSelector((state: RootState) => state.controller);
  const dispatch = useDispatch()
  const temp = useNewestFieldData(field.fieldID, "Temperature");
  const humid = useNewestFieldData(field.fieldID, "Humidity");

  const [left, setLeft] = useState(irrigation.controller.fan.left);
  const [right, setRight] = useState(irrigation.controller.fan.right);
  const [tempData, setTempData] = useState(Number(feed.feed[0].value) | 0);
  const [humidData, setHumidData] = useState(Number(feed.feed[1].value) | 0);
  const [visibleAcceptManual, setVisibleAcceptManual] = useState(false);


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
    if(temp.data) {
      dispatch(setTemp({
        value: temp.data?.value,
        timeUpdate: new Date().toLocaleString(),
      }))
    }
  }, [temp.data]);
  
  useEffect(() => {
    if(humid.data) {
      dispatch(setHumid({
        value: humid.data?.value,
        timeUpdate: new Date().toLocaleString(),
      }))

    }
  }, [humid.data]);
    useEffect(() => {
      setTempData(feed.feed[0].value);
      setHumidData(feed.feed[1].value);
    }, [feed])

  const toggleLeft = (value: boolean) => {
    setLeft(value);
    useAddData(value, field.fieldID, "fan");
    dispatch(setLeftFan(value))
    if(value) {
      showToast('success', 'Turn ON FAN', 'Hệ thông đang bật Fan.')
    }
    else {
      showToast('success', 'Turn OFF FAN', 'Hệ thông đã tắt Fan.')
    }

    //Chưa giải quyết vấn đề khi bật tắt thì tắt cái onActive
  }

  const toggleRight = (value: boolean) => {
    //Nếu active gửi data cho FAN
    setRight(value)
    useAddData(value, field.fieldID, "fan");
    dispatch(setRightFan(value))
    if(value) {
      showToast('success', 'Turn ON FAN', 'Hệ thông đang bật Fan.')
    }
    else {
      showToast('success', 'Turn OFF FAN', 'Hệ thông đã tắt Fan.')
    }
  }

  return (
    temp.loading && humid.loading ? <LoadingScreen /> :
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style= {styles.mainContainer}>
              <View style={styles.chartContainer}>
                <Gauge data={tempData || 0} title='Temperature' unit="°C" label='Temperature'/>
                <Gauge data={humidData|| 0} title='Humidity' label='Humidity'/>
              </View>
              <View style={styles.imageContainer}>
                {
                  !left && !right ? 
                    <Image 
                      style={styles.image} 
                      source={require('@/assets/images/Fan.png')}
                    /> :
                  left? 
                    <Image 
                        style={styles.image} 
                        source={require('@/assets/images/FanLefttoRight.png')}
                    />:
                  <Image 
                      style={styles.image} 
                      source={require('@/assets/images/FanRighttoLeft.png')}
                  />
                }
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.btnItem}>
                <View style={styles.btnTitleContain}>
                  <View style={styles.btnTitleRight}>
                    <Text style={styles.btnTitle}>Rotate Left</Text>
                    <Text style={styles.subbtnTitle}>Help decrease the Humidity.</Text>
                  </View>
                </View>
                <View>
                  <Switch 
                    value={left} 
                    style = {styles.button}
                    onValueChange={(value) => {
                      toggleLeft(value)
                    }} 
                    trackColor={{false: '#D9D9D9' , true: '#13852F'}}
                  />
                </View>
              </View>
              <View style={styles.btnItem}>
                <View style={styles.btnTitleContain}>
                  <View style={styles.btnTitleRight}>
                    <Text style={styles.btnTitle}>Rotate Right</Text>
                    <Text style={styles.subbtnTitle}>Help decrease the Temperature.</Text>
                  </View>
                  <View style={styles.btnTitleLeft}>

                  </View>
                </View>
                <View>
                  <Switch 
                    value={right} 
                    style = {styles.button}
                    onValueChange={(value) => {
                      toggleRight(value)
                    }} 
                    trackColor={{false: '#D9D9D9' , true: '#13852F'}}
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
          <ModalQuestion isOpen = {visibleAcceptManual} setIsOpen={setVisibleAcceptManual} 
                submit={() => {
                  if(left) {
                    toggleLeft(false);
                  }
                  else if(right) {
                    toggleRight(false);
                  }
                  setVisibleAcceptManual(false);
                }}
          >
            {
              left ? 
              <View>
                <Text style={styles.modalTitle}>
                    { tempData > field.plantStage.maxTemperature ? 'Nhiệt độ cao' : tempData < field.plantStage.minTemperature ? 'Nhiệt độ thấp' : 'Nhiệt độ thích hợp'}
                </Text>
                <View style={styles.datePickerWrapper}>
                    <Text>                  
                      { 
                        tempData > field.plantStage.maxTemperature ? `Nhiệt độ của nông trại đang rất cao \n bạn vẫn muốn tắt quạt chứ?` : 
                        tempData < field.plantStage.minTemperature ? `Nhiệt độ nông trại đang rất thấp \n hãy tắt quạt đi` : 
                        `Đang trong ngưỡng nhiệt độ thích hợp \n hãy tắt quạt đi.`
                      }
                    </Text>
                </View>
              </View>:
               <View>
                <Text style={styles.modalTitle}>
                    { humidData > field.plantStage.maxTemperature ? 'Độ ẩm không khí cao' : humidData < field.plantStage.minHumidity ? 'Độ ẩm không khí thấp' : 'Độ ẩm không khí thích hợp'}
                </Text>
                <View style={styles.datePickerWrapper}>
                    <Text>                  
                      { 
                        humidData > field.plantStage.maxHumidity ? `Độ ẩm không khí của nông trại đang rất cao \n bạn vẫn muốn tắt quạt chứ?` : 
                        humidData < field.plantStage.minHumidity ? `Độ ẩm không khí nông trại đang rất thấp \n hãy tắt quạt đi` : 
                        `Đang trong ngưỡng Độ ẩm không khí thích hợp \n hãy tắt quạt đi.`
                      }
                    </Text>
                </View>
              </View>
            }
          </ModalQuestion>
          </View>
        </View>
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
    right: '-35%',
    top: 40,
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
