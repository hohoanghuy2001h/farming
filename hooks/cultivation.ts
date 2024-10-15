
import React, { useEffect, useState } from "react";
import cultivationAPI from "@/constants/cultivation.api";
import axios from "axios";

const useCultivation = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<listDataType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
          setData (cultivationAPI)
          setLoading(false)
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
};
const useCultivationDetail = (_id: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<listDataType>();
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
        // Hàm filter dữ liệu theo search term
        const foundItem = cultivationAPI.find(item => item._id === _id);
        setLoading(false);
        setData(foundItem);
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
}
export {useCultivation, useCultivationDetail};