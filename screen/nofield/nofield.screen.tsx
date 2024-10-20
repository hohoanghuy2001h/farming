import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'

const NofieldScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Vui lòng hãy chọn field.</Text>
    </SafeAreaView>
  )
}

export default NofieldScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
})