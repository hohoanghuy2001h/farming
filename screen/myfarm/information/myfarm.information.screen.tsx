import { View, StyleSheet, Image, FlatList} from 'react-native';
import {CardInfo} from '@/components/shared/CardInfo/CardInfo';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import { windowWidth } from '@/utils/Dimensions';
import { useNewestData } from '@/hooks/data';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import stageImages from '@/assets/images/stages';
import stageDefault from '@/constants/stage.template';
import LoadingScreen from '@/screen/loading/loading.screen';
import { useFieldDetail } from '@/hooks/field';
import configFeed from '@/utils/ConfigFeed';
import { setFeed } from '@/store/feedReducer';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function InformationScreen() {
  const field = useSelector((state: RootState) => state.field);
  const {data, loading} = useNewestData(field.fieldID)
  const [feedList, setFeedList] = useState<feedType[]>([]);
  const dispatch = useDispatch();
  const saveEnviroment = async (data: any) => {
    await AsyncStorage.setItem('environmentData', JSON.stringify(data));
  }
  useEffect(() => {
    setFeedList(configFeed(data, field.plantStage))
  }, [data])
  useEffect(() => {
    dispatch(setFeed(feedList));
    saveEnviroment(feedList);
  }, [feedList])
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getStageProgress = () => {
    stageDefault.forEach((stage, index) => {
      if(stage === field.plantStage) setCurrentPage(index)
    })
  }
  useEffect(() => {
    getStageProgress();
  }, [field,currentPage])
  const renderItem = (data: any) => {
    return (
      <CardInfo label={data.item.key} type={data.item.unit} value={data.item.value} warning={data.item.warning} date={new Date(data.item.timeUpdate)} />
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
              data={feedList} 
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
    width: '42%',
  },
  rightContainer: {
    width: '55%',
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
