import { View, StyleSheet, Text, Modal, ModalProps, StatusBar, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '@/utils/Dimensions';
type PROPS = ModalProps & {
    isOpen: boolean,
    setIsOpen: (value: boolean) => void;
    submit: () => void,
}
const ModalQuestion = ({isOpen, setIsOpen, submit, children, ...rest}: PROPS) => {
  const content = (
    <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
    >
    <View style={styles.container}>
       <View style={styles.wrapper}>
          {children}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={submit}
              style={[styles.button, {backgroundColor: '#59C36A'}]}
            >
              <Text style={[styles.buttonText, {color: 'white'}]}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => setIsOpen(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity >
          </View>
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

export default ModalQuestion

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
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