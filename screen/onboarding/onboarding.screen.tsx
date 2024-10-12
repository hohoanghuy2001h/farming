import { StyleSheet, Text, SafeAreaView, Image , TouchableOpacity} from 'react-native'
import React from 'react'
import {windowWidth, windowHeight} from '@/utils/Dimensions';
import PrimaryButton from '@/components/shared/Button';
import { useRouter } from 'expo-router'
const OnboardingScreen = () => {
  const router = useRouter();
  const redictNewPage = () => {//Đây là function điều hiếu trang
    router.push({
      pathname: '/(routes)/welcome-intro',
      params: {  },
    });
  };
  return (
    <SafeAreaView style= {styles.container}>
      <SafeAreaView style = {styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/Introduce.png')}
        />      
      </SafeAreaView>
      <SafeAreaView style = {styles.buttonContainer}>
        <PrimaryButton  content='JOIN NOW' action={redictNewPage}/>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CEE9D2',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 70,
  },
  logoContainer: {
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{

  },
  buttonContainer: {
    height: 80,
  }
})