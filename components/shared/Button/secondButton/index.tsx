import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { windowWidth } from '@/utils/Dimensions'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6'; // Thư viện icon phổ biến

interface SecondButtonProps {
  disable?: boolean,
  warning?: boolean,
  alert?: boolean,
  leftIcon?: string,
  rightIcon?: string,
  content: string,
  size?: 'small' | 'normal' | 'big',
  action?: any,
  colorIcon?: string,
}
export const SecondButton: React.FC<SecondButtonProps> = ({
    content, disable=false,size='normal',
    leftIcon=null, rightIcon= null, alert=false, warning=false, 
    action = null,
    colorIcon= 'white'
}) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={[styles.wrapper, 
                    //   warning? styles.warning : null, 
                    //   alert ? styles.alert : null,
                    //   size ==='big'? styles.bigSize : size === 'small' ? styles.smallSize : null,
                    ]}
                onPress={action}                 
            >
                 {leftIcon && <Icon name={leftIcon} size={20} style={[styles.icon, {color: colorIcon}]} />} 
                    <Text style={[styles.text, 
                                size ==='big'? styles.bigText : size === 'small' ? styles.smallText : null,
                    ]}>
                        {content}
                    </Text>
                {rightIcon && <Icon name={rightIcon} size={20} style={[styles.icon, {color: colorIcon}]} />} 

            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SecondButton

const styles = StyleSheet.create({
    container: {
        height: 70,
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
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: windowWidth - 130,
    },
    warning: {},
    alert: {},
    bigSize: {},
    smallSize: {},
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    bigText: {},
    smallText: {},
    icon: {
    },
})