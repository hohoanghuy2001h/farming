import { Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import {CardInfo} from '@/components/shared/CardInfo/CardInfo';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import { windowWidth } from '@/utils/Dimensions';
import { useNewestData } from '@/hooks/data';
import { useEffect } from 'react';
const dataTemplate = [
  {
    label: 'Temperature',
    value: 0,
    unit: '°C',
    warning: false,
    timeUpdate: '',
  },
  {
    label: 'Humidity',
    value: 0,
    unit: '%',
    warning: true,
    timeUpdate: '',
  },
  {
    label: 'Light Intensity',
    value: 0,
    unit: '%',
    warning: false,
    timeUpdate: '',
  },
  {
    label: 'Soil Moisturize',
    value: 0,
    unit: '%',
    warning: false,
    timeUpdate: '',
  },
]
const changeValue = (data: any)  => {
  if(Object.keys(data).length !== 0){
    dataTemplate.map((item, index) => {
      item.value = data.data[index];
      item.timeUpdate = new Date(data.created_at).toLocaleString();
    })   
  }
  return dataTemplate;
}
export default function InformationScreen() {
  const {data} = useNewestData();
  useEffect(() => {
    changeValue(data);
  }, [data])
  
  const renderItem = (data: any) => {
    return (
      <CardInfo label={data.item.label} type={data.item.unit} value={data.item.value} warning={data.item.warning} date={data.item.timeUpdate} />
    );
  }
  return (
  <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.wrapper}>
      <HeaderMyFarm />
      <SafeAreaView style = {styles.contentContainer}>
        <SafeAreaView style={styles.leftContainer}>
          <FlatList
            data={dataTemplate} 
            renderItem={renderItem}
            contentContainerStyle={styles.cardContainer} // Áp dụng gap cho container
            />
        </SafeAreaView>
        <SafeAreaView style={styles.rightContainer}>
            <Image 
              style={styles.plantImage} 
              source={require('@/assets/images/stages/Branching.png')}
            />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  wrapper: {
    width: windowWidth - 40,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  headerName: {},
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftContainer: {
    width: '38%',
  },
  rightContainer: {
    width: '62%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardContainer: {
    gap: 20,
    marginVertical: 20,
  },
  plantImage: {
    width: '100%',
    resizeMode: 'contain',
  }
});
