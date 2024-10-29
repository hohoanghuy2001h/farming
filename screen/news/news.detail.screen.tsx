import { StyleSheet, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useNewDetail } from '@/hooks/new'
const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const idAsString = Array.isArray(id) ? id[0] : id;
  const {data} = useNewDetail(idAsString);
  return (
    <SafeAreaView style = {styles.container}>
      <Text style={styles.title}>{data?.title}</Text>
      <Image 
        source={data?.image}
        style={styles.image}
        />
      <ScrollView 
            showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
            showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang nếu có
      >
        <Text style={styles.content}>{data?.detail}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 10,
  },
  image: {},
  content: {
    textAlign: 'justify',
    paddingHorizontal: 30,
  },
})