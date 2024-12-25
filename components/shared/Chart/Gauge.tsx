import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSelector } from 'react-redux';
interface GaugeChartProps {
  data: number,
  title?: string,
  unit?: string,
  label?: string,
}

const Gauge: React.FC<GaugeChartProps> = ({data, title = '', unit='%', label='Soil moisturize'})  => {
  const field = useSelector((state: RootState) => state.field);
 // Khởi tạo trạng thái warning với giá trị mặc định là 'normal'
  const [warning, setWarning] = useState('Good');

  // Hàm để thay đổi giá trị warning
  const compareNumber = (numberToCompare: number, label: string) => {
    if(label === 'Temperature') {
      if (numberToCompare > field.plantStage.maxTemperature) {
        setWarning('High');
      } else if (numberToCompare < field.plantStage.minTemperature) {
        setWarning('Low');
      } else {
        setWarning('Good');
      }
    }
    else if(label === 'Soil moisturize') {
      if (numberToCompare > field.plantStage.maxSoil) {
        setWarning('High');
      } else if (numberToCompare < field.plantStage.minSoil) {
        setWarning('Low');
      } else {
        setWarning('Good');
      }
    }
    else if(label === 'Humidity') {
      if (numberToCompare > field.plantStage.maxHumidity) {
        setWarning('High');
      } else if (numberToCompare < field.plantStage.minHumidity) {
        setWarning('Low');
      } else {
        setWarning('Good');
      }
    }
  };
  const colorWarning = () => {
    if(warning == 'Good') return "#3498db";
    else if (warning == 'High') return  "#E13832";
    else return '#FFBC43'; 
  }
  useEffect(() => {
    compareNumber(data, label)
  }, [data])
  
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedCircularProgress
        size={150}
        width={15}
        fill={data}
        tintColor={colorWarning()} // Gọi hàm để lấy màu sắc
        backgroundColor="#ddd" // Màu nền xám nhạt
        rotation={-120} // Bắt đầu từ đỉnh
        lineCap="round" // Đầu tròn cho vòng tròn
        arcSweepAngle={240} // Vòng tròn chỉ bao phủ 240 độ
        children={() => (
          <SafeAreaView style={styles.content}>
            <Text style={[styles.percentage, {color: colorWarning()}]}>{data}{unit}</Text>
            <Text style= {[styles.warning, {color: colorWarning()}]}>{warning}</Text>
          </SafeAreaView>
        )}      
      />
      <Text style={styles.label}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  content: {
    position: 'absolute', // Giữ phần trăm trong vòng tròn
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentage: {
    fontSize: 35,
    color: '#13852F',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  warning: {
    color: '#13852F',
  },
});

export default Gauge;
