import { StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { windowWidth } from '@/utils/Dimensions';
import { useRouter } from 'expo-router'
import ModalQuestion from '../Modal/ModalQuestion';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useFieldDetail } from '@/hooks/field';
import ModalNotice from '../Modal/ModalNotice';

interface HeaderProps {
  title: string,
  right?: boolean
  backgroundColor?: string,
}

const Header: React.FC<HeaderProps> = ({title = 'Default', right = false, backgroundColor = 'white'}) => {
  const item = useSelector((state: RootState) => state.field);
  const {data}= useFieldDetail(item.fieldID); //Tìm kiếm thông tin của field dựa trên fieldID
  const [visible, setVisible] = useState(false);
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
            <TouchableOpacity
              onPress={() => setVisible(true)}
            >
              <SafeAreaView style={styles.iconContainer}>
                <Icon name="flag" style={styles.icon} color={'white'} size={20} /> 
              </SafeAreaView>
            </TouchableOpacity>
            : <></>
            }
          </SafeAreaView>
          <ModalNotice isOpen = {visible} setIsOpen={setVisible} submit={() => setVisible(false)}>
          <SafeAreaView>
            <SafeAreaView style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.modalTitle}>
                  Detail Stage
              </Text>
              <TouchableOpacity
                onPress={() => setVisible(false)}
              >
                <SafeAreaView
                   style={{borderWidth: 1, borderColor: 'black', borderRadius: 20, aspectRatio: 1/1, justifyContent: 'center', alignItems: 'center'}}
                >
                  <Icon name='close' size={20}></Icon>
                </SafeAreaView>
              </TouchableOpacity>
            </SafeAreaView>
            <Text style={styles.modalContent}>
              {item.plantStage.description}
            </Text>
          </SafeAreaView>
        </ModalNotice>
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalContent: {

  }
})