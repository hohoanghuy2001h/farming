import React, { useEffect, useState } from "react";
import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useUser() {
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