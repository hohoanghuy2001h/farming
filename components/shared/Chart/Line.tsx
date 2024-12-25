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
      <LineChart
        data={data}
        width={screenWidth} // from react-native
        height={220}
        formatXLabel={(value) => {
          return value? `${new Date(value).getDate()}`: '';
        }}  // Tùy chỉnh thêm 'Day' trước mỗi nhãn trên trục X
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
            r: "3", // Bán kính của điểm
            strokeWidth: "2", // Độ dày viền xung quanh điểm
            stroke: "#37B84F", // Màu viền điểm
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