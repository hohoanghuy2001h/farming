import { Link } from 'expo-router';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import CardName from '@/components/shared/CardName/CardName';
import Carousel from 'react-native-reanimated-carousel';
import { windowWidth } from '@/utils/Dimensions';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import useData from '@/hooks/useData';
// import Line from '@/components/shared/Chart/Line';
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
  const {data} = useData(1,2);
  const [activeItem, setActiveItem] = useState(0); // State để lưu vị trí của item active
  const itemRender = (item: any, index: number) => {
    return (
      <TouchableOpacity 
        onPress={() => {
          setActiveItem(index)
        }}
        style={styles.cardNameItem}
        key={index}
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
        {/* <SafeAreaView style={styles.graphContainer}>
          <Line data={data['Light']}></Line>
        </SafeAreaView> */}
        <SafeAreaView style={styles.carouselContainer}>
        <Carousel
            width={windowWidth / 3} // Chiều rộng của carousel
            height={200} // Chiều cao của carousel
            data={cardNameArray}
            style = {styles.cardNameContainer}
            renderItem={({item, index}) => itemRender(item,index)}
          />
        </SafeAreaView>

        {/* <SafeAreaView style={styles.desContainer}>
            <Text style={styles.desTitle}>Best Conditions:</Text>
            <SafeAreaView style={styles.desTextContainer}>
              <Text>Hello</Text>
            </SafeAreaView>
        </SafeAreaView> */}      
        <Text>5</Text>
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
    gap: 20,
    position: 'relative',
  },
  carouselContainer: {
    backgroundColor: 'red',
    height: 200,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNameContainer: {
      alignItems: 'center',
      justifyContent: 'center', 
      paddingHorizontal: 20,
      width: '100%',
    },

  cardNameItem: {
    width: windowWidth / 3 - 10,
    height: 200,
    marginHorizontal: 3,
  }
});