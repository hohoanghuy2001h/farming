import { Image, StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
        <Image 
            source={require('@/assets/images/loading.png')}   
        />
    </SafeAreaView>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C6E9CA',
        justifyContent: 'center',
        alignItems: 'center',
    }
})