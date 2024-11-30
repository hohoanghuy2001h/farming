import { StyleSheet, Text, View, Image , TouchableOpacity} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
interface ListItemProps {
    _id: string;
    image: any;
    title: string;
    summary: string;
    date: Date;
    route: string
}
const ListItem: React.FC<ListItemProps> = ({_id, date, image, summary,title,route }) => {
    const router = useRouter();
    const redictNewPage = () => {//Đây là function điều hiếu trang
        router.push({
          pathname: route,
        });
      };
    return (
    <View style={styles.container}>
        <View style={styles.leftContainer}>
            {/* <Image 
                source={image}
                style={styles.image}
            />  */}
        </View>
        <View style={styles.rightContainer}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textSummary} numberOfLines={3}>{summary}</Text>
            <View style ={styles.bottomText}>
              <Text style={styles.textDate}>{date.toLocaleString()}</Text>
              <TouchableOpacity style={styles.button} onPress={redictNewPage}>
                  <Text style={styles.textDetail}>View Detail &gt;&gt;</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftContainer: {
        flex: 3,
    },
    image:{
        height: 110,
        aspectRatio: 1/1,
        borderRadius: 100,
    },
    rightContainer: {
        flex: 7,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textSummary: {
        textAlign: 'justify',
    },
    button: {
    },
    textDetail: {
        textAlign: 'right',
        fontWeight: 'bold',
    },
    textDate: {
      fontSize: 10,
      color: 'gray',
    },
    bottomText: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
    }
})