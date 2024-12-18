import { StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNew } from '@/hooks/new';
import ListItem from './notices.item';
import { windowWidth } from '@/utils/Dimensions';
import { useNotification, useUpdateAllNotificationOnRead } from '@/hooks/notification';
import LoadingScreen from '../loading/loading.screen';
import configNotification from '@/utils/ConfigNotification';
const NoticesScreen = () => {
  const {data, loading} = useNotification();
  const [arrayConfig, setArrayConfig] = useState<notificationType[]>([])
  useEffect(() => {
    setArrayConfig(configNotification(data));
  }, [data])
  useEffect(() => {
    // Thực hiện delay bằng setTimeout
    const timer = setTimeout(() => {
        useUpdateAllNotificationOnRead(true);
    }, 5000); // Delay 5 giây
    // Cleanup function: Dọn dẹp timer khi component unmount
    return () => clearTimeout(timer);
}, []); // Chỉ chạy một lần khi component render
  const renderItem = ({item}: any) => {
    return (
      <SafeAreaView style = {{marginBottom: 20}}>
        <ListItem _id={item._id} date={item.date} key={item._id} image={item.image} title={item.label} summary={item.content} route='cultivation'/>
      </SafeAreaView>
    )
  }
  return (
    loading? <LoadingScreen />: 
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={arrayConfig}
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