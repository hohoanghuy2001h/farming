import { StyleSheet, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { windowWidth, windowHeight } from '@/utils/Dimensions'
import PrimaryButton from '@/components/shared/Button'
import SecondButton from '@/components/shared/Button/secondButton'
import { useRouter } from 'expo-router'

const LoginScreen = () => {
  const router = useRouter();

  const redictNewPage = () => {//Đây là function điều hướng trang
    router.push({
      pathname: "/(routes)/home",
      params: {  },
    });
  };
  const resolveLogin  = () => {
      //Hàm này sẽ xử lý phương thức đăng nhập
      redictNewPage()
  }
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style = {styles.wrapper}>
        <SafeAreaView style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/Introduce.png')}  // replace with your image path
            style={styles.image}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.formContainer}>
          <SafeAreaView style={styles.form}>
            <PrimaryButton content='SIGN IN' action={resolveLogin}/>
          </SafeAreaView>
          <SafeAreaView style={styles.divided}>
            <SafeAreaView style={styles.line} />
              <Text style={styles.text}>or</Text>
            <SafeAreaView style={styles.line} />
          </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.otherContainer}>
          <SecondButton content='Login with Facebook' leftIcon='facebook' colorIcon='#475993'/>
          <SecondButton content='Login with Email' leftIcon='envelope' colorIcon='red'/>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CEE9D2',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 80,
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',  
  },
  image: {
    height: 222,
    aspectRatio: 7/8,
  },
  formContainer: {
    width: windowWidth - 130,
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 22,
  },
  form: {
  },
  otherContainer: {
    flexDirection: 'column',
    gap: 22,
    justifyContent: 'center',
    alignContent: 'center',
  },
  divided: {
    flexDirection: 'row',
    alignItems: 'center',    // Căn giữa dọc các phần tử
  },
  line: {
    flex: 1,                 // Để đường thẳng kéo dài hết không gian còn lại
    height: 1,               // Chiều cao của đường thẳng
    backgroundColor: '#818181', // Màu sắc của đường thẳng
  },
  text: {
    marginHorizontal: 10,    // Khoảng cách giữa chữ "or" và các đường thẳng
    color: '#818181',           // Màu của chữ "or"
  },
})