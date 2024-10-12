import { StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import {
    ProgressChart ,
  } from "react-native-chart-kit";


const screenWidth = Dimensions.get('window').width;
interface ChartProps {
    data: any,
}
const Gauge: React.FC<ChartProps> = ({data})  => {
    let configStyle;
    // if (data < 70) {
    //     configStyle = [
    //       {
    //         name: 'Low',
    //         population: data,
    //         color: '#FFCC32', // Màu vàng cho độ ẩm thấp
    //         legendFontColor: '#7F7F7F',
    //         legendFontSize: 15,
    //       },
    //       {
    //         name: 'Unused',
    //         population: 100 - data,
    //         color: '#E0E0E0', // Màu xám cho phần không sử dụng
    //         legendFontColor: '#7F7F7F',
    //         legendFontSize: 15,
    //       },
    //     ];
    //   } else if (data >= 70 && data <= 80) {
    //     configStyle = [
    //       {
    //         name: 'Moderate',
    //         population: data,
    //         color: '#0099FF', // Màu xanh dương cho độ ẩm vừa
    //         legendFontColor: '#7F7F7F',
    //         legendFontSize: 15,
    //       },
    //       {
    //         name: 'Unused',
    //         population: 100 - data,
    //         color: '#E0E0E0',
    //         legendFontColor: '#7F7F7F',
    //         legendFontSize: 15,
    //       },
    //     ];
    //   } else {
    //     configStyle = [
    //       {
    //         name: 'High',
    //         population: data,
    //         color: '#E13832', // Màu đỏ cho độ ẩm cao
    //         legendFontColor: '#7F7F7F',
    //         legendFontSize: 15,
    //       },
    //       {
    //         name: 'Unused',
    //         population: 100 - data,
    //         color: '#E0E0E0',
    //         legendFontColor: '#7F7F7F',
    //         legendFontSize: 15,
    //       },
    //     ];
    // }
  return (
    <SafeAreaView style={styles.container}>
        {/* <ProgressChart
            data={data}
            width={screenWidth}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // Số thập phân
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16,
            },
            }}
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        /> */}
        <Text style={styles.valueText}>{data}%</Text>
        <Text style={styles.labelText}>SOIL MOISTURE</Text>
    </SafeAreaView>
  )
}

export default Gauge; 
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
        borderRadius: 16,
      },
      valueText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#13852F',

      },
      labelText: {
        fontSize: 16,
        color: '#389E6D',

      },
})