import { StyleSheet, Text, View, FlatList, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import { windowHeight, windowWidth } from '@/utils/Dimensions';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const HavestingScreen = () => {
  const item = useSelector((state: RootState) => state.field);



  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderMyFarm />
      </View>
    </View>
  );
}

export default HavestingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  wrapper: {
    width: windowWidth - 40,
  },
  stepIndicator: {
    height: windowHeight,
  },
  rowItem: {
    flex: 3,
    paddingVertical: 20,
  },
  left: {
    width: '50%',
    paddingBottom: 120,
  },
  right: {
    alignSelf: 'flex-end',
    marginBottom: 200,
    maxWidth: '50%',
    aspectRatio: 3/4,
  },
  progressText: {
    alignItems: 'flex-start', 
    width: 120,
    marginHorizontal: 10,
  },
  progresslabel: {},
  progresscurrentLabel: {
    color: '#54805A',
    fontWeight: 'bold',
  },
  progressDay: {
    fontSize: 12,
    color: '#b5b5b5',
  },
  modalWrapper: {
    backgroundColor: 'pink',
  }
})