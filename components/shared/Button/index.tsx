import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { windowWidth } from '@/utils/Dimensions'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6'; // Thư viện icon phổ biến

interface PrimaryButtonProps {
  disable?: boolean,
  warning?: boolean,
  alert?: boolean,
  leftIcon?: string,
  rightIcon?: string,
  content: string,
  size?: 'small' | 'normal' | 'big',
  action?: any
}
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    content, disable=false,size='normal',
    leftIcon=null, rightIcon= null, alert=false, warning=false, 
    action = null,
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
                 {leftIcon && <Icon name={leftIcon} size={20} style={styles.icon} />} 
                    <Text style={[styles.text, 
                                size ==='big'? styles.bigText : size === 'small' ? styles.smallText : null,
                    ]}>
                        {content}
                    </Text>
                {rightIcon && <Icon name={rightIcon} size={20} style={styles.icon} />} 

            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    container: {
        height: 70,
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#13852F',
        borderRadius: 20,
        width: windowWidth - 130,
    },
    warning: {},
    alert: {},
    bigSize: {},
    smallSize: {},
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    bigText: {},
    smallText: {},
    icon: {},
})