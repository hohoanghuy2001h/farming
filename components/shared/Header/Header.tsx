import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { windowWidth } from '@/utils/Dimensions';
import { useRouter } from 'expo-router'

interface HeaderProps {
  title: string,
  right?: boolean
  backgroundColor?: string,
}

const Header: React.FC<HeaderProps> = ({title = 'Default', right = false, backgroundColor = 'white'}) => {
    const router = useRouter();
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: backgroundColor}]}>
           <TouchableOpacity style={styles.left} onPress={() => router.back()}>
              <Icon name="arrow-left" style={styles.icon} size={20} /> 
           </TouchableOpacity>
           <SafeAreaView style={styles.center}>
              <Text style={styles.title}>{title}</Text>
           </SafeAreaView>
           <SafeAreaView style={styles.right}>
              { right? 
              <SafeAreaView style={styles.iconContainer}>
                <Icon name="flag" style={styles.icon} color={'white'} size={20} /> 
              </SafeAreaView>
              : <></>
              }
           </SafeAreaView>
        </SafeAreaView>
    )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth,
    backgroundColor: 'none',
  },
  left: {
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 20,
  },
  right: {
    width: 40,
    aspectRatio: 1/1,
    marginRight: 20,
  },
  iconContainer: {
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  center: {},
  icon: {},
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
})