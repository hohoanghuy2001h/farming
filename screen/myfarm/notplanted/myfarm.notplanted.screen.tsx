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
import { useToast } from 'react-native-toast-notifications';
import notificationsTemplate from '@/constants/notifications.template';
import { useAddNotification } from '@/hooks/notification';
import sendEmail from '@/utils/gmailPush';

const NotPlantedScreen = () => {
  const field = useSelector((state: RootState) => state.field);
  const fieldDetail = useFieldDetail(field.fieldID).data;
  const loading = useFieldDetail(field.fieldID).loading;
  const toast = useToast();
  const redictNewPage = () => {//Đây là function điều hiếu trang
    router.replace('/(routes)/myfarm/info');
  };
  const createNewCrop = () => {
    if(fieldDetail) {
      const updatedFieldData = {
        ...fieldDetail,
        timePlant: new Date(), 
        isPlanted: true,
        isHarvest: false,
      } 
      if(updatedFieldData._id)updateField(updatedFieldData._id, updatedFieldData);
      toast.show("Đã bắt đầu một mùa vụ mới!", 
        {
          type: "custom_toast",
          animationDuration: 100,
          data: {
            title: "New Season",
          },
        }
      )
      const result = notificationsTemplate.find((item) => item.label === 'New Season');
      if(result){
      useAddNotification({...result, fieldID: field.fieldID});
      sendEmail(result.label, field.fieldID, new Date().toLocaleDateString(), result.content, "Hãy vào app kiểm tra.");

      }
    }
    redictNewPage();
  }
  return (
    loading ? <LoadingScreen /> :
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {!fieldDetail?.isPlanted? 
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
        :
          fieldDetail?.isHarvest?
          <View style={styles.content}>
            <Text style={styles.titleText}>END THIS SEASON</Text>
            <Image source={require('@/assets/images/harvesting.png')}/>
            <Text style={styles.subText}>
              Hiện tại, mùa vụ của bạn đã kết thúc. Vui lòng hãy tạo một mùa vụ mới.
            </Text>
            <TouchableOpacity style={styles.buttonWrapper} onPress={createNewCrop}>
              <Icon name="plus" size={40} color="white" />
              <Text style={styles.btnText}>Tạo mới</Text>
            </TouchableOpacity>
          </View> : ''
        }
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