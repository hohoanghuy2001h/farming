import React, { useCallback, useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword , onAuthStateChanged, signOut, Auth, User } from "firebase/auth";
import {auth} from '@/firebaseConfig'
import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";


const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const subscription = async () => {
        // setUser({
        //   _id: '11',
        //   name: 'Huy',
        //   email: 'huy',
        //   password: 'huy',
        //   createdAt: 'huy',
        //   updatedAt:'huy',

        // });
        setLoading(false);
    //   const accessToken = await AsyncStorage.getItem("access_token");
    //   const refreshToken = await AsyncStorage.getItem("refresh_token");

    //   await axios
    //     .get(`${SERVER_URI}/me`, {
    //       headers: {
    //         "access-token": accessToken,
    //         "refresh-token": refreshToken,
    //       },
    //     })
    //     .then((res: any) => {
    //       setUser(res.data.user);
    //       setLoading(false);
    //     })
    //     .catch((error: any) => {
    //       setError(error?.message);
    //       setLoading(false);
    //     });
    };
    subscription();
  }, [refetch]);

  return { loading, user, error, setRefetch, refetch };
}
const useCreateUser = (auth: Auth) => {
  const createUser = useCallback(async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true; // Trả về true nếu thành công
    } catch (error: any) {
      console.error("Error creating user:", error.message);
      return false; // Trả về false nếu có lỗi
    }
  }, [auth]);

  return createUser;
};
const useLogin = (auth: Auth) => {
  const createUser = useCallback(async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true; // Trả về true nếu thành công
    } catch (error: any) {
      console.error("Error login user:", error.message);
      return false; // Trả về false nếu có lỗi
    }
  }, [auth]);

  return createUser;
};
const useLogout = (auth: Auth) => {
  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      return true;
      // Có thể thêm logic khác sau khi đăng xuất, ví dụ: chuyển hướng trang
    } catch (error: any) {
      console.error("Error signing out:", error.message);
      return false;
    }
  }, [auth]);
  return logout;
}
const useAuthStatus = (auth: Auth) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Người dùng đã đăng nhập
        setUser(user);
        console.log("Người dùng đăng nhập");
      } else {
        // Người dùng đã đăng xuất
        console.log("Người dùng đăng xuất");
        setUser(null);
      }
      setLoading(false); // Đã hoàn thành việc kiểm tra trạng thái
    });
    return () => unsubscribe();
  }, [user]);
  return {user, loading}
}


export {useUser,useCreateUser,useLogin, useLogout, useAuthStatus};