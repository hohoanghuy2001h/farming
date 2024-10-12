import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import CardWeather from '@/components/shared/cardWeather'
import Header from '@/components/shared/Header/Header'

const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Header />      
      </SafeAreaView>
      <SafeAreaView style={styles.content}>
          <CardWeather />
      </SafeAreaView>
      <SafeAreaView style={styles.footer}></SafeAreaView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
  },
  content: {
    width: 50,
    height: 50,
    backgroundColor: 'pink',
  },
  footer: {
    width: 50,
    height: 50,
    backgroundColor: 'black',
  },
})