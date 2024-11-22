
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, getDoc, doc, updateDoc, query, where, deleteDoc, writeBatch, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { convertToTimestamp, convertFromTimestamp } from "@/utils/Timestamp";
const useSchedule= () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<dateScheduleType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
        const subscription = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'schedule'));
                // Chuyển đổi dữ liệu từ querySnapshot thành mảng subFieldType
                const data: dateScheduleType[] = querySnapshot.docs.map(doc => {
                  const docData = doc.data();
                  return {
                    _id: doc.id, // Lấy ID của tài liệu
                    date: convertFromTimestamp(docData.date),
                    onActive: docData.onActive,
                    repeat: docData.repeat,
                    timeOut: 0,
                  };
                });
                await data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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
const useAddSchedule = (schedule: dateScheduleType) => {
    const subscription = async () => {
        try {
            if(new Date().getTime() > schedule.date.getTime()) {
                console.error("Vui lòng nhập thời gian trong tương lai.");
                return;
            }
            const q = query(
                collection(db, 'schedule'),
                where('date', '==', convertToTimestamp(schedule.date))
            );
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty) {
                const docRef = doc(db, "schedule", schedule._id);
                await setDoc(docRef, {
                    date: convertToTimestamp(schedule.date),
                    onActive: true,
                    repeat: schedule.repeat,
                })
            }
            else console.error('Thòi gian bị trùng lặp.')
        } catch (err: any) {
            console.error(err);
        } finally {
        }
    };
    subscription();
}
const useRemoveSchedule = (scheduleId: string) => {
    const removeSchedule = async () => {
      try {
        const docRef  = await doc(db, 'schedule', scheduleId);
        await deleteDoc(docRef);
      } catch (err) {
          console.error(err);
      } finally {
      }
    };
    removeSchedule();
}
const useUpdateSchedule = async (scheduleId: string, schedule: dateScheduleType) => {
    const updateSchedule = async () => {
        try {
            const userDocRef = doc(db, 'schedule', scheduleId);
            await updateDoc(userDocRef, {
                date: convertToTimestamp(schedule.date),
                onActive: schedule.onActive,
                repeat: schedule.repeat,
            });
        } catch(err) {
            console.error(err)
        } finally {}
    }
    updateSchedule()
}
const useUpdateAllSchedulewithOnActive = (data: boolean) => {
    const updateAllSchedule = async () => {
        try {
            // Create a batch instance
            const batch = writeBatch(db);
            const querySnapshot = await getDocs(collection(db, 'schedule'));
            // Iterate over each schedule ID and add an update operation to the batch
            querySnapshot.docs.forEach(doc => {
    
                batch.update(doc.ref, {
                    ...doc.data,
                    onActive: data,
                });
            })
            // Commit the batch operation
            await batch.commit();
          } catch (error) {
            console.error('Error updating schedules: ', error);
          }
    }
    updateAllSchedule();
}
export {useSchedule, useRemoveSchedule, useAddSchedule, useUpdateSchedule, useUpdateAllSchedulewithOnActive};