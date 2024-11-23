import { useEffect, useState } from "react";
import mqtt from "mqtt";
import axios from "axios";
interface DataItem {
  created_at: Date; // Hoặc kiểu dữ liệu chính xác (nếu không phải string)
  value: string; // Thay đổi kiểu `any` thành kiểu cụ thể nếu biết rõ
}
const useData = (aio_username: string, aio_key: string, feed_key: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataItem[]>([])
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    if(aio_username !== '' && aio_key !== '' && feed_key !== '') {
      const URL = `https://io.adafruit.com/api/v2/${aio_username}/feeds/${feed_key}/data?limit=30`;
      const subscription = async () => {
        try {
          const response = await axios.get(URL, {
            headers: {
              'X-AIO-Key': aio_key, // Thêm header
            },
          });
          response.data.forEach((item: any) => {
            setData((prev) => [...prev, {
              value: item.value,
              created_at: item.created_at
            }])
          })
        } catch (err) {
          console.error('Error fetching data:', err);
        } finally {
          setLoading(false);
        }
      }
      subscription();
    }
  }, [refetch, feed_key, aio_username]);
  return { loading, data, error, setRefetch, refetch };

}
const useNewestData = (aio_username: string, aio_key: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<dataNewestType[]>([])
    const [error, setError] = useState("");
    const [refetch, setRefetch] = useState(false);
    useEffect(() => {
      if(aio_username !== '' && aio_key !== '' ) {
      const URL = `https://io.adafruit.com/api/v2/${aio_username}/feeds`;
      const subscription = async () => {
        try {
          const response = await axios.get(URL, {
            headers: {
              "X-AIO-Key": aio_key, // Thêm header
            },
          });
          const fetchData = response.data.map((data: any) => {
            return (
              {
                created_at: data.created_at,
                data: {
                  key: data.key,
                  name: data.name,
                  last_value: data.last_value,
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
      };
      subscription();
      }
    }, [refetch, aio_username, aio_key]);
  
    return { loading, data, error, setRefetch, refetch };
}
const useNewestFieldData = (aio_username: string, aio_key: string, feed_key: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("")
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    const options = {
      username: aio_username,
      password: aio_key,
    };
    // Connect to Adafruit IO
    const client = mqtt.connect("wss://io.adafruit.com:443/mqtt", options);
    client.on("connect", () => {
      // Subscribe to the feed
      client.subscribe(`${aio_username}/feeds/${feed_key}`);
    });
    client.on("message", (topic, message) => {
      try {
        const incomingData = message.toString();
        console.log("Message received:", incomingData);
        setData(incomingData); // Update state with new data
      } catch (err) {
        setError("Failed to parse message");
        console.error("Error parsing message:", err);
      } finally {
        setLoading(false);
      }
    });
    // Clean up the MQTT client connection when the component unmounts
    return () => {
      client.end();
    };
  }, [refetch, aio_username, aio_key, feed_key]);

  return { loading, data, error, setRefetch, refetch };
}
const useAddData = (aio_username: string, aio_key: string, feed_key: string, value: string) => {
   // MQTT Client Options
   const options = {
    username: aio_username,
    password: aio_key,
  };
  // Connect to Adafruit IO
  const client = mqtt.connect("wss://io.adafruit.com:443/mqtt", options);
      // Subscribe to the feed
  client.on("connect", () => {
    client.subscribe(`${aio_username}/feeds/${feed_key}`);
  });
  client.on("connect", () => {
    // Push the data to the feed
    client.publish(`${aio_username}/feeds/${feed_key}`, value, () => {
      console.log("Data sent to Adafruit IO:", value);
    });
  });
  return () => {
    client.end();
  };
}
export {useData, useNewestData, useNewestFieldData, useAddData}