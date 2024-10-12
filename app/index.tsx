import useUser from '@/hooks/auth/userAuth'
import { Redirect } from "expo-router";

const index = () => {
  // const router = useRouter();
  const { loading, user } = useUser();
  return (
    <>
        <Redirect href={!user ? "/(routes)/onboarding" : "/(routes)/home"} />
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
