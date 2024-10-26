import React, { useEffect, useState } from "react";
import stageDefault from '@/constants/stage.template'
import axios from "axios";
import {CHANNEL_ID, API_KEY_READ} from '@env';
const useData = (field: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  const URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY_READ}&results=20`;
  useEffect(() => {
    const subscription = async () => {
      setLoading(false);
      await axios
        .get(`${URL}`, {})
        .then((res: any) => {
          setLoading(false);
          const feeds = res.data.feeds;
          const filteredData = feeds
          .filter((feed: any) => feed[field] !== null)
          .map((feed: any) => ({
            field: Math.round(parseInt(feed[field])),
            created_at:  new Date(feed.created_at),
          }))
          setData(filteredData);
        })
        .catch((error: any) => {
          setError(error?.message);
          setLoading(false);
        });
    };
    subscription();
  }, [refetch, field]);

  return { loading, data, error, setRefetch, refetch };
}
const useNewestData = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    const URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY_READ}&results=20`;
    useEffect(() => {
      const subscription = async () => {
        setLoading(false);
        await axios
          .get(`${URL}`, {})
          .then((res: any) => {
            setLoading(false);
            const feeds = res.data.feeds;
            const filteredData = feeds
            .filter((feed: any) => feed['field1'] !== null)
            const lastConfigvalue = {
                'created_at': filteredData[filteredData.length - 1].created_at,
                'data': [
                    parseInt(filteredData[filteredData.length - 1].field1), //Tempurature
                    parseInt(filteredData[filteredData.length - 1].field2), //Humidity
                    parseInt(filteredData[filteredData.length - 1].field3), //Light Intensity
                    parseInt(filteredData[filteredData.length - 1].field4)  //Soil moisturize
                ],
            }
            setData(lastConfigvalue);
          })
          .catch((error: any) => {
            setError(error?.message);
            setLoading(false);
          });
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
}
const useNewestFieldData = (field: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({})
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  const URL = `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${API_KEY_READ}&results=20`;
  useEffect(() => {
    const subscription = async () => {
      setLoading(false);
      await axios
        .get(`${URL}`, {})
        .then((res: any) => {
          setLoading(false);
          const feeds = res.data.feeds;
          const filteredData = feeds
          .filter((feed: any) => feed[field] !== null)
          .filter((feed: any) => feed[field] !== null)
          .map((feed: any) => ({
            field: Math.round(parseInt(feed[field])),
            created_at:  new Date(feed.created_at),
          }))
          const lastConfigvalue = filteredData [filteredData.length - 1];
          setData(lastConfigvalue);
        })
        .catch((error: any) => {
          setError(error?.message);
          setLoading(false);
        });
    };
    subscription();
  }, [refetch, field]);

  return { loading, data, error, setRefetch, refetch };
}
export {useData, useNewestData, useNewestFieldData}