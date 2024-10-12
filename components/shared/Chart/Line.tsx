import { StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import {
    LineChart,
  } from "react-native-chart-kit";
import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg';


const screenWidth = Dimensions.get('window').width;
interface ChartProps {
    data: any,
    title?: string
}
const Line: React.FC<ChartProps> = ({data, title = 'null'})  => {
  return (
    <SafeAreaView style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <LineChart
        data={data}
        width={screenWidth-40} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: "#37B84F",
          backgroundGradientTo: "#C1F8CB",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
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