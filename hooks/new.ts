
import React, { useEffect, useState } from "react";
import newsAPI from "@/constants/news.api";
import axios from "axios";

const useNew = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<listDataType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
          setData (newsAPI)
          setLoading(false)
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
};
const useNewDetail = (_id: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<listDataType>();
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
        // Hàm filter dữ liệu theo search term
        const foundItem = newsAPI.find(item => item._id === _id);
        setLoading(false);
        setData(foundItem);
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
}
export {useNew, useNewDetail};