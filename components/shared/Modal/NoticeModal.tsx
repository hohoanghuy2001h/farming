import { StyleSheet, Text, SafeAreaView, Modal, Animated, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

interface NoticeModalProps {
    children: React.ReactNode; // Định nghĩa kiểu cho children
    visible: boolean;          // Prop để kiểm soát sự hiển thị của modal
}
const NoticeModal: React.FC<NoticeModalProps> = ({children, visible}) => {
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
          </Animated.View>
        </SafeAreaView>
      </Modal>
    );
  };

export default NoticeModal

const styles = StyleSheet.create({
    container: {

    },
    wrapper: {

    },
})