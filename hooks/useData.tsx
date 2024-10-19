import React, { useEffect, useState } from "react";
import stageDefault from '@/constants/stage.template'
import axios from "axios";

export default function useData(field: any, date: any) {
  const [loading, setLoading] = useState(true);
  const [daysPlant, setDaysPlant] = useState<plant>({day: 0});
  const [data, setData] = useState()
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  const channelID = '2522610';
  const format = 'json';
  const APIkey = 'TFIJYCYIARJ7QG5V';
  const URL = `https://api.thingspeak.com/channels/${channelID}/feeds.${format}?api_key=${APIkey}&average=5&results=30`
  useEffect(() => {
    const subscription = async () => {
        setDaysPlant({
            day: date,
        });
        setLoading(false);

      await axios
        .get(`${URL}`, {
          headers: {
            
          },
        })
        .then((res: any) => {
            // console.log(res.data);
          setLoading(false);
        })
    //     .catch((error: any) => {
    //       setError(error?.message);
    //       setLoading(false);
    //     });
    };
    subscription();
  }, [refetch]);

  return { loading, data, error, setRefetch, refetch };
}