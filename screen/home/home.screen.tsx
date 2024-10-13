import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import CardWeather from '@/components/shared/cardWeather'
import Header from '@/components/shared/Header/Header'
import CardState from '@/components/shared/CardStage'
const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Header />      
      </SafeAreaView>
      <SafeAreaView style={styles.content}>
          <CardWeather />
          <CardState date={20}/>
      </SafeAreaView>
      <SafeAreaView style={styles.footer}></SafeAreaView>
    </SafeAreaView>
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
    width: 50,
    height: 50,
    backgroundColor: 'black',
  },
})