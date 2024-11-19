import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import {CardInfo} from '@/components/shared/CardInfo/CardInfo';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import { windowWidth } from '@/utils/Dimensions';
import { useNewestData } from '@/hooks/data';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import stageImages from '@/assets/images/stages';
import stageDefault from '@/constants/stage.template';
import LoadingScreen from '@/screen/loading/loading.screen';
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
    unit: '',
    warning: false,
    timeUpdate: '',
  },
  {
    label: 'Soil Moisturize',
    value: 0,
    unit: '',
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
const changeWarning = (data: number, label: string, stagePlant: stagePlant) => {
  let warning = false;
  switch(label) {
    case 'Temperature':
      warning = ( data < stagePlant.maxTemperature || data > stagePlant.minTemperature);
      break;
    case 'Humidity':
      warning = ( data < stagePlant.maxHumidity || data > stagePlant.minHumidity);
      break;
    case 'Light Intensity':
      warning = ( data < stagePlant.maxLight || data > stagePlant.minLight);
      break;
    case 'Soil Moisturize':
      break;
    default:
      break;
  }
  return warning;
}
export default function InformationScreen() {
  const item = useSelector((state: RootState) => state.field);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getStageProgress = () => {
    stageDefault.forEach((stage, index) => {
      if(stage === item.plantStage) setCurrentPage(index)
    })
  }
  const {data, loading} = useNewestData();
  useEffect(() => {
    changeValue(data);
  }, [data])
  useEffect(() => {
    getStageProgress();
  }, [item,currentPage])
  const renderItem = (data: any) => {
    return (
      <CardInfo label={data.item.label} type={data.item.unit} value={data.item.value} warning={changeWarning(data.item.value, data.item.label, item.plantStage)} date={data.item.timeUpdate} />
    );
  }
  return (
    loading? <LoadingScreen/> :
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderMyFarm />
        <View style = {styles.contentContainer}>
          <View style={styles.leftContainer}>
            <FlatList
              data={dataTemplate} 
              renderItem={renderItem}
              contentContainerStyle={styles.cardContainer} // Áp dụng gap cho container
              />
          </View>
          <View style={styles.rightContainer}>
              <Image 
                style={styles.plantImage} 
                source={stageImages[currentPage]}
              />
          </View>
        </View>
      </View>
    </View>
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
