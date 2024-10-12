import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { useRouter } from 'expo-router'

interface FooterProps {
    title: string;
}

const Footer: React.FC<FooterProps> = ({title}) => {
    const router = useRouter();
    return (
        <View style={styles.footer}>
            <View style = {styles.navigation}>
                <TouchableOpacity onPress={() => router.back()} style = {styles.button}>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => router.back()} style = {styles.button}>
              
            </TouchableOpacity>
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    footer: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 35,
      },
    navigation: {
        flexDirection: 'row',
        gap: 18,
        alignItems: 'center',
    },
      title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
      button: {
        backgroundColor: '#d9d9d9',
        color: 'black',
        padding: 13,
        borderRadius: 10,
      },
      buttonText: {
        color: '#fff',
      },
      buttonPlaceholder: {
        width: 50, // Placeholder width for spacing
      },
})