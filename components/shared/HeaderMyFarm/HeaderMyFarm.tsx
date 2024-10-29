import { StyleSheet, Text, SafeAreaView } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalQuestion from '../Modal/ModalQuestion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useFieldDetail } from '@/hooks/field';
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
  const [day, setDay] = useState(0)
  useEffect(() => {
    setDay(getStageDay(data?.timePlant));
  }, [data])
  
  return (
    <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.headerName}>
        <Text style={styles.plantName}>Capsicum</Text>
        <SafeAreaView style={styles.headerTime}>
            <Text style={styles.weeks}>{Math.round(day / 7)} weeks, {day%7} days</Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(true)
              }}
            >
              <FontAwesome name="pencil" size={20} color="gray" />   
            </TouchableOpacity>
        </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.statusPlant}>
        <Text style={styles.statusText}>Good Health</Text>
        </SafeAreaView>
        <ModalQuestion isOpen = {visible} setIsOpen={setVisible} submit={() => setVisible(false)}>
        <SafeAreaView>
          <Text style={styles.modalTitle}>
              Edit Planting Time
          </Text>
        </SafeAreaView>
      </ModalQuestion>
    </SafeAreaView>
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
        marginBottom: 20,
      },
})