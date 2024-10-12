import { StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native'
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import React from 'react'
import {
    BarChart ,
} from "react-native-chart-kit";
  

const screenWidth = Dimensions.get('window').width;
interface ChartProps {
    data: any,
    title: string,
}
const Bar: React.FC<ChartProps> = ({data,title})  => {
  const chartConfig = {
    backgroundGradientFrom: '#37B84F',
    backgroundGradientTo: '#C1F8CB',
    decimalPlaces: 2, // làm tròn số liệu đến 2 chữ số sau dấu phẩy
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // màu của cột
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <BarChart
          data={data}
          width={screenWidth - 40}
          height={320}
          yAxisLabel="L"
          yAxisSuffix= ""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          showBarTops={false}
          withInnerLines={false}
          style={styles.graph}
        />
    </SafeAreaView>
  )
}

export default Bar; 
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 16,
        gap: 20,
      },
      graph: {
        borderRadius: 16,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#13852F',
      }
})