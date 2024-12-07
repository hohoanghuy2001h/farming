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
export default function FanScreen() {
  const field = useSelector((state: RootState) => state.field);
  const irrigation = useSelector((state: RootState) => state.controller);
  const dispatch = useDispatch()
  const fieldDetail = useFieldDetail(field.fieldID);
  const temp = useNewestFieldData(fieldDetail.data?.aio_username || "doanladeproject",fieldDetail.data?.aio_key || "aio_VHsC42XjBSHWVrN4GkjxoU7sl3cA", 'temp', fieldDetail.data?.aio_fieldname || '');
  const humidity = useNewestFieldData(fieldDetail.data?.aio_username || "doanladeproject",fieldDetail.data?.aio_key || "aio_VHsC42XjBSHWVrN4GkjxoU7sl3cA", 'humidity', fieldDetail.data?.aio_fieldname || '');

  const [left, setLeft] = useState(irrigation.controller.fan.left);
  const [right, setRight] = useState(irrigation.controller.fan.right);

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
  const toggleLeft = (value: string) => {
    setLeft(value !== "FAN_OFF_0xCC");
    useAddData(fieldDetail.data?.aio_username || "doanladeproject",fieldDetail.data?.aio_key || "aio_VHsC42XjBSHWVrN4GkjxoU7sl3cA", 'fan', value,fieldDetail.data?.aio_fieldname || '')
    dispatch(setLeftFan(value !== "FAN_OFF_0xCC"))
    if(value !== "FAN_OFF_0xCC") {
      showToast('success', 'Turn ON FAN', 'Hệ thông đang bật Fan.')
    }
    else {
      showToast('success', 'Turn OFF FAN', 'Hệ thông đã tắt Fan.')
    }

    //Chưa giải quyết vấn đề khi bật tắt thì tắt cái onActive
  }

  const toggleRight = (value: string) => {
    //Nếu active gửi data cho FAN
    setRight(value !== "FAN_OFF_0xCC")
    useAddData(fieldDetail.data?.aio_username || "doanladeproject",fieldDetail.data?.aio_key || "aio_VHsC42XjBSHWVrN4GkjxoU7sl3cA", 'fan', value,fieldDetail.data?.aio_fieldname || '')
    dispatch(setRightFan(value !== "FAN_OFF_0xCC"))
    if(value !== "FAN_OFF_0xCC") {
      showToast('success', 'Turn ON FAN', 'Hệ thông đang bật Fan.')
    }
    else {
      showToast('success', 'Turn OFF FAN', 'Hệ thông đã tắt Fan.')
    }
  }

  return (
    // temp.loading && humidity.loading ? <LoadingScreen /> :
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style= {styles.mainContainer}>
              <View style={styles.chartContainer}>
                <Gauge data={parseFloat(temp.data) || 27.1} title='Temperature' unit="°C" label='temperature'/>
                <Gauge data={parseFloat(humidity.data) || 73} title='Humidity' label='humidity'/>
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
                      toggleLeft(value === true ? "FAN_ON_0xCC": "FAN_OFF_0xCC")
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
                      toggleRight(value === true? "FAN_ON_0xCC": "FAN_OFF_0xCC")
                    }} 
                    trackColor={{false: '#D9D9D9' , true: '#13852F'}}
                  />
                </View>
              </View>
            </View>
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
  }
});
