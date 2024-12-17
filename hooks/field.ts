
import React, { useEffect, useState } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs, addDoc, getDoc, doc, updateDoc, query, setDoc, onSnapshot } from "firebase/firestore";
import { convertFromTimestamp, convertToTimestamp } from "@/utils/Timestamp";
const useField = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<fieldType[]>([]);
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    // Sử dụng onSnapshot thay vì getDocs
    const unsubscribe = onSnapshot(
      collection(db, "field"),
      (querySnapshot) => {
        // Khi có sự thay đổi trong collection 'field', callback này sẽ được gọi lại
        const data: fieldType[] = querySnapshot.docs.map((doc) => {
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
            image: docData.image === "" ? require('@/assets/images/fields/field 1.png') : docData.image,
            aio_fieldname: docData.aio_fieldname
          };
        });

        setData(data); // Cập nhật dữ liệu vào state
        setLoading(false); // Kết thúc quá trình tải dữ liệu
      },
      (err) => {
        setError("Failed to fetch data");
        console.error(err);
        setLoading(false); // Nếu có lỗi, dừng loading
      }
    );

    // Cleanup: Hủy listener khi component unmount hoặc refetch thay đổi
    return () => {
      unsubscribe();
    };
  }, [refetch]);

  return { loading, data, error, setRefetch, refetch };
};


// Hàm cập nhật dữ liệu
const useFieldDetail = (_id: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<fieldType>();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const fetchData = () => {
      if (_id.trim() !== "") {
        setLoading(true); // Bắt đầu tải dữ liệu
        setError(""); // Đặt lại lỗi

        try {
          const docRef = doc(db, "field", _id);

          // Sử dụng onSnapshot để lắng nghe thay đổi dữ liệu
          unsubscribe = onSnapshot(
            docRef,
            (docSnapshot) => {
              if (docSnapshot.exists()) {
                const docData = docSnapshot.data();

                // Tạo đối tượng `fieldType`
                const fieldData: fieldType = {
                  _id: docSnapshot.id,
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
                  aio_fieldname: docData.aio_fieldname,
                };

                setData(fieldData); // Cập nhật dữ liệu mới
              } else {
                setError("Document does not exist");
              }
              setLoading(false); // Kết thúc tải dữ liệu
            },
            (err) => {
              setError("Failed to fetch data");
              console.error(err);
              setLoading(false);
            }
          );
        } catch (err) {
          setError("Failed to fetch data");
          console.error(err);
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function: Hủy listener khi component unmount hoặc `_id` thay đổi
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [_id]);

  return { loading, data, error, setRefetch, refetch };
};
const updateField = async (_id: string, updatedData: fieldType) => {
  const fieldRef = doc(db, "field", _id); // Tạo tham chiếu đến tài liệu
  try {
    await updateDoc(fieldRef, {...updatedData, timePlant: convertToTimestamp(updatedData.timePlant), isPlanted: updatedData.isPlanted, isHarvest: updatedData.isHarvest });
    // await updateDoc(fieldRef, updatedData); // Cập nhật dữ liệu
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
const createField = async ( aio_fieldname: string, aio_key: string, aio_username: string, device: string[]) => {
  const _id = `field_${Math.floor(Math.random() * 2000)}`;
  const date = new Date();
  const subscription = async () => {
    try {
      const docRef = doc(db, "field", _id);
      await setDoc(docRef, {
        _id: _id,
        name: _id,
        size: 0,
        device: device,
        latitude: 0,
        longitude: 0,
        timePlant: convertToTimestamp(date),
        isPlanted: false,
        isHarvest: false,
        image: "",
        aio_key: aio_key,
        aio_username: aio_username,
        aio_fieldname: aio_fieldname
      })
    } catch (err: any) {
        console.error(err);
    } finally {
    }
  };
  subscription();
}
export {useField, useFieldDetail, updateField, createField};