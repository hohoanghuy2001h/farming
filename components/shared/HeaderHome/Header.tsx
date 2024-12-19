import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { windowWidth } from '@/utils/Dimensions';
import { useRouter } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { logOut } from '@/store/userReducer';
import { useFieldDetail } from '@/hooks/field';
import { useLogout } from '@/hooks/auth/userAuth';
interface HeaderProps {
  avatar?: string,
  field?: string,
  action?: any,
  logOut?: () => void;
}

const Header: React.FC<HeaderProps> = ({avatar = null, action, logOut}) => {
  const item = useSelector((state: RootState) => state.field);
  const {data} = useFieldDetail(item.fieldID)
    const router = useRouter();
    const redictPage = () => {
      router.push({
        pathname: '/(routes)/notices',
        params: { },
    })}
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                }}
                  onPress={() => {
                    action();
                  }}
                >
                    <Image
                      style={styles.image}
                      source={require('@/assets/images/location.png')}
                    />   
                    <Text>{data?.name ? data?.name : 'Chọn field ở đây'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.right}>
               <View style={styles.notice}>
                <TouchableOpacity onPress={redictPage}>
                  <Icon name='bell' size={30}/>
                </TouchableOpacity>
                  <View style ={styles.dot}/>
               </View>
              <TouchableOpacity
                onPress={logOut}
              >
              <Image 
                   style={styles.avatar}
                   source={require('@/assets/images/avatar.png')}
               />
              </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: windowWidth,
    position: 'relative',
    zIndex: 10,
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