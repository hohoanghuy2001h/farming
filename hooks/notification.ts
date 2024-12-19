
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
    fieldID: string,
  }
const useNotification = (fieldID: string) => {
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
                    fieldID: docData.fieldID,
                  };
                })
                .filter(item => item.fieldID === fieldID); // Lọc theo fieldID

                data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setData(data);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        };
        subscription();
    }, [refetch, fieldID]);
    return { loading, data, error, setRefetch, refetch };
};
const useAddNotification = (newNotification: notificationType) => {
    const subscription = async () => {
        try {
                const docRef = doc(db, "notification", `notification_${Math.floor(Math.random() * 2000)}`);
                await setDoc(docRef, {
                    content: newNotification.content,
                    date: convertToTimestamp(newNotification.date),
                    isRead: newNotification.isRead,
                    label: newNotification.label,
                    fieldID: newNotification.fieldID
                })
        } catch (err: any) {
            console.error(err);
        } finally {
            console.log('Add Notification Document successfully!');
        }
    };
    subscription();
}
const useUpdateNotification = (newNotification :notificationType) => {
    const updateNotification = async () => {
        try {
            const userDocRef = doc(db, 'notification', `notification_${Math.floor(Math.random() * 2000)}`);
            await updateDoc(userDocRef, {
                content: newNotification.content,
                date: convertToTimestamp(newNotification.date),
                isRead: newNotification.isRead,
                label: newNotification.label,
            });
        } catch(err) {
            console.error(err)
        } finally {
            console.log('Update Notification Document successfully!')
        }
    }
    updateNotification();
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
            const querySnapshot = await getDocs(collection(db, 'notification'));
            // Iterate over each notification ID and add an update operation to the batch
            querySnapshot.docs.forEach(doc => {
    
                batch.update(doc.ref, {
                    ...doc.data,
                    isRead: data,
                });
            })
            // Commit the batch operation
            await batch.commit();
          } catch (error) {
            console.error('Error updating notifications: ', error);
          }
    }
    updateAllNotification();
}
export {useNotification,useAddNotification,useUpdateNotification,useDeleteNotification,useUpdateAllNotificationOnRead};