
import React, { useEffect, useState } from "react";
import diseaseAPI from "@/constants/disease.api";
import axios from "axios";

const useDisease = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<listDataType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
          setData (diseaseAPI)
          setLoading(false)
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
};
const useDiseaseDetail = (_id: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<listDataType>();
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
        // Hàm filter dữ liệu theo search term
        const foundItem = diseaseAPI.find(item => item._id === _id);
        setLoading(false);
        setData(foundItem);
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
}
export {useDisease, useDiseaseDetail};