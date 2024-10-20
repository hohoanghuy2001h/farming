import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { Link } from 'expo-router'
import PrimaryButton from '@/components/shared/Button'
import React from 'react'
import { useRouter } from 'expo-router'
import LoginScreen from '@/screen/auth/login/login.screen'


const Login = () => {
  const router = useRouter();
  const handlePress = () => {
    //điều hướng đến trang IntroduceSlide
    router.replace('/home');
  };
  return (
    <LoginScreen />
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