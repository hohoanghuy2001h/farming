import { StyleSheet, Text, SafeAreaView, ImageBackground  } from 'react-native'
import React from 'react'
import useWeather from '@/hooks/useWeather'
const CardWeather = () => {
  const {forecast,loading}  = useWeather();
  return (
    loading? 
    <SafeAreaView>
      <Text>Loading</Text>
    </SafeAreaView>
  :    
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        style={styles.content}
        source={require('@/assets/images/weather/bg-Cloudy.png')}
      >
        <SafeAreaView style={styles.title}>
          <Text style={styles.bigText}>{Math.round(forecast?.temperature? forecast?.temperature : 0)}°C</Text>
          <Text style={styles.smallText}>{forecast?.type}</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.subtitle}>
          <SafeAreaView style={styles.subtitleItem}>
            <Text style={styles.titleData}>Humidity</Text>
            <SafeAreaView style={styles.dataWrapper}>
              <Text style={styles.data}>{Math.round(forecast?.humidity? forecast?.humidity : 0)}%</Text>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.subtitleItem}>
            <Text style={styles.titleData}>Tempurate</Text>
            <SafeAreaView style={styles.dataWrapper}>
              <Text style={styles.data}>{Math.round(forecast?.temperature? forecast?.temperature : 0)}%</Text>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.subtitleItem}>
            <Text style={styles.titleData}>Tempurate</Text>
            <SafeAreaView style={styles.dataWrapper}>
              <Text style={styles.data}>{Math.round(forecast?.feellike? forecast?.feellike : 0)}%</Text>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
      </ImageBackground>
      <ImageBackground 
        source={require('@/assets/images/weather/Cloudy.png')}
        style={styles.icon}
        resizeMode="contain" 
      >
      </ImageBackground>
    </SafeAreaView>
  )
}

export default CardWeather

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 174.5,
    borderRadius: 20,
    position: 'relative',
  },
  content: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around'
  },
  title: {
    marginLeft: 110,
    justifyContent: 'center',
  },
  bigText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#595959',
  },
  smallText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#595959',
    marginLeft: 20,
  },
  subtitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 45,
    alignContent: 'center',
  },
  subtitleItem: {
    flexDirection: 'column',
    gap: 10,
  },
  titleData: {
    fontWeight: 'bold',
    color: 'white',
  },
  dataWrapper: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 10,
  },
  data: {
    color: '#00661C',
    textAlign: 'center'
  },
  icon: {
    position: 'absolute',
    top: -80,
    right: -20,
    width: 200,
    aspectRatio: 1/1,
  },
})