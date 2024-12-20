import {useUser} from '@/hooks/auth/userAuth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from "expo-router";
import { useEffect, useState } from 'react';

const index = () => {
  // const router = useRouter();
  const { loading, user } = useUser();
  const [currentUser, setCurrentUser] = useState("")
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await AsyncStorage.getItem('currentUser');
        setCurrentUser(user ? JSON.parse(user) : "");
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);
  return (
    <>
        <Redirect href={!currentUser ? "/(routes)/onboarding" : "/(routes)/home"} />
    </>
  );
  // // Sử dụng useEffect để tự động chuyển sang trang 'introduce'
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.replace('/introduce');
  //   }, 100); // Chờ 100ms để đảm bảo component đã được gắn

  //   return () => clearTimeout(timer); // Dọn dẹp
  // }, []);
  // return null; // Không cần hiển thị gì, vì sẽ chuyển trang ngay lập tức

  
}

export default index
