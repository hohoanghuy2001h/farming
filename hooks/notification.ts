
import React, { useEffect, useState } from "react";
import notificationsTemplate from "@/constants/notifications.template";
import { collection, getDocs, addDoc, getDoc, doc, updateDoc, query, where, deleteDoc, writeBatch, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { convertToTimestamp, convertFromTimestamp } from "@/utils/Timestamp";
interface Notification {
    _id: string;
    content: any;
    date: any;
    isRead: any;
    label: any;
  }
const useNotification = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Notification[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        const subscription = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'notification'));
                // Chuyển đổi dữ liệu từ querySnapshot thành mảng subFieldType
                const data = querySnapshot.docs.map(doc => {
                  const docData = doc.data();
                  return {
                    _id: doc.id, 
                    content: docData.content,
                    date: convertFromTimestamp(docData.date),
                    isRead: docData.isRead,
                    label: docData.label,
                  };
                });
                data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                setData(data);

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        };
        subscription();
    }, [refetch, data]);
    return { loading, data, error, setRefetch, refetch };
};
const useAddNotification = (newNotification: notificationType) => {
    const subscription = async () => {
        try {
                const docRef = doc(db, "schedule", newNotification._id);
                await setDoc(docRef, {
                    _id: newNotification._id, 
                    content: newNotification.content,
                    date: convertToTimestamp(newNotification.date),
                    isRead: newNotification.isRead,
                    label: newNotification.label,
                })
        } catch (err: any) {
            console.error(err);
        } finally {
        }
    };
    subscription();
}
const useUpdateNotification = (newNotification :notificationType) => {
    const updateNotification = async () => {
        try {
            const userDocRef = doc(db, 'notification', newNotification._id);
            await updateDoc(userDocRef, {
                _id: newNotification._id, 
                content: newNotification.content,
                date: convertToTimestamp(newNotification.date),
                isRead: newNotification.isRead,
                label: newNotification.label,
            });
        } catch(err) {
            console.error(err)
        } finally {}
    }
    updateNotification()
}
const useDeleteNotification = (_id: string) => {
    const removeNotification = async () => {
        try {
          const docRef  = await doc(db, 'notification', _id);
          await deleteDoc(docRef);
        } catch (err) {
            console.error(err);
        } finally {
        }
      };
      removeNotification();
}
const useUpdateAllNotificationOnRead = (data: boolean) => {
    const updateAllNotification = async () => {
        try {
            // Create a batch instance
            const batch = writeBatch(db);
            const querySnapshot = await getDocs(collection(db, 'schedule'));
            // Iterate over each schedule ID and add an update operation to the batch
            querySnapshot.docs.forEach(doc => {
    
                batch.update(doc.ref, {
                    ...doc.data,
                    isRead: data,
                });
            })
            // Commit the batch operation
            await batch.commit();
          } catch (error) {
            console.error('Error updating schedules: ', error);
          }
    }
    updateAllNotification();
}
export {useNotification,useAddNotification,useUpdateNotification,useDeleteNotification,useUpdateAllNotificationOnRead};