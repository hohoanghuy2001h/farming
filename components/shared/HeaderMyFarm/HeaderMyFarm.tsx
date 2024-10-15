import { StyleSheet, Text, SafeAreaView } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

import React from 'react'

const HeaderMyFarm = () => {
  return (
    <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.headerName}>
        <Text style={styles.plantName}>Capsicum</Text>
        <SafeAreaView style={styles.headerTime}>
            <Text style={styles.weeks}>22 weeks</Text>
            <FontAwesome name="pencil" size={20} color="gray" />   
        </SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.statusPlant}>
        <Text style={styles.statusText}>Good Health</Text>
        </SafeAreaView>
    </SafeAreaView>
  )
}

export default HeaderMyFarm

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 20,
      },
      headerName: {},
      plantName: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      headerTime: {
        flexDirection: 'row',
        gap: 5,
      },
      weeks: {},
      statusPlant: {
        backgroundColor: '#59C36A',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 25,
        justifyContent: 'center',
      },
      statusText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
      },
})