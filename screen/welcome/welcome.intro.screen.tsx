import { StyleSheet, Text, SafeAreaView, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import { windowWidth,windowHeight } from '@/utils/Dimensions';
import PrimaryButton from '@/components/shared/Button';
import { useRouter } from 'expo-router'



const carouselItems = [ 
  {
    text: 'Chào mừng bạn đến với ứng dụng “Hệ thống giám sát cây ớt được áp dụng trong nông trại thông minh”.',
    image: 'a',
  },
  {
    text: 'Đây là hệ thống IOT quan sát thông minh đo đạc các thông số bên ngoài môi trường gây ảnh hưởng đến năng xuất cây ớt.',
    image: 'b',
  },
  {
    text: 'Ngoài ra, hệ thống còn ứng dụng AI đưa ra những phán đoán chính xác về bệnh tật của cây ớt và gợi ý cho người dùng những phương pháp phòng tránh và ngừa bệnh.',
    image: 'c',
  },
  {
    text: 'Hệ thống quan sát từng giai đoạn phát triển của cây ớt và đưa ra những điều kiện môi trường tiêu chuẩn để cây ớt cho năng suất tốt nhất',
    image: 'd',
  },
  {
    text: 'Hệ thống được phát triển bởi 3 thành viên: Hồ Hoàng Huy, Bùi Thanh Duy, Ngọc Trâm.',
    image: 'e',
  },
];

const WelcomeIntroScreen = () => {
  const carouselRef = useRef<any>(null); // Sử dụng any cho carouselRef
  const [currentIndex, setCurrentIndex] = useState(0); // Lưu current item's index của slide
  const router = useRouter();

  const skip = () => {  //Đây là function chuyển đến item cuối cùng của slide
    setCurrentIndex(4)
    //Dùng hàm để chuyển slide đến giá trị currentIndex (chưa làm) -> Dùng useRef
  }
  const redictNewPage = () => {//Đây là function điều hướng đến trang khác
    router.push({
      pathname: "/(routes)/login",
      params: {  },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        ref={carouselRef} // Gán ref cho carousel
        width={windowWidth}
        data={carouselItems}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item, index }) => (
          <SafeAreaView style={styles.slideItem} key={index}>
              <Image
                style={styles.image}
                // source={{ uri: item.image }}
                source={require('@/assets/images/Introduce.png')}
              />
              <SafeAreaView style={styles.textContainer}>
                <Text style={styles.text}>{item.text}</Text>
              </SafeAreaView>
          </SafeAreaView>
        )}
      />
      <SafeAreaView style={styles.pagination}>
        {carouselItems.map((_, index) => (
          <SafeAreaView key={index} 
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot, // Change style based on active/inactive
            ]}
          />
        ))}
      </SafeAreaView>
      <SafeAreaView style = {styles.buttonContainer}>
        {
          currentIndex === 4 ? 
          <PrimaryButton  content='JOIN NOW' action={redictNewPage}/>:
          <PrimaryButton  content='SKIP NOW' action={skip}/>
        }
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default WelcomeIntroScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginVertical: 110,
    gap: 60,
  },
  slideItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  image: {

  },
  textContainer: {
    paddingHorizontal: 36,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000', // Change color for active/inactive dots
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000', // Active dot color
  },
  inactiveDot: {
    backgroundColor: '#D9D9D9', // Active dot color

  },
  buttonContainer: {
    height: 80,
  }
})