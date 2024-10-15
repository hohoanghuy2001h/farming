import { StyleSheet, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import useStage from '@/hooks/useStage'
import stageImages from '@/assets/images/stages'

interface CardInfoProps {
    date: number,    
}
export const CardState: React.FC<CardInfoProps> = ({date}) => {
  const {loading, stagePlant} = useStage(date);
  return (
    loading ? 
    <SafeAreaView style={styles.container}>
      <Text>Loading</Text>
    </SafeAreaView>
    :
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.wrapper}>
        <SafeAreaView style={styles.left}>
          <Image 
            style={styles.image}
            source={require('@/assets/images/stages/Seedling.png')}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.right}>
          <Text style={styles.title}>The Chilli Plant</Text>
          <Text style={styles.text}>Growth stage: {stagePlant?.stage}</Text>
          <Text style={styles.text}>{date} days</Text>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default CardState

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    borderRadius: 20,
    position: 'relative',
    backgroundColor: '#C6E9CA',
  },
  wrapper: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  left: {
    width: 130,
    aspectRatio: 1/1,
  },
  image: {
    width: 130,
    height: 180,
    position: 'absolute',
    left: -25,
    bottom: -10,
  },
  right: {},
  title: {
    color: '#2E5A1C',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  text: {
    color: 'gray',
    marginTop: 5,
  }

})