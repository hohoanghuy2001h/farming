import React, { useEffect, useState } from "react"; 
import * as Location from 'expo-location';
import axios from "axios";
import { Alert } from "react-native";
export default function useWeather() {
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState<weather>();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  const WEATHER_KEY = '7e6ce4571d3bede6a17a38c8514a7de7';
  const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
  useEffect(() => {
    const getForecast = async () => {
        setRefetch(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted') {
            Alert.alert('Permission to access location was denied.');
        }
        let location = await Location.getCurrentPositionAsync();
        await axios
        .get(`${WEATHER_URL}`, {
          params: {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            appid: WEATHER_KEY,
            units: 'metric',
          }
        })
        .then((res: any) => {
            setForecast({
              type: res.data.weather[0].main,
              temperature : res.data.main.temp,
              humidity: res.data.main.humidity,
              feellike: res.data.main['feels_like'],
              wind: res.data.wind['speed'],
            });
            console.log(res.data);
            setLoading(false);
        })
        .catch((error: any) => {
          setError(error?.message);
          setLoading(false);
        });
    };
    getForecast();
  }, [refetch]);

  return { loading, forecast, error, setRefetch, refetch };
}