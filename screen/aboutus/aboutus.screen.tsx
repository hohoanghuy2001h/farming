import { StyleSheet, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useNewDetail } from '@/hooks/new'
const aboutusScreen = () => {
  const {data} = useNewDetail('2');
  return (
    <SafeAreaView style = {styles.container}>
      <Image 
        source={data?.image}
        style={styles.image}
        />
      <Text style={styles.content}>
        Cảm ơn mọi người đã cùng nhau phấn đấu trong thời gian qua để cùng nhau tốt nghiệp. Đây sẽ là kỷ niệm tuyệt vời thời đại học của chúng ta.
      </Text>
    </SafeAreaView>
  )
}

export default aboutusScreen

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
  image: {
    marginTop: 30,
  },
  content: {
    textAlign: 'justify',
    paddingHorizontal: 30,
  },
})