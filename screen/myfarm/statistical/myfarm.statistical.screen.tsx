import { Link } from 'expo-router';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CardName from '@/components/shared/CardName/CardName';
import { windowWidth } from '@/utils/Dimensions';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import useData from '@/hooks/useData';
import Line from '@/components/shared/Chart/Line';
import { useState } from 'react';

//FAKE API
const cardNameArray = [
  {
    iconName: 'sun-o',
    cardName: "Light",
    warning: 0,
  },
  {
    iconName: 'sun-o',
    cardName: "Temperature",
    warning: 0,
  },
  {
    iconName: 'sun-o',
    cardName: "Humidity",
    warning: 1,
  },
  {
    iconName: 'sun-o',
    cardName: "Soil",
    warning: 2,
  },
]
//Data chart
const dataChart = {
  'Light': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
      },
    ],
    name: 'Light',
  },
  'Tempurature': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [90, 45, 28, 80, 99, 43, 50],
      },
    ],
    name: 'Light',
  },
  'Humidity': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [80, 45, 28, 80, 99, 43, 50],
      },
    ],
    name: 'Light',
  },
  'Soil': {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [100, 45, 28, 80, 99, 43, 50],
      },
    ],
    name: 'Light',
  },
}
export default function StatisticalScreen() {
  const {data} = useData(1,2);
  const [activeItem, setActiveItem] = useState(0); // State để lưu vị trí của item active
  const itemRender = (item: any, index: number) => {
    return (
      <TouchableOpacity 
        onPress={() => {
          setActiveItem(index)
        }}
        key={index}
        style = {styles.itemContainer}
      >
          <CardName iconName={item.iconName} key={index} 
                    warning={item.warning} 
                    onclick={index == activeItem? true : false} 
          />
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.wrapper}>
        <HeaderMyFarm />
        <SafeAreaView style={styles.graphContainer}>
          <Line data={dataChart['Light']}></Line>
        </SafeAreaView>
        <SafeAreaView style={styles.swipperContainer}>
            <FlatList 
               data={cardNameArray}
               contentContainerStyle ={styles.swipperWrapper}
               renderItem={({item, index}) => itemRender(item, index)}
               horizontal
               showsHorizontalScrollIndicator={false}
               ItemSeparatorComponent={() => <SafeAreaView style={{ width: 20 }} />}  // 20px spacing between items
            />
        </SafeAreaView>

         <SafeAreaView style={styles.desContainer}>
            <Text style={styles.desTitle}>Best Conditions:</Text>
            <SafeAreaView style={styles.desTextContainer}>
              <Text style = {styles.text}>Hello</Text>
            </SafeAreaView>
        </SafeAreaView>       
        </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  wrapper: {
    width: windowWidth - 40,
    gap: 10,
    position: 'relative',
  },
  swipperContainer: {
    height: 220,
    overflow: 'hidden',
    width: '100%',
  },
  swipperWrapper: {
    alignItems: 'center',
  },
  desContainer: {
    gap: 15,
  },
  desTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5A1C' 
  },
  desTextContainer: {
    padding: 20,
    borderColor: '#21963A',
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    padding: 10,
    textAlign: 'justify',
  },
  itemContainer: {
    width: windowWidth/3,
  },
  graphContainer: {}
});