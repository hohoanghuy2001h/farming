import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CardName from '@/components/shared/CardName/CardName';
import { windowWidth } from '@/utils/Dimensions';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import { useData, useNewestData } from '@/hooks/data';
import Line from '@/components/shared/Chart/Line';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import LoadingScreen from '@/screen/loading/loading.screen';
import { useFieldDetail } from '@/hooks/field';
import configFeed from '@/utils/ConfigFeed';

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
  const field = useSelector((state: RootState) => state.field);
  const feed = useSelector((state: RootState) => state.feed);
  const [activeFeed, setActiveFeed] = useState('field-1.temp')
  const fieldDetail = useFieldDetail(field.fieldID);
  const {data, loading} = useData(
    fieldDetail.data?.aio_username||'',
    fieldDetail.data?.aio_key||'', 
    activeFeed);
  // useEffect(() => {
  //   console.log(feed.feed)
  // }, [])
  // const [dataChart, setDataChart] = useState({})
  // useEffect(() => {
  //   setDataChart(configDataChart(data));
  // }, [data])  
  const itemRender = (item: any, index: number) => {
    console.log(item);
    return (
      <TouchableOpacity 
        onPress={() => {
          // setActiveItem(index)
          setActiveFeed(feed.feed[index].key)
        }}
        key={index}
        style = {styles.itemContainer}
      >
          <CardName iconName={item.icon} key={index} 
                    warning={item.warning} 
                    onclick={item.key == activeFeed ? true : false} 
          />
      </TouchableOpacity>
    );
  }
  return (
    loading ?  <LoadingScreen /> : 
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderMyFarm />
        <View style={styles.graphContainer}>
          {/* {Object.keys(dataChart).length === 0 ? <Text>Loading</Text>: <Line data={dataChart} unit={feedList[activeItem].unit}/>} */}
        </View>
        <View style={styles.swipperContainer}>
            <FlatList 
              data={feed.feed}
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
                {`Các thông số ở điều kiện lý tưởng khi cây đang trong giai đoạn ${field.plantStage.stage}:

  - Nhiệt độ: ${field.plantStage.minTemperature}°C - ${field.plantStage.maxTemperature}°C
  - Độ ẩm: ${field.plantStage.minHumidity}% - ${field.plantStage.minHumidity}%
  - Ánh sáng: ${field.plantStage.maxLight}lux - ${field.plantStage.maxLight}lux
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