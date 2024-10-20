import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity  } from 'react-native'
import FieldItem from '../FieldItem'
import { useField } from '@/hooks/field'
import React, { useState } from 'react'
import { windowWidth } from '@/utils/Dimensions'
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentField } from '@/store/fieldReducer'
const FieldScreen = () => {
  const {data, loading} = useField();
  const item = useSelector((state: RootState) => state.field);
  const [activeIndex, setActiveIndex] = useState(item.fieldID ? Number(item.fieldID) - 1: -1);
  const dispatch = useDispatch();
  const activeItem = (index: number, item: fieldType) => {
    setActiveIndex(index);
    dispatch(getCurrentField(item._id));
  }
  const renderFieldItem = ({ item, index }: { item: fieldType; index: number }) => {
    return (
      <TouchableOpacity 
        onPress={() => activeItem(index, item)}
      >
        <FieldItem item={item} active ={index === activeIndex}/>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style ={styles.container}>
      <SafeAreaView style={styles.wrapper}>
        <Text style={styles.title}>List of Fields</Text>
        <FlatList 
          data={data}
          renderItem={renderFieldItem}
          key={2} // Change the key to force a full re-render when numColumns changes
          numColumns={2} // Dynamic number of columns
          columnWrapperStyle = {styles.column}
          keyExtractor={item => item._id}
        />
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default FieldScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }, 
  wrapper: {
    marginTop: 20,
    width: windowWidth - 50,
    gap: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  column: {
    justifyContent: 'space-between', // Even space between columns
    marginBottom: 20,
  },
})