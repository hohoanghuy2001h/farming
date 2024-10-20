import { Link } from 'expo-router';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CardName from '@/components/shared/CardName/CardName';
import { windowWidth } from '@/utils/Dimensions';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import { useData } from '@/hooks/data';
import Line from '@/components/shared/Chart/Line';
import { useEffect, useState } from 'react';

//FAKE API
const cardNameArray = [
  {
    iconName: 'sun',
    cardName: "Light",
    fieldName: 'field1',
    warning: 0,
    unit: '°C',
  },
  {
    iconName: 'temperature-half',
    cardName: "Tempurature",
    fieldName: 'field2',
    warning: 0,
    unit: '%',
  },
  {
    iconName: 'water',
    cardName: "Humidity",
    fieldName: 'field3',
    warning: 1,
    unit: '%',
  },
  {
    iconName: 'seedling',
    cardName: "Soil",
    fieldName: 'field4',
    warning: 2,
    unit: '%',
  },
]
  
const configDataChart = (rawData: any) => {
  let data = {};
  if(rawData != null){
    data = {
      labels: rawData.map((item: any)=> {
        //const date = new Date(item.created_at).toLocaleString();
        const date = new Date(item.created_at);
        const hours = date.getUTCHours(); // Lấy giờ theo UTC
        const minutes = date.getUTCMinutes(); // Lấy phút theo UTC
    
        // Định dạng giờ và phút
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      }),  
      datasets: [
        {
          data: rawData.map((item: any) => parseFloat(item.field)),  // Chuyển field thành số thực
          color: () => '#37B84F', // Mã màu hex cho đường
          strokeWidth: 3, // Độ dày của đường
        },
      ],
    };
  }
  return data;
}
export default function StatisticalScreen() {
  const [activeItem, setActiveItem] = useState(0); // State để lưu vị trí của item active
  const {data} = useData(cardNameArray[activeItem].fieldName)
  const [dataChart, setDataChart] = useState({})
  useEffect(() => {
    setDataChart(configDataChart(data));
  }, [data])  
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
          {Object.keys(dataChart).length === 0 ? <Text>Loading</Text>: <Line data={dataChart} unit={cardNameArray[activeItem].unit}/>}
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