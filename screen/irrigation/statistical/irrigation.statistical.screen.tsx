import { SafeAreaView, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import { useState } from 'react';
import Line from '@/components/shared/Chart/Line';
import Bar from '@/components/shared/Chart/Bar';
const data = {
  'Light': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
  },
  'Tempurature': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [90, 45, 28, 80, 99, 43, 50],
      },
    ],
  },
  'Humidity': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [80, 45, 28, 80, 99, 43, 50],
      },
    ],
  },
  'Soil': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [100, 45, 28, 80, 99, 43, 50],
      },
    ],
  },
}
export default function StatisticalScreen() {
  const [activeItem, setActiveItem] = useState(0); // State để lưu vị trí của item active
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style ={styles.wrapper}>
        <Line data={data['Soil']} title='Biểu đồ lượng nước tiêu thụ mỗi ngày'></Line>
        <Bar data={data['Soil']} title='Biểu đồ lượng nước tiêu thụ mỗi ngày' ></Bar>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  wrapper: {
    gap: 20,
    marginTop: 20,
    height: '100%',
  }
});