
import React, { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs, addDoc, getDoc, doc, updateDoc } from "firebase/firestore";

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
            timePlant: docData.timePlant?.toDate(),
            apiReadKey: docData.apiReadKey,
            isPlanted: docData.isPlanted,
            channelID: docData.channelID,
            isHarvest: docData.isHarvest,
            apiWriteKey: docData.apiWriteKey,
            image: docData.image === ""? require('@/assets/images/fields/field 1.png') : docData.image,
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

          try {
              const docId = _id.trim() === '' ? 'field_1' : _id; // Kiểm tra `_id`
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
                      timePlant: docData.timePlant?.toDate(),
                      apiReadKey: docData.apiReadKey,
                      isPlanted: docData.isPlanted,
                      channelID: docData.channelID,
                      isHarvest: docData.isHarvest,
                      apiWriteKey: docData.apiWriteKey,
                      image: docData.image,
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
      };

      fetchData(); // Gọi hàm tải dữ liệu

      // Cleanup function
      return () => {
          setLoading(false); // Đảm bảo `loading` không bị treo
      };
  }, [_id, refetch, data]);

  return { loading, data, error, setRefetch, refetch };
};
// Hàm cập nhật dữ liệu
const updateField = async (_id: string, updatedData: fieldType) => {
  const fieldRef = doc(db, "field", _id); // Tạo tham chiếu đến tài liệu
  try {
    await updateDoc(fieldRef, updatedData); // Cập nhật dữ liệu
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
export {useField, useFieldDetail, updateField};