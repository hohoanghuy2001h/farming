import { StyleSheet, Text, SafeAreaView, Image , TouchableOpacity} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
interface ListItemProps {
    _id: string;
    image: any;
    title: string;
    summary: string;
    detail: string;
    route: string
}
const ListItem: React.FC<ListItemProps> = ({_id, detail, image, summary,title,route }) => {
    const router = useRouter();
    const redictNewPage = () => {//Đây là function điều hiếu trang
        router.push({
          pathname: `/(routes)/${route}/[id]`,
          params: { id: _id },
        });
      };
    return (
    <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.leftContainer}>
            <Image 
                source={image}
                style={styles.image}
            /> 
        </SafeAreaView>
        <SafeAreaView style={styles.rightContainer}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textSummary} numberOfLines={3}>{summary}</Text>
            <TouchableOpacity style={styles.button} onPress={redictNewPage}>
                <Text style={styles.textDetail}>View Detail &gt;&gt;</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </SafeAreaView>
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
})