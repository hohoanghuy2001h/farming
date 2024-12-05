import { StyleSheet, Text, SafeAreaView, Image, View } from 'react-native'
import React from 'react'
interface FieldItemProps {
  item: fieldType,
  active: boolean,
}
const configDate = (date: Date) => {
  // Lấy các phần ngày, tháng và năm
  const day = String(date.getUTCDate()).padStart(2, '0'); // Ngày
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Tháng (thêm 1 vì getUTCMonth() bắt đầu từ 0)
  const year = date.getUTCFullYear(); // Năm

  // Định dạng lại thành DD/MM/YYYY
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
const getHarvestDay = (date: Date) => {
  const futureDate = new Date(date); // Tạo bản sao để không thay đổi inputDate
  futureDate.setMonth(futureDate.getMonth() + 4); // Cộng 4 tháng

  // Bước 2: Lấy thời gian hiện tại
  const currentDate = new Date(); // Lấy thời gian hiện tại

  // Bước 3: Tính khoảng thời gian giữa hai thời gian
  const timeDifference = futureDate.getTime() - currentDate.getTime(); // Thời gian chênh lệch tính bằng milliseconds
  const millisecondsInAMonth = 1000 * 3600 * 24 * 30; // Cách ước lượng số milliseconds trong một tháng
  const monthsDifference = Math.round(timeDifference / millisecondsInAMonth);
  return monthsDifference;
}
const FieldItem: React.FC<FieldItemProps> = ({item, active=false}) =>  {
  return (
    <SafeAreaView style={[styles.container, active? styles.active : null ]}>
      <SafeAreaView style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.image}
        />
      <SafeAreaView style={styles.titleContainer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.size}>{item.size} ha</Text>
        </View>
        {
          !item.isPlanted && item.isHarvest ? 
          <View style={styles.stateWrapper}>
            <View style={styles.statusPlant}>
              <Text style={styles.statusText}>{!item.isPlanted ? 'Not Planted': item.isHarvest ? 'Harvest' : ''}</Text>
            </View>
          </View> 
          :  ''
        }
      </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.contentContainer}>
        <SafeAreaView style={styles.wrapper}>
          <Text style={styles.bigText}>Plating Date:</Text>
          <Text style={styles.smallText}>{configDate(item.timePlant? item.timePlant : new Date())}</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.wrapper}>
          <Text style={styles.bigText}>Harvest Date:</Text>
          <Text style={styles.smallText}>~{getHarvestDay(item.timePlant? item.timePlant : new Date())} month</Text>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default FieldItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 10,
  },
  active: {
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 157,
    height: 273,
  },
  titleContainer: {
    position: 'absolute',
    top: 20,
    left: 15,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  titleWrapper: {

  },
  stateWrapper: {

  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  size: {
    fontSize: 13,
    color: 'white',
  },
  contentContainer: {
    gap: 5,
  },
  wrapper: {
    borderColor: '#E4E7E6',
    borderWidth: 1,
    borderRadius: 12,  
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bigText: {
    fontSize: 13,
    color: '#868B89',
  },
  smallText: {
    fontSize: 13,
  },
  statusPlant: {
    backgroundColor: '#59C36A',
    borderRadius: 20,
    paddingHorizontal: 5,
    height: 25,
    justifyContent: 'center',
    marginLeft: 10,
  },
  statusText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
  },
})