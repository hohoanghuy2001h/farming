import React, { useEffect, useState } from "react";
import stageDefault from '@/constants/stage.template'
import axios from "axios";

export default function useData(field: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  const channelID = '2522610';
  const format = 'json';
  const APIkey = 'RGMQCNRYULAD3MEE';
  const URL = `https://api.thingspeak.com/channels/${channelID}/feeds.${format}?api_key=${APIkey}&timescale=30`
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