import { StyleSheet, Text, SafeAreaView, Image, KeyboardAvoidingView, KeyboardAvoidingViewBase, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { windowWidth, windowHeight } from '@/utils/Dimensions'
import PrimaryButton from '@/components/shared/Button'
import SecondButton from '@/components/shared/Button/secondButton'
import { useRouter } from 'expo-router'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useLogin } from '@/hooks/auth/userAuth'
import { auth } from '@/firebaseConfig'
import ModalNotice from '@/components/shared/Modal/ModalNotice'
const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const login = useLogin(auth);
  const [visible, setVisible] = useState(false);

  const redictNewPage = () => {//Đây là function điều hướng trang
    router.push({
      pathname: "/(routes)/home",
      params: {  },
    });
  };
  const resolveLogin  = async () => {
      const user = await login(email,password);
      if (user) redictNewPage()
      else setVisible(true)
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
        <SafeAreaView style={styles.form}>
          <KeyboardAvoidingView
            style= {{gap: 20}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Cách xử lý bàn phím khác nhau cho iOS và Android
          >
            <SafeAreaView style ={styles.formInput}>
              <Icon name="user" size={24} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </SafeAreaView>
            <SafeAreaView style ={styles.formInput}>
              <Icon name="lock" size={24} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry 
              />
            </SafeAreaView>
          </KeyboardAvoidingView>
          <PrimaryButton content='SIGN IN' action={resolveLogin}/>
        </SafeAreaView>
        <SafeAreaView style={styles.divided}>
          <SafeAreaView style={styles.line} />
              <Text>or</Text>
          <SafeAreaView style={styles.line} />
        </SafeAreaView>
        <SafeAreaView style={styles.otherContainer}>
          <SecondButton content='Login with Facebook' leftIcon='facebook' colorIcon='#475993'/>
          <SecondButton content='Login with Email' leftIcon='envelope' colorIcon='red'/>
        </SafeAreaView>
      </SafeAreaView>
      <ModalNotice isOpen = {visible} setIsOpen={setVisible} >
        <SafeAreaView style={{
          flexDirection: 'row',
          justifyContent:'space-between',
          marginBottom: 20,
        }}>
          <Text style={styles.modalTitle}>
            Login Error
          </Text>
          <TouchableOpacity
            onPress={() => setVisible(false)} 
          >
            <Icon name='close' size={20} />
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView>
          <Text>Tên user hoặc mật khẩu của bạn không đúng. Vui lòng hãy kiểm tra lại.</Text>
        </SafeAreaView>
      </ModalNotice>
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
    marginVertical: 60,
    flex: 1,
    width: windowWidth - 130,
    gap: 20,
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
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 22,
  },
  form: {
    flexDirection: 'column',
    gap: 20,
  },
  formInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  input: {
    flex: 1,
  },
  otherContainer: {
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
    alignContent: 'center',
  },
  divided: {
    flexDirection: 'row',
    alignItems: 'center',    // Căn giữa dọc các phần tử
    width: '100%',
    gap: 10,
  },
  line: {
    flex: 1,                 // Để đường thẳng kéo dài hết không gian còn lại
    height: 1,               // Chiều cao của đường thẳng
    backgroundColor: '#818181', // Màu sắc của đường thẳng
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  }
})