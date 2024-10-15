import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import React from 'react';
import ListItem from '@/components/shared/ListItem';
import { windowWidth } from '@/utils/Dimensions';
import { useDisease } from '@/hooks/disease';

const DiseaseScreen = () => {
  const {data, loading} = useDisease();
  const renderItem = ({ item }: { item: listDataType }) => {
    return (
      <SafeAreaView style = {{marginBottom: 20}}>
        <ListItem _id={item._id} detail={item.detail} image={item.image} title={item.title} summary={item.summary} route='disease'/>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={data}
        renderItem={renderItem}
        style={styles.itemContainer}
      />
    </SafeAreaView>
  )
}

export default DiseaseScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  itemContainer: {
    marginTop: 20,
    width: windowWidth - 40,
  },

})