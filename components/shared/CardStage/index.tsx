import { StyleSheet, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import useStage from '@/hooks/useStage'
import stageImages from '@/assets/images/stages'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useFieldDetail } from '@/hooks/field'
const getStageDay = (date: Date) => {
  const day = new Date(date); // Tạo bản sao để không thay đổi inputDate
  // Bước 2: Lấy thời gian hiện tại
  const currentDate = new Date(); // Lấy thời gian hiện tại

  // Bước 3: Tính khoảng thời gian giữa hai thời gian
  const timeDifference = currentDate.getTime() - day.getTime(); // Thời gian chênh lệch tính bằng milliseconds
  const millisecondsInADay = 1000 * 3600 * 24; // Cách ước lượng số milliseconds trong một tháng
  const monthsDifference = Math.round(timeDifference / millisecondsInADay);
  return monthsDifference;
}
export const CardState = () => {
  const item = useSelector((state: RootState) => state.field);
  const {data}= useFieldDetail(item.fieldID);
  const [fieldCurrent, setFieldCurrent] = useState<fieldType>();
  const [day, setDay] = useState(0)
  const {stagePlant} = useStage(day);
  useEffect(() => {
    setFieldCurrent(data);
    setDay(getStageDay(data?.timePlant));
  }, [data, item])
  return (
    item.fieldID !== '' ? 
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.wrapper}>
        <SafeAreaView style={styles.left}>
          <Image 
            style={styles.image}
            source={require('@/assets/images/stages/Seedling.png')}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.right}>
          <Text style={styles.title}>The Chilli Plant</Text>
          <Text style={styles.text}>Growth stage: {stagePlant?.stage}</Text>
          <Text style={styles.text}>{getStageDay(fieldCurrent?.timePlant)} days</Text>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView> :
    <SafeAreaView style={styles.container}>
        <Text style={styles.textLoading}>Vui lòng hãy chọn field.</Text>
   </SafeAreaView>
  )
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
    gap: 10,
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
  right: {},
  title: {
    color: '#2E5A1C',
    fontSize: 30,
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
  }

})