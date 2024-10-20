
import React, { useEffect, useState } from "react";
import axios from "axios";
import FieldsAPI from "@/constants/fields.api";

const useField = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<fieldType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
          setData (FieldsAPI)
          setLoading(false)
      };
      subscription();
    }, [refetch]);
  
    return { loading, data, error, setRefetch, refetch };
};
const useFieldDetail = (_id: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<fieldType>();
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
        // Hàm filter dữ liệu theo search term
        const foundItem = await FieldsAPI.find(item => item._id === _id);
        setLoading(false);
        setData(foundItem);
      };
      subscription();
    }, [refetch, _id]);
  
    return { loading, data, error, setRefetch, refetch };
}
export {useField, useFieldDetail};