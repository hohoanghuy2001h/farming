import { StyleSheet, Text, SafeAreaView} from 'react-native'
import React, { useMemo } from 'react'
import CardWeather from '@/components/shared/cardWeather'
import Header from '@/components/shared/HeaderHome/Header'
import CardState from '@/components/shared/CardStage'
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useCallback, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import Menu from '@/components/shared/Menu'
const HomeScreen = () => {
  const BottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['40%', '88%'], []); 
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    BottomSheetModalRef.current?.present();
  }, []);
  useEffect(() => {
    handlePresentModalPress();
  }, [handlePresentModalPress]);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Header />      
        </SafeAreaView>
        <SafeAreaView style={styles.content}>
            <CardWeather />
            <CardState date={20}/>
        </SafeAreaView>
        <SafeAreaView style={styles.footer}>
          <BottomSheetModal 
            ref={BottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle ={styles.modal}
            enablePanDownToClose={false}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Menu />
            </BottomSheetView>
          </BottomSheetModal>
        </SafeAreaView>
      </SafeAreaView>
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
  modal: {
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