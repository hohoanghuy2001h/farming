import { StyleSheet, Text, View, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import { windowHeight, windowWidth } from '@/utils/Dimensions';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';
import { updateField, useFieldDetail } from '@/hooks/field';
import LoadingScreen from '@/screen/loading/loading.screen';


const NotPlantedScreen = () => {
  const field = useSelector((state: RootState) => state.field);
  const fieldDetail = useFieldDetail(field.fieldID).data;
  const loading = useFieldDetail(field.fieldID).loading;
  const redictNewPage = () => {//Đây là function điều hiếu trang
    router.replace('/(routes)/myfarm/info');
  };
  const createNewCrop = () => {
    if(fieldDetail) {
      const updatedFieldData = {
        ...fieldDetail,
        timePlant: new Date(), 
        isPlanted: true,
      } 
      if(updatedFieldData._id)updateField(updatedFieldData._id, updatedFieldData);
    }
    redictNewPage();
  }
  return (
    loading ? <LoadingScreen /> :
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.titleText}>DON’T HAVE PLANT</Text>
          <Image source={require('@/assets/images/notPlanted.png')}/>
          <Text style={styles.subText}>
            Hiện tại, bạn vẫn chưa bắt đầu mùa vụ nào. Vui lòng hãy tạo một mùa vụ mới.
          </Text>
          <TouchableOpacity style={styles.buttonWrapper} onPress={createNewCrop}>
            <Icon name="plus" size={40} color="white" />
            <Text style={styles.btnText}>Tạo mới</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default NotPlantedScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  wrapper: {
    width: windowWidth - 40,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    padding: 49,
  },
  titleText: {
    color: '#13852F',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
  },
  subText: {
    textAlign: 'center',
  },
  buttonWrapper: {
    backgroundColor: '#13852F',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
})