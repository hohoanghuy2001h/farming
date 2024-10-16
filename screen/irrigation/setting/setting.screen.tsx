import { Text, SafeAreaView, StyleSheet, Image ,Dimensions, Switch} from 'react-native';
import React, { useState, useEffect } from 'react';
import Gauge from '@/components/shared/Chart/Gauge';
import { windowHeight, windowWidth } from '@/utils/Dimensions';

const screenWidth = Dimensions.get('window').width;

export default function SettingScreen() {
  const [isOn, setIsOn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [isRunning, setIsRunning] = useState(false); // Trạng thái của timer

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
  return (
  <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.wrapper}>
      <SafeAreaView style= {styles.mainContainer}>
        <SafeAreaView style={styles.chartContainer}>
          <Gauge data={75} />
        </SafeAreaView>
        <SafeAreaView style={styles.imageContainer}>
        <Image 
            style={styles.image} 
            source={require('@/assets/images/Watering.png')}
        />
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Chế độ tưới nước thủ công: {isOn? 'Turn ON': 'Turn OFF'}</Text>
          <Switch 
            value={isOn} 
            style = {styles.button}
            onValueChange={(value) => {
              setIsOn(value)
              setIsRunning(value)
            }} 
            trackColor={{false: '#D9D9D9' , true: '#13852F'}}
          />
        {
          isOn ? 
          <SafeAreaView style={styles.timeCounterContainer}>
            <Text style={styles.timeText}>Hệ thống tưới nước sẽ tự động tắt sau:</Text>
            <Text style={styles.timeCount}>{minutes} : {seconds}</Text>
          </SafeAreaView> :<></>
        }
      </SafeAreaView>
    </SafeAreaView>
  </SafeAreaView>
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
    gap: 40, 
    marginTop: 25,
  },
  button: {
    transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }], // Phóng to theo cả chiều X và Y
    margin: 'auto',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E5A1C',
  },
  timeCounterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: screenWidth - 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#21963A',
    gap: 10,
  },
  timeText: {

  },
  timeCount: {
    margin: 'auto',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFCC32',
  },
});
