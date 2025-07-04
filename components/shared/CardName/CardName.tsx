import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';

interface CardNameProps {
    iconName?: string;
    active?: boolean;
    warning?: number;
}
// Định nghĩa kiểu cho các component icon

const CardName: React.FC<CardNameProps> = ({iconName = 'temperature-half', active = false, warning= 0}) => {
    // Tạo đối tượng để ánh xạ các loại icon
    const colorIcon = active? 'white': '#13852F';

    return (
    <View style={[styles.container, active ? styles.active : null]}>
        <FontAwesome6 name={iconName} size={40} color={colorIcon} />
        <Text style={[styles.state,
                      active ? styles.activeState : null,
                      warning == 1? styles.stateLow : warning == 2 ? styles.stateHigh : null 
        ]}>
            {warning  == 0 ? 'GOOD': warning == 2 ? 'HIGH': 'LOW'}
        </Text>
    </View>
  )
}

export default CardName

const styles = StyleSheet.create({
    container: {
        aspectRatio: 2 / 3, // Tự động tính chiều cao theo tỉ lệ 16:9
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#ddd',
        borderTopWidth: 0,
        backgroundColor: '#fff', 
        shadowColor: '#000',   
        shadowOffset: {
          width: 0,           
          height: 4,            
        },
        shadowOpacity: 0.25,      
        shadowRadius: 4,        
        elevation: 5,
    },
    active: {
        backgroundColor: '#13852F',
    },
    activeState: {
        backgroundColor: 'white',
        color: '#13852F',
    },
    state: {
        color: 'white',
        backgroundColor: '#37B84F',
        padding: 8,
        fontWeight: 'bold',
    },
    stateHigh: {
        backgroundColor: '#E13832',
        color: 'white',
    },
    stateLow: {
        backgroundColor: '#FFBC43',
        color: 'white',
    }
})