import { StyleSheet, Text, View} from 'react-native'
import React, { useMemo, useState } from 'react'
import CardWeather from '@/components/shared/cardWeather'
import Header from '@/components/shared/HeaderHome/Header'
import CardState from '@/components/shared/CardStage'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useCallback, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import FieldScreen from '@/components/shared/FieldScreen'
import Menu from '@/components/shared/Menu'
import { useRouter } from 'expo-router'
import { useLogout } from '@/hooks/auth/userAuth'
import { auth } from '@/firebaseConfig'
import { registerBackgroundTask } from '@/task/backgroundTask'
import { registerBackgroundTask as registerBackgroundTaskNotification } from '@/task/backgroundTaskNotification'
const HomeScreen = () => {
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);
  const FieldBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['33%', '90%'], []); 
  const FieldsnapPoints = useMemo(() => ['90%'], []); 
  const [visible, setVsible] = useState(false);
  const logoutUser = useLogout(auth);
  const router = useRouter();

  const logout = () => {
    setVsible(true);
    router.push({
      pathname: '/(auth)/login',
      params: { },
    })
    logoutUser()
  }
  useEffect(() => {
    registerBackgroundTask();
    registerBackgroundTaskNotification();
  }, [])
  
  const openModal = () => {

  }
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    BottomSheetModalRef.current?.present();
  }, []);
  const openPresentFieldBottomSheetModal = useCallback((index: number) => {
    FieldBottomSheetModalRef.current?.present();
    FieldBottomSheetModalRef.current?.snapToIndex(0);
  }, []);
  useEffect(() => {
    handlePresentModalPress();
  }, [handlePresentModalPress]);
  
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header action={openPresentFieldBottomSheetModal} logOut={logout}/>      
        </View>
        <View style={styles.content}>
            <CardWeather />
            <CardState />
        </View>
        <View style={styles.footer}>
          <BottomSheetModal 
            ref={BottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle ={styles.bottomModal}
            enablePanDownToClose={false}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Menu />
            </BottomSheetView>
          </BottomSheetModal>
          <BottomSheetModal 
            ref={FieldBottomSheetModalRef}
            snapPoints={FieldsnapPoints}
            backgroundStyle ={styles.bottomModal}
          >
            <BottomSheetView style={styles.contentContainer}>
              <FieldScreen />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </View>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 30,
    padding: 20,
  },
  header: {
    position: 'relative',
    zIndex: 10,
  },
  content: {
    width: '90%',
    gap: 30,
    flexDirection: 'column',
    borderRadius: 15,
  },
  footer: {
  },
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
})