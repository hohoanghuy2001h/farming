import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CardName from '@/components/shared/CardName/CardName';
import { windowWidth } from '@/utils/Dimensions';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import { useData } from '@/hooks/data';
import Line from '@/components/shared/Chart/Line';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import LoadingScreen from '@/screen/loading/loading.screen';

//FAKE API
const cardNameArray = [
  {
    iconName: 'temperature-half',
    cardName: "Temperature",
    fieldName: 'field1',
    warning: 0,
    unit: '°C',
  },
  {
    iconName: 'water',
    cardName: "Humidity",
    fieldName: 'field2',
    warning: 1,
    unit: '%',
  },
  {
    iconName: 'sun',
    cardName: "Light Intensity",
    fieldName: 'field3',
    warning: 0,
    unit: '',
  },
  {
    iconName: 'seedling',
    cardName: "Soil Moisturize",
    fieldName: 'field4',
    warning: 2,
    unit: '',
  },
]
const changeWarning = (data: number, label: string, stagePlant: stagePlant) => {
  let warning = 0;
  switch(label) {
    case 'Temperature':
      warning = data < stagePlant.maxTemperature ? 1 : data > stagePlant.minTemperature ? 2 : 0;
      break;
    case 'Humidity':
      warning = data < stagePlant.maxHumidity ? 1 : data > stagePlant.minHumidity ? 2 : 0;
      break;
    case 'Light Intensity':
      warning = data < stagePlant.maxLight ? 1 : data > stagePlant.minLight ? 2 : 0;
      break;
    case 'Soil Moisturize':
      break;
    default:
      break;
  }
  return warning;
}  

const configDataChart = (rawData: any) => {
  let data = {};
  if(rawData != null){
    data = {
      labels: rawData.map((item: any)=> {
        //const date = new Date(item.created_at).toLocaleString();
        const date = new Date(item.created_at).toLocaleString();
        // Tách phần thời gian từ chuỗi
        const timePart = date.split(", ")[1];

        // Tách giờ và phút
        const [hour, minute] = timePart.split(":");   
        // Định dạng giờ và phút
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
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
  const item = useSelector((state: RootState) => state.field);
  const [activeItem, setActiveItem] = useState(0); // State để lưu vị trí của item active
  const {data, loading} = useData(cardNameArray[activeItem].fieldName)
  const [dataChart, setDataChart] = useState({})
  useEffect(() => {
    setDataChart(configDataChart(data));
  }, [data])  
  const itemRender = (itemData: any, index: number) => {
    return (
      <TouchableOpacity 
        onPress={() => {
          setActiveItem(index)
        }}
        key={index}
        style = {styles.itemContainer}
      >
          <CardName iconName={itemData.iconName} key={index} 
                    warning={changeWarning(24, itemData.cardName, item.plantStage )} 
                    onclick={index == activeItem? true : false} 
          />
      </TouchableOpacity>
    );
  }
  return (
    loading ? <LoadingScreen />:
    <View style={styles.container}>
    <View style={styles.wrapper}>
      <HeaderMyFarm />
      <View style={styles.graphContainer}>
        {Object.keys(dataChart).length === 0 ? <Text>Loading</Text>: <Line data={dataChart} unit={cardNameArray[activeItem].unit}/>}
      </View>
      <View style={styles.swipperContainer}>
          <FlatList 
             data={cardNameArray}
             contentContainerStyle ={styles.swipperWrapper}
             renderItem={({item, index}) => itemRender(item, index)}
             horizontal
             showsHorizontalScrollIndicator={false}
             ItemSeparatorComponent={() => <View style={{ width: 20 }} />}  // 20px spacing between items
          />
      </View>

       <View style={styles.desContainer}>
          <Text style={styles.desTitle}>Best Conditions:</Text>
          <View style={styles.desTextContainer}>
            <Text style = {styles.text}>
              {`Các thông số ở điều kiện lý tưởng khi cây đang trong giai đoạn ${item.plantStage.stage}:

- Nhiệt độ: ${item.plantStage.minTemperature}°C - ${item.plantStage.maxTemperature}°C
- Độ ẩm: ${item.plantStage.minHumidity}% - ${item.plantStage.minHumidity}%
- Ánh sáng: ${item.plantStage.maxLight}lux - ${item.plantStage.maxLight}lux
              `}
            </Text>
          </View>
      </View>       
      </View>
  </View>
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