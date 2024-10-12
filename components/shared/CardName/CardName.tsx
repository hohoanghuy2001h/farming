import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
const screenWidth = Dimensions.get('window').width;

interface CardNameProps {
    iconType?: 'FontAwesome6' | 'Entypo' | 'AntDesign' | 'Feather'; // Loại icon (FontAwesome hoặc Entypo)
    iconName?: string;
    onclick?: boolean;
    warning?: number;
}
// Định nghĩa kiểu cho các component icon
type IconMap = {
    [key in 'FontAwesome6' | 'Entypo' | 'AntDesign' | 'Feather']: React.ComponentType<{ name: string; size: number; color: string; style?: object }>;
};
const CardName: React.FC<CardNameProps> = ({iconType = 'FontAwesome6',iconName = 'temperature-half', onclick = false, warning= 0}) => {
    // Tạo đối tượng để ánh xạ các loại icon
    const iconMap = {
        FontAwesome6: FontAwesome6,
        Entypo: Entypo,
        AntDesign: AntDesign,
        Feather: Feather,
    };
    const colorIcon = onclick? 'white': '#13852F';
    const IconComponent = iconMap[iconType]; 
    return (
    <View style={[styles.container, onclick ? styles.onclick : null]}>
        <IconComponent name={iconName} size={40} color={colorIcon} />
        <Text style={[styles.state,
                      onclick ? styles.onclickState : null,
                      warning == 1? styles.stateHigh : warning == 2 ? styles.stateLow : null 
        ]}>
            {warning  == 0 ? 'GOOD': warning == 1 ? 'HIGH': 'LOW'}
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
    onclick: {
        backgroundColor: '#13852F',
    },
    onclickState: {
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