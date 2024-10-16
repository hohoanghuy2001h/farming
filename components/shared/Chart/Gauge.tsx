import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
interface GaugeChartProps {
  data: number,
  title?: string
}

const Gauge: React.FC<GaugeChartProps> = ({data, title = ''})  => {
 // Khởi tạo trạng thái warning với giá trị mặc định là 'normal'
  const [warning, setWarning] = useState('Good');

  // Hàm để thay đổi giá trị warning
  const compareNumber = (numberToCompare: number) => {
    if (numberToCompare > 80) {
      setWarning('High');
    } else if (numberToCompare < 60) {
      setWarning('Low');
    } else {
      setWarning('Good');
    }
  };
  const colorWarning = () => {
    if(warning == 'Good') return "#3498db";
    else if (warning == 'High') return  "#E13832";
    else return '#FFBC43'; 
  }
  useEffect(() => {
    compareNumber(data)
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
            <Text style={[styles.percentage, {color: colorWarning()}]}>{data}%</Text>
            <Text style= {[styles.warning, {color: colorWarning()}]}>{warning}</Text>
          </SafeAreaView>
        )}
        
      />
      <Text style={styles.label}>SOIL MOISTURE</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
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
