
import React, { useEffect, useState } from "react";
import axios from "axios";
import scheduleAPI from "@/constants/schedule.api";
const useSchedule= () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<dateScheduleType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      const subscription = async () => {
        setData(scheduleAPI);
        setLoading(false);
      };
      subscription();
    }, [refetch]);
    return { loading, data, error, setRefetch, refetch };
};
const useAddSchedule = (date: Date, repeat: string, timeOut: NodeJS.Timeout | number = 0) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<dateScheduleType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    const subscription = async () => {
      try {
        const newDay = new Date(date);
        const existingSchedules = await useSchedule().data; // Giả sử useSchedule trả về lịch hiện có
        const isDuplicate = existingSchedules.some((schedule) => {
            return schedule.date.getTime() === newDay.getTime();
        });

        if (!isDuplicate) {
            const newSchedule = {_id: timeOut.toString(), date: newDay, repeat, onActive: timeOut !== 0, timeOut};

            // Gọi API để thêm lịch mới
            // const response = await axios.post('https://your-api-endpoint.com/schedules', newSchedule);
            // setData(prev => [...prev, response.data]); // Thêm lịch mới vào dữ liệu
            setData(prev => {return [...prev, newSchedule]} )
        } else {
            setError("Schedule already exists for this date.");
        }
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }};
    subscription();
    return { loading, data, error, setRefetch, refetch };
}
const useRemoveSchedule = (scheduleId: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<dateScheduleType[]>([]);
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    const removeSchedule = async () => {
      setLoading(true);
      try {
          // Gọi API để xóa lịch
          //await axios.delete(`https://your-api-endpoint.com/schedules/${scheduleId}`);
          await setData(useSchedule().data);
          setData(data.filter(timer => timer._id !== scheduleId))
      } catch (err: any) {
          setError(err.message);
      } finally {
          setLoading(false);
      }
    };
    removeSchedule();
  return { loading, data, error, setRefetch, refetch };
}
export {useSchedule, useRemoveSchedule, useAddSchedule};