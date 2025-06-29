import {
    Text,
    StyleSheet,
    SafeAreaView,
    PanResponder,
    TouchableOpacity,
    Animated,
  } from "react-native";  
import { useRef } from "react";
interface itemProps {
    onDelete: () => void; 
    children: React.ReactNode; // Explicitly define children prop
}
export default function Item({ children , onDelete }: itemProps) {
    const translateX = useRef(new Animated.Value(0)).current;
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dx < 0) {
            translateX.setValue(gestureState.dx);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -50) {
            Animated.spring(translateX, {
              toValue: -100,
              useNativeDriver: true,
            }).start();

          } else {
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    ).current;
  
    return (
      <SafeAreaView style={styles.itemContainer}>
        <Animated.View
          style={{
            flex: 1,
            transform: [{ translateX: translateX }],
          }}
        >
          <SafeAreaView {...panResponder.panHandlers}>
            {children}
          </SafeAreaView>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete()}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    item: {
      flex: 1,
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    itemContainer: {
      flexDirection: "row",
    },
    deleteButton: {
      width: 100,
      height: "100%",
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: -150,
    },
    deleteButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  });