
import React, { useEffect, useState } from "react";
import axios from "axios";
import noticesAPI from "@/constants/notices.api";


const useNotices = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<listDataType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
          setData (noticesAPI)
          setLoading(false)
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
};
const useNoticesDetail = (_id: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<listDataType>();
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
        // Hàm filter dữ liệu theo search term
        const foundItem = noticesAPI.find(item => item._id === _id);
        setLoading(false);
        setData(foundItem);
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
}
const useAddNotice = ({item} : {item : listDataType }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<listDataType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
        // Hàm add dữ liệu theo search term
        noticesAPI.push(item)
        setData(noticesAPI)
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
}
export {useNotices, useNoticesDetail, useAddNotice};