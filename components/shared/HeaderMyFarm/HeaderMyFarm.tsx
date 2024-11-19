import { StyleSheet, Text, View, Platform } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalQuestion from '../Modal/ModalQuestion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateField, useFieldDetail } from '@/hooks/field';
import DateTimePicker from '@react-native-community/datetimepicker';
import {convertToTimestamp} from '@/utils/Timestamp'
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
  const {data}= useFieldDetail(item.fieldID); //Tìm kiếm thông tin của field dựa trên fieldID
  const [date, setDate] = useState(new Date(data?.timePlant));
  const [day, setDay] = useState(0)
  const [show, setShow] = useState(false);
  useEffect(() => {
    setDay(getStageDay(data?.timePlant));
  }, [data])
    //Hàm này để lưu ngày của schedule
  const onChange = (event: any, selectedDate: any) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
  };
  //Change Planting date of field
  const changeDateField = () =>  {
    if(data){
      const firebaseTime = convertToTimestamp(date);
      const { timePlant, ...rest } = data; // Tách `timePlant` và các thuộc tính còn lại
      const updateFieldData = {
        ...rest,  
        timePlant: firebaseTime, // Thay thế `timePlant` bằng giá trị mới
      };
      if(data) updateField(data._id, updateFieldData);
      setVisible(false);
    }
    else {}
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
        </View>
        </View>
        <View style={styles.statusPlant}>
          <Text style={styles.statusText}>Good Health</Text>
        </View>
        <ModalQuestion isOpen = {visible} setIsOpen={setVisible} submit={changeDateField}>
        <View>
          <Text style={styles.modalTitle}>
              Edit Planting Time
          </Text>
          <DateTimePicker
              value={date}
              mode="date"
              display="inline"
              onChange={onChange}
              maximumDate={new Date()}
          />
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
        backgroundColor: '#59C36A',
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