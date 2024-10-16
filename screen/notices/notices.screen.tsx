import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import React from 'react';
import { useNew } from '@/hooks/new';
import ListItem from '@/components/shared/ListItem';
import { windowWidth } from '@/utils/Dimensions';

const NoticesScreen = () => {
  const {data, loading} = useNew();
  const renderItem = ({ item }: { item: listDataType }) => {
    return (
      <SafeAreaView style = {{marginBottom: 20}}>
        <ListItem _id={item._id} detail={item.detail} image={item.image} title={item.title} summary={item.summary} route='cultivation'/>
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

export default NoticesScreen

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