
import React, { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { convertFromTimestamp, convertToTimestamp } from "@/utils/Timestamp";

const useField = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<fieldType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
        const querySnapshot = await getDocs(collection(db, 'field'));
        // Chuyển đổi dữ liệu từ querySnapshot thành mảng subFieldType
        const data: fieldType[] = querySnapshot.docs.map(doc => {
          const docData = doc.data();
          return {
            _id: doc.id, // Lấy ID của tài liệu
            name: docData.name,
            size: docData.size,
            device: docData.device,
            latitude: docData.latitude,
            longitude: docData.longitude,
            timePlant: convertFromTimestamp(docData.timePlant),
            isPlanted: docData.isPlanted,
            isHarvest: docData.isHarvest,
            aio_key: docData.aio_key,
            aio_username: docData.aio_username,
            image: docData.image === ""? require('@/assets/images/fields/field 1.png') : docData.image,
            aio_fieldname: docData.aio_fieldname
          };
        });
        setData(data)
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
      const fetchData = async () => {
          setLoading(true); // Bắt đầu tải dữ liệu
          setError(""); // Đặt lại lỗi

         if(_id.trim() !== '') {
          try {
            const docId = _id; // Kiểm tra `_id`
            const docRef = doc(db, 'field', docId);
            const querySnapshot = await getDoc(docRef);

            if (querySnapshot.exists()) {
                const docData = querySnapshot.data();

                // Tạo đối tượng `fieldType`
                const fieldData: fieldType = {
                    _id: querySnapshot.id,
                    name: docData.name,
                    size: docData.size,
                    device: docData.device,
                    latitude: docData.latitude,
                    longitude: docData.longitude,
                    timePlant: convertFromTimestamp(docData.timePlant),
                    isPlanted: docData.isPlanted,
                    isHarvest: docData.isHarvest,
                    image: docData.image,
                    aio_key: docData.aio_key,
                    aio_username: docData.aio_username,
                    aio_fieldname: docData.aio_fieldname
                };

                setData(fieldData); // Cập nhật dữ liệu
            } else {
                setError('Document does not exist');
            }
        } catch (err) {
            setError('Failed to fetch data'); // Xử lý lỗi
            console.error(err);
        } finally {
            setLoading(false); // Kết thúc tải dữ liệu
        }
        }
      };

      fetchData(); // Gọi hàm tải dữ liệu
      // Cleanup function
      return () => {
          setLoading(false); // Đảm bảo `loading` không bị treo
      };
  }, [_id]);

  return { loading, data, error, setRefetch, refetch };
};
// Hàm cập nhật dữ liệu
const updateField = async (_id: string, updatedData: fieldType) => {
  const fieldRef = doc(db, "field", _id); // Tạo tham chiếu đến tài liệu
  try {
    await updateDoc(fieldRef, {...updatedData, timePlant: convertToTimestamp(updatedData.timePlant)});
    // await updateDoc(fieldRef, updatedData); // Cập nhật dữ liệu
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
export {useField, useFieldDetail, updateField};