import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { windowWidth } from '@/utils/Dimensions';
import { useRouter } from 'expo-router'

interface HeaderProps {
  avatar?: string,
  field?: string,
}

const Header: React.FC<HeaderProps> = ({avatar = null}) => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.left}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                }}>
                    <Image
                      style={styles.image}
                      source={require('@/assets/images/location.png')}
                    />   
                    <Text>Field 1</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.right}>
               <SafeAreaView style={styles.notice}>
                  <Icon name='bell' size={30}/>
                  <SafeAreaView style ={styles.dot}/>
               </SafeAreaView>
               <Image 
                   style={styles.avatar}
                   source={require('@/assets/images/location.png')}
               />
            </SafeAreaView>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: windowWidth,
  },
  left: {},
  image: {
    width: 30,
    height: 30,
  },
  right: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  notice: {
    position: 'relative'
  },
  dot: {
    backgroundColor: 'red',
    width: 10,
    height: 10,
    borderRadius: 50,
    position: 'absolute',
    right: '10%',
  },
  avatar: {
    width: 30,
    height: 30,
  }
})