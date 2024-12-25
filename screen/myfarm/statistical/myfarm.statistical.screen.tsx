import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CardName from '@/components/shared/CardName/CardName';
import { windowHeight, windowWidth } from '@/utils/Dimensions';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import { useData, useNewestData } from '@/hooks/data';
// import Line from '@/components/shared/Chart/Line';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import LoadingScreen from '@/screen/loading/loading.screen';
import { useFieldDetail } from '@/hooks/field';
import Line from '@/components/shared/Chart/Line';
import { ScrollView } from 'react-native';

const configDataChart = (rawData: any) => {
  if (!rawData || rawData.length === 0) {
    // Nếu không có dữ liệu, trả về đối tượng trống hoặc một giá trị mặc định
    return {
      labels: [],
      datasets: [
        {
          data: [],
          color: () => '#37B84F', // Màu mặc định cho đường
          strokeWidth: 3, // Độ dày của đường
        },
      ],
    };
  }
    // Xử lý dữ liệu hợp lệ
    const data = {
      labels: rawData.map((item: any, index: any) => {
        try {
            if(index > 0) {
              const currentIndexDay = new Date(item.created_at).getDate();
              const prevIndexDay = new Date(rawData[index - 1].created_at).getDate();  
              if(currentIndexDay == prevIndexDay) return "";
              else return item.created_at;
            }         
            return item.created_at;
        } catch (error) {
          console.error("Error processing date:", item.created_at, error);
          return ''; // Trả về chuỗi trống nếu có lỗi
        }      }),
      datasets: [
        {
          data: rawData.map((item: any) => {
            // Kiểm tra item.value có phải là số hợp lệ không, nếu không thì gán giá trị mặc định (ví dụ: 0)
            return isNaN(parseInt(item.value)) ? 0 : parseInt(item.value);
          }),
          color: () => '#37B84F', // Mã màu hex cho đường
          strokeWidth: 3, // Độ dày của đường
        },
      ],
    };
  return data;
}
export default function StatisticalScreen() {
  const field = useSelector((state: RootState) => state.field);
  const feed = useSelector((state: RootState) => state.feed);
  const [activeFeed, setActiveFeed] = useState('Temperature');
  const [activeItem, setActiveItem] = useState(0)
  const {data, loading} = useData(field.fieldID, activeFeed);
  const [dataChart, setDataChart] = useState({})
  useEffect(() => {
      if(data.length !== 0)  {
        setDataChart(configDataChart(data));
      }
  }, [data])
  const itemRender = (item: any, index: number) => {
    return (
      <TouchableOpacity 
        onPress={() => {
          setActiveItem(index)
          setActiveFeed(feed.feed[index].key)
        }}
        key={index}
        style = {styles.itemContainer}
      >
          <CardName iconName={item.icon} key={index} 
                    warning={item.warning} 
                    active={index === activeItem} 
          />
      </TouchableOpacity>
    );
  }
  return (
    loading ?  <LoadingScreen /> : 
    <View style={styles.container}>
       <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={{ flexGrow: 1 }} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.wrapper}>
          <HeaderMyFarm />
          <View style={styles.graphContainer}>
            {Object.keys(dataChart).length === 0 ? <Text>Loading</Text>: <Line data={dataChart} unit={feed.feed[activeItem].unit}/>}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollContainer: {
    
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
    marginBottom: 100,
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