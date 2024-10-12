import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { Link } from 'expo-router'
import PrimaryButton from '@/components/shared/Button'
import React from 'react'
import { useRouter } from 'expo-router'


const Login = () => {
  const router = useRouter();
  const handlePress = () => {
    //điều hướng đến trang IntroduceSlide
    router.replace('/home');
  };
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style= {styles.buttonContainer}>
        <PrimaryButton content='SIGN IN' action={handlePress}></PrimaryButton>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CEE9D2',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 70,
  },
  buttonContainer: {
    height: 80,
  }
})