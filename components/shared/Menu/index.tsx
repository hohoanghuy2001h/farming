import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList} from 'react-native'
import React, {useState} from 'react'
import menu from '@/constants/menu'
import { useRouter } from 'expo-router'
type itemProps =  {
    item: {
        image: any,
        page: any,
        namepage: string
    }
}

const Menu = () => {
    const router = useRouter();
    const [numColumns, setNumColumns] = useState(2); // Initial number of columns

    const toggleColumns = () => {
      // Toggle between 2 and 3 columns
      setNumColumns(prevColumns => (prevColumns === 2 ? 3 : 2));
    };
    const renderItemMenu = ({ item }: itemProps) => {
        return (
            <TouchableOpacity 
                style={styles.menuItem}
                onPress={
                    () => {
                    router.push({
                        pathname: item.page,
                        params: { },
                    })}}
            >
                <Image 
                    source={item.image}
                />
                <Text style={styles.textItem}>{item.namepage}</Text>
            </TouchableOpacity>
        );
    };
  return (
    <View style={styles.container}>
        <Text style={styles.titleMenu}>Manage Your Field</Text>
        <View style={styles.menuContainer}>
            <FlatList
                data={menu}
                renderItem={renderItemMenu}  
                keyExtractor={item => item.page}
                key={numColumns} // Change the key to force a full re-render when numColumns changes
                numColumns={numColumns} // Dynamic number of columns
                columnWrapperStyle = {styles.column}
            />
        </View>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        backgroundColor: '#C6E9CA',
    },
    titleMenu: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E5A1C',
        textAlign: 'center',
    },
    menuContainer: {
        flex: 1,
    },
    menuItem: {
        width: 153,
        aspectRatio: 1/1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
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
    textItem: {
        fontSize: 16,
        textAlign: 'center',
    },
    column: {
        justifyContent: 'space-between', // Even space between columns
        gap: 20,
        margin: 10,
    }
})