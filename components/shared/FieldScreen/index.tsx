import { StyleSheet, Text, View, FlatList, TouchableOpacity  } from 'react-native'
import FieldItem from '../FieldItem'
import { useField } from '@/hooks/field'
import React, { useEffect, useState } from 'react'
import { windowWidth } from '@/utils/Dimensions'
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentField } from '@/store/fieldReducer'
const FieldScreen = () => {
  const {data, loading} = useField();
  const field = useSelector((state: RootState) => state.field);
  const [activeIndex, setActiveIndex] = useState(field.fieldID);
  const dispatch = useDispatch();
  const activeItem = (item: fieldType) => {
    setActiveIndex(item._id);
    dispatch(getCurrentField(item._id));
  }

  const renderFieldItem = ({ item, index }: { item: fieldType; index: number }) => {
    return (
      <TouchableOpacity 
        onPress={() => activeItem(item)}
      >
        <FieldItem item={item} active ={item._id === field.fieldID}/>
      </TouchableOpacity>
    )
  }
  return (
    <View style ={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>List of Fields</Text>
        <FlatList 
          data={data}
          renderItem={renderFieldItem}
          key={2} // Change the key to force a full re-render when numColumns changes
          numColumns={2} // Dynamic number of columns
          columnWrapperStyle = {styles.column}
          keyExtractor={item => item._id}
        />
      </View>
    </View>
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