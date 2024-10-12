// import React, { useEffect, useState } from "react"; 
// import * as Location from 'expo-location';
// import axios from "axios";
// import { Alert } from "react-native";
// import { WEATHER_KEY, WEATHER_URL } from "@env";
// export default function useWeather() {
//   const [loading, setLoading] = useState(true);
//   const [forecast, setForecast] = useState(null);
//   const [error, setError] = useState("");
//   const [refetch, setRefetch] = useState(false);
//   useEffect(() => {
//     const getForecast = async () => {
//         setRefetch(true);
//         const { status } = await Location.requestPermissionsAsync();
//         if(status !== 'granted') {
//             Alert.alert('Permission to access location was denied.');
//         }
//         let location = await Location.getCurrentPositionAsync({
//             accuracy: Location.Accuracy.High,
//         });
//         await axios
//         .get(`${WEATHER_URL}lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_KEY}`)
//         .then((res: any) => {
//             setForecast(res.data.user);
//             setLoading(false);
//         })
//         .catch((error: any) => {
//           setError(error?.message);
//           setLoading(false);
//         });
//     };
//     getForecast();
//   }, [refetch]);

//   return { loading, forecast, error, setRefetch, refetch };
// }