import { StyleSheet, Text, View, FlatList, TouchableOpacity  } from 'react-native'
import FieldItem from '../FieldItem'
import { useField } from '@/hooks/field'
import React, { useEffect, useState } from 'react'
import { windowWidth } from '@/utils/Dimensions'
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentField } from '@/store/fieldReducer'
import Icon from 'react-native-vector-icons/FontAwesome'
import { router } from 'expo-router'
const FieldScreen = () => {
  const {data, loading} = useField();
  const field = useSelector((state: RootState) => state.field);
  const [activeIndex, setActiveIndex] = useState(field.fieldID);
  const dispatch = useDispatch();
  const redictNewPage = () => {//Đây là function điều hướng trang
    router.push({
      pathname: "/(routes)/qrcode",
      params: {  },
    });
  };
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
  const qrCoderedict = () => {
    redictNewPage();
  }
  return (
    <View style ={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>List of Fields</Text>
          <TouchableOpacity onPress={qrCoderedict}>
            <Icon name="qrcode" size={40} color="black" />
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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