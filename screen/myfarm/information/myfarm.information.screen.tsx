import { Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import {CardInfo} from '@/components/shared/CardInfo/CardInfo';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { windowWidth, windowHeight } from '@/utils/Dimensions';

const data = [
  {
    label: 'Temperature',
    value: 24,
    type: '°C',
    warning: false,
  },
  {
    label: 'Humidity',
    value: 85,
    type: '%',
    warning: true,
  },
  {
    label: 'Light',
    value: 90,
    type: '%',
    warning: false,
  },
  {
    label: 'Fertilizer',
    value: 40,
    type: '%',
    warning: false,
  },
]
export default function InformationScreen() {
  const renderItem = (data: any) => {
    return (
      <CardInfo label={data.item.label} type={data.item.type} value={data.item.value} warning={data.item.warning} />
    );
  }
  return (
  <SafeAreaView style={styles.container}>
    <SafeAreaView style={styles.wrapper}>
      <HeaderMyFarm />
      <SafeAreaView style = {styles.contentContainer}>
        <SafeAreaView style={styles.leftContainer}>
          <FlatList
            data={data} 
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
