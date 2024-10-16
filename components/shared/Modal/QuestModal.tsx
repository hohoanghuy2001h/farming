import { StyleSheet, Text, SafeAreaView, Modal, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

interface QuestModalProps {
    children: React.ReactNode; // Định nghĩa kiểu cho children
    visible: boolean;          // Prop để kiểm soát sự hiển thị của modal
    onSubmit: () => void;      // Hàm để đóng modal
}
const QuestModal: React.FC<QuestModalProps> = ({children, visible, onSubmit}) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          speed: 300,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
    return (
      <Modal transparent visible={showModal}>
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[styles.wrapper, {transform: [{scale: scaleValue}]}]}>
            {children}
            <SafeAreaView style={styles.buttonContainer}>
                <TouchableOpacity onPress={onSubmit} style={[styles.button, {backgroundColor: '4E9525'}]}>Yes</TouchableOpacity>
                <TouchableOpacity onPress= {() => setShowModal(false)} style={[styles.button, {backgroundColor: 'white'}]}>No</TouchableOpacity>
            </SafeAreaView>
          </Animated.View>
        </SafeAreaView>
      </Modal>
    );
  };

export default QuestModal

const styles = StyleSheet.create({
    container: {

    },
    wrapper: {

    },
    buttonContainer: {},
    button: {},
})