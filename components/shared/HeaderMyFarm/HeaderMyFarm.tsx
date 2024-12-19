import { StyleSheet, Text, View, Platform } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalQuestion from '../Modal/ModalQuestion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateField, useFieldDetail } from '@/hooks/field';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useToast, Toast} from "react-native-toast-notifications";
import { useAddNotification } from '@/hooks/notification';
import { Button } from 'react-native';
import notificationsTemplate from '@/constants/notifications.template';
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
const HeaderMyFarm = () => {
  const [visible, setVisible] = useState(false);
  const item = useSelector((state: RootState) => state.field);
  const feed = useSelector((state: RootState) => state.feed);
  const {data, loading}= useFieldDetail(item.fieldID); //Tìm kiếm thông tin của field dựa trên fieldID
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(0)
  const toast = useToast();
  const [updateTime, setupdateTime] = useState(new Date());
  const [harvestConfirm, setHarvestConfirm] = useState(false)
  useEffect(() => {
    setDay(getStageDay(data?.timePlant || new Date()));
    setDate(data?.timePlant || new Date());
  }, [data])
    //Hàm này để lưu ngày của schedule
    const onChangeDay = (event: any, selectedDate: any) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    };
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: data?.timePlant || new Date(),
      onChange: onChangeDay,
      mode: 'date',
    });
  };
  useEffect(() => {
    if(feed.feed.length !== 0)setupdateTime(new Date(feed.feed[0].timeUpdate) || new Date())
  }, [feed])
  //Change Planting date of field
  const changeDateField = () =>  {
    if(data) updateField(data._id, {
      ...data, timePlant: date
    });
    setVisible(false);
    toast.show("Đã thay đổi thời gian trồng thành công!", 
      {
        type: "custom_toast",
        animationDuration: 100,
        data: {
          title: "Change Time Plant",
        },
      }
    )
    const result = notificationsTemplate.find((item) => item.label === 'Change Time Plant');
    if(result){
      useAddNotification({...result, fieldID: item.fieldID})
    }
  }
  const settingHarvest = () => {
    if(data) updateField(data._id, {
      ...data, isHarvest: true,
    });
    setVisible(false);
    toast.show("Đã kết thúc mùa vụ!", 
      {
        type: "custom_toast",
        animationDuration: 100,
        data: {
          title: "End SeasonSeason",
        },
      }
    )
    const result = notificationsTemplate.find((item) => item.label === 'Harvesting');
    if(result){
      useAddNotification({...result, fieldID: item.fieldID})
    }
  }
  return (
    <View style={styles.container}>
        <View style={styles.headerName}>
        <Text style={styles.plantName}>Capsicum</Text>
        <View style={styles.headerTime}>
            <Text style={styles.weeks}>{Math.round(day / 7)} weeks, {day%7} days</Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(true)
              }}
            >
              <FontAwesome name="pencil" size={20} color="gray" />   
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setHarvestConfirm(true)
              }}
            >
              <FontAwesome name="leaf" size={20} color="gray" />   
            </TouchableOpacity>
        </View>
        <View>
          <Text style={{
            fontSize: 10,
            color: 'gray'
          }}>Lần cuối update: {updateTime.toLocaleString()}</Text>
        </View>
        </View>
        <View style={[styles.statusPlant, {backgroundColor: item.health === 'Good Health'? '#59C36A' : '#E13832'}]}>
          <Text style={styles.statusText}>{item.health}</Text>
        </View>
        <ModalQuestion isOpen = {visible} setIsOpen={setVisible} submit={changeDateField}>
          <View>
            <Text style={styles.modalTitle}>
                Edit Planting Time
            </Text>
            <Button title={`${date.toLocaleDateString()}`} onPress={showDatePicker} />
          </View>
        </ModalQuestion>
        <ModalQuestion isOpen = {harvestConfirm} setIsOpen={setHarvestConfirm} submit={settingHarvest}>
          <View>
            <Text style={styles.modalTitle}>
              Cây trồng vẫn chưa kết thúc mùa vụ. Bạn vẫn muốn kết thúc chứ?
            </Text>
          </View>
        </ModalQuestion>
    </View>
  )
}

export default HeaderMyFarm

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 20,
      },
      headerName: {},
      plantName: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      headerTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
      },
      weeks: {},
      statusPlant: {
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 25,
        justifyContent: 'center',
      },
      statusText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
      },
})