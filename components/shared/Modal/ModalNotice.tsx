import { SafeAreaView, StyleSheet, View, Text, Modal, ModalProps, StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowHeight, windowWidth } from '@/utils/Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
type PROPS = ModalProps & {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void;
}
const ModalNotice = ({isOpen, setIsOpen, children, ...rest}: PROPS) => {
  const content = (
    <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
    >
    <View style={styles.container}>
       <View style={styles.wrapper}>
          {children}
       </View>
    </View>
    <View 
      style={styles.backgroundModal}    
    >
    </View>
    </KeyboardAvoidingView>
  );
  return (
    <Modal
        visible={isOpen}
        transparent
        animationType='fade'
        statusBarTranslucent
        {...rest}
    >
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        {content}
    </Modal>
  )
}

export default ModalNotice

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    width: windowWidth*0.8,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  backgroundModal: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    zIndex: -1,
  }
})