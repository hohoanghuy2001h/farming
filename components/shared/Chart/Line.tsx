import { StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import {
    LineChart,
  } from "react-native-chart-kit";


const screenWidth = Dimensions.get('window').width;
interface ChartProps {
    data: any,
    title?: string,
    unit?: string
}
const Line: React.FC<ChartProps> = ({data, title = '', unit = ''})  => {
  return (
    <SafeAreaView style={styles.container}>
      {title === '' ? '' : <Text style={styles.title}>{title}</Text>}
      <LineChart
        data={data}
        width={screenWidth-40} // from react-native
        height={220}
        formatXLabel={(value) => `${value}`}  // Tùy chỉnh thêm 'Day' trước mỗi nhãn trên trục X
        formatYLabel={(value) => `${value}${unit}`}  // Thêm ký hiệu độ cho trục Y
        fromZero
        style={{
          borderRadius: 20,
        }}
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          fillShadowGradientToOpacity: 0,
          fillShadowGradientFromOpacity: 1,
          fillShadowGradientFrom: '#37B84F', // Mã màu hex cho đường
          fillShadowGradientTo: '#C5FFCF',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          decimalPlaces: 1,
          propsForDots: {
            r: "0", // Không hiển thị điểm (bán kính bằng 0)
            strokeWidth: "0", // Không có đường viền
          },
          propsForLabels: {
            fontSize: 11, // Kích thước font cho nhãn
            fontFamily: 'sans-serif', // Kiểu chữ (có thể thay đổi tùy thích)
          },
        }}
        bezier
      />
    </SafeAreaView>
  )
}

export default Line; 
const styles = StyleSheet.create({
  container: {
    gap: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#13852F',
    margin: 'auto'
  }
})