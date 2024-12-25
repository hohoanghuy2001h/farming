import { useEffect, useRef, useState } from "react";
import mqtt from "mqtt";
import axios from "axios";
import io from 'socket.io-client';
import dataTemplate from "@/constants/data.template";
interface DataItem {
  created_at: Date; // Hoặc kiểu dữ liệu chính xác (nếu không phải string)
  value: number; // Thay đổi kiểu `any` thành kiểu cụ thể nếu biết rõ
}
const useData = (_id: string, key: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataItem[]>([])
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
      const URL = `http://192.168.1.121:3000/field-data/${_id}`;
      const subscription = async () => {
        try {
          const response = await axios.get(URL);
          // const newData = response.data.devices
          // .find((data: any) => data.key === key)?.data.reverse()
          const template = dataTemplate
          .find((data: any) => data.key === key)?.data.reverse()
          .map((item: any) => ({
            value: item.value, // hoặc item.temperature nếu cần chuyển đổi
            created_at: item.created_at || item.timestamp, // Đảm bảo trường này tồn tại
          })) || [];
        
          
          setData(template); // Ghi đè dữ liệu cũ bằng dữ liệu mới
        } catch (err) {
          console.error('Error fetching data:', err);
        } finally {
          setLoading(false);
        }    
      }
      subscription();
  }, [refetch, key, _id]);
  return { loading, data, error, setRefetch, refetch };

}
const useNewestData = (_id: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<dataNewestType[]>([])
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      if(_id !== "") {
        const URL = `http://192.168.1.121:3000/field-data/${_id}`;
        const subscription = async () => {
          try {
            const response = await axios.get(URL);
            const fetchData = response.data.devices
            .map((data: any) => {
              return (
                {
                  created_at: data.data[0].created_at,
                  data: {
                    key: data.key,
                    last_value: data.data[0].value,
                  }
                }
              )
            })
            setData(fetchData);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }        
        }
        subscription();
      }
    }, [refetch, _id]);
  
    return { loading, data, error, setRefetch, refetch };
}

const useNewestFieldData = (_id: string, feed: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataItem>();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  useEffect(() => {
    const newSocket = io("http://192.168.1.121:3000/");
    setSocket(newSocket);

    if(feed === "Soil moisturize") {
      // Lắng nghe sự kiện "message"
      newSocket.on('updateSoilPumpOn', (newMessage: any) => {
        if(newMessage["id"] == Number(_id) ) {
          setData({
            value: newMessage["Soil moisturize"],
            created_at: newMessage["timeUpdated"]
          })
        }
      });
    }
    else if(feed === "Temperature") {
      // Lắng nghe sự kiện "message"
      newSocket.on('updateTempFanOn', (newMessage: any) => {
        if(newMessage["id"] == Number(_id) ) {
          setData({
            value: newMessage["Temperature"],
            created_at: newMessage["timeUpdated"]
          })
        }
      });
    }
    else if(feed === "Humidity") {
      // Lắng nghe sự kiện "message"
      newSocket.on('updateHumFanOn', (newMessage: any) => {
        if(newMessage["id"] == Number(_id) ) {
          setData({
            value: newMessage["Humidity"],
            created_at: newMessage["timeUpdated"]
          })
        }
      });
    }
    else if(feed === "Pump") {
      // Lắng nghe sự kiện "message"
      newSocket.on('pumpTriggerMCU', (newMessage: any) => {
          console.log(newMessage)
      });
    }
    else if(feed === "Fan") {
      newSocket.on('fanTrigger', (newMessage: any) => {
        console.log(newMessage)
    });
    }
    // Ngắt kết nối khi component bị unmount
    return () => {
      newSocket.disconnect();
    };
  }, [refetch, _id]);

  return { loading, data, error, setRefetch, refetch };
}

const useAddData = (value: boolean, _id: string, feed: string) => {
  try {
    const newSocket = io("http://192.168.1.121:3000/");
    if(feed === "pump") {
      newSocket.emit("pumpTrigger", {
        field: Number(_id),
        state: value,
      });
    }
    else if(feed === "fan") {
      newSocket.emit("fanTrigger", {
        field: Number(_id),
        state: value,
      });
    }
  }
  catch (error) {
    console.error(error)
  }
}
export {useData, useNewestData, useNewestFieldData, useAddData}