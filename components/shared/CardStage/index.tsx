import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import useStage from '@/hooks/useStage'
import stageImages from '@/assets/images/stages'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { updateField, useFieldDetail } from '@/hooks/field'
import { getCurrentStage } from '@/store/fieldReducer'
import stageDefault from '@/constants/stage.template'
import { convertToTimestamp } from '@/utils/Timestamp'
import { router } from 'expo-router'
import { useToast } from 'react-native-toast-notifications'
import notificationsTemplate from '@/constants/notifications.template'
import { useAddNotification } from '@/hooks/notification'
import sendEmail from '@/utils/gmailPush'
import AsyncStorage from '@react-native-async-storage/async-storage'
const getStageDay = (date: Date) => {
  const day = new Date(date); // Tạo bản sao để không thay đổi inputDate
  // Bước 2: Lấy thời gian hiện tại
  const currentDate = new Date(); // Lấy thời gian hiện tại

  // Bước 3: Tính khoảng thời gian giữa hai thời gian
  const timeDifference = currentDate.getTime() - day.getTime(); // Thời gian chênh lệch tính bằng milliseconds
  const millisecondsInADay = 1000 * 3600 * 24; // Cách ước lượng số milliseconds trong một ngày
  const daysDifference = Math.round(timeDifference / millisecondsInADay);
  return daysDifference;
}
export const CardState = () => {
  const item = useSelector((state: RootState) => state.field);
  const dispatch = useDispatch();
  const {data}= useFieldDetail(item.fieldID); //Tìm kiếm thông tin của field dựa trên fieldID
  const [fieldCurrent, setFieldCurrent] = useState<fieldType>();
  const [day, setDay] = useState(0)
  const {stagePlant} = useStage(day); //Tìm kiếm stage phù hợp dựa trên day = currentDate - plantingDate (ngày trồng)
  const [currentPage, setCurrentPage] = useState<number>(0);
  const toast = useToast();
  const getStageProgress = () => {
    stageDefault.forEach((stage, index) => {
      if(stage === item.plantStage) setCurrentPage(index);
    })
  }
    // Lưu ngày trồng vào AsyncStorage khi người dùng chọn ngày mới
  const savePlantDate = async (date: any) => {
      await AsyncStorage.setItem('plantDate', date.toISOString()); // Lưu ngày dưới dạng chuỗi ISO
  };
  useEffect(() => {
    getStageProgress();
  }, [item,currentPage]);
  useEffect(() => {
    setFieldCurrent(data); //Cho thông tin field current vào biến fieldCurrent
    if(data){
      setDay(getStageDay(data?.timePlant)); //Lấy thời gian từ thời gian trồng đến hiện tại của fieldCurrent
      savePlantDate(data.timePlant)
    }
  }, [data, item])
  useEffect(() => {
    dispatch(getCurrentStage({day,stagePlant}));
  }, [day, stagePlant]); 
  const startCultivation = () => {
    if(data) {
      const updatedFieldData = {
        ...data,
        timePlant: new Date(), 
        isPlanted: true,
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
        // console.log(result)
      useAddNotification({...result, fieldID: item.fieldID})
      sendEmail(result.label, item.fieldID, new Date().toLocaleDateString(), result.content, "Hãy vào app kiểm tra.");

      }
    }
  }
  return (
    item.fieldID !== '' ? 
    data?.isPlanted === true && data.isHarvest === false ? 
      <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.left}>
          <Image 
            style={styles.image}
            source={stageImages[currentPage]}
          />
        </View>
        <View style={styles.right}>
          <Text style={styles.title}>The Chilli Plant</Text>
          <Text style={styles.text}>Growth stage: {stagePlant?.stage}</Text>
          <Text style={styles.text}>{fieldCurrent? getStageDay(fieldCurrent?.timePlant) : 0} days</Text>
        </View>
      </View>
    </View>:
     <View style={styles.container}>
        <Text style={styles.textUpdating}>{data?.isHarvest === false? 'Nông trại chưa được xác nhận trồng cây.': 'Đã kết thúc mùa vụ.'}</Text>
        <TouchableOpacity style={styles.updateTimeBtn} onPress={startCultivation}>
          <Text style={styles.updateTimeText}>Trồng ngay bây giờ.</Text>
        </TouchableOpacity>
    </View>
    :
    <View style={styles.container}>
        <Text style={styles.textLoading}>Vui lòng hãy chọn field.</Text>
   </View>  )
}

export default CardState

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    borderRadius: 20,
    position: 'relative',
    backgroundColor: '#C6E9CA',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  left: {
    width: 130,
    aspectRatio: 1/1,
  },
  image: {
    width: 130,
    height: 180,
    position: 'absolute',
    left: -25,
    bottom: -10,
  },
  right: {
    width: 170, // Đặt chiều rộng để văn bản tự động xuống dòng

  },
  title: {
    color: '#2E5A1C',
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  text: {
    color: 'gray',
    marginTop: 5,
  },
  textLoading: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  updateTimeBtn: {
    backgroundColor: '#59C36A',
    borderRadius: 20,
    paddingHorizontal: 5,
    height: 25,
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 20,
  },
  updateTimeText: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
  textUpdating: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },

})