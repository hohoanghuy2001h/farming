import feedTemplate from "@/constants/feed.template";
import notificationsTemplate from "@/constants/notifications.template";
import { useAddNotification } from "@/hooks/notification";
import sendEmail from "./gmailPush";
const changeWarning = (data: number, label: string, stagePlant: stagePlant) => {
  let warning = 0;
  switch(label) {
    case 'Temperature':
        if(data > stagePlant.maxTemperature ) {
          warning = 2;
          const result = notificationsTemplate.find((item) => item.label === 'High temperature');
          // if(result){
          //   // console.log(result)
          // useAddNotification({...result, fieldID: 'field_1'});
          // sendEmail(result.label, 'field_1', new Date().toLocaleDateString(), result.content, "Hãy vào app kiểm tra.");
          // }
        }
        else if( data < stagePlant.minTemperature) {
          warning = 1;
          const result = notificationsTemplate.find((item) => item.label === 'Low Temperature');
          // if(result){
          //   // console.log(result)
          // useAddNotification({...result, fieldID: 'field_1'});
          // sendEmail(result.label, 'field_1', new Date().toLocaleDateString(), result.content, "Hãy vào app kiểm tra.");
          // }
        }
      break;
    case 'Humidity':
        if(data > stagePlant.maxHumidity ) {
          warning = 2;
          const result = notificationsTemplate.find((item) => item.label === 'High Humidity');
          // if(result){
          //   // console.log(result)
          // useAddNotification({...result, fieldID: 'field_1'});
          // sendEmail(result.label, 'field_1', new Date().toLocaleDateString(), result.content, "Hãy vào app kiểm tra.");
          // }
        }
        else if( data < stagePlant.minHumidity) {
          warning = 1;
          const result = notificationsTemplate.find((item) => item.label === 'Low Humidity');
          // if(result){
          //   // console.log(result)
          //   useAddNotification({...result, fieldID: 'field_1'});
          //   sendEmail(result.label, 'field_1', new Date().toLocaleDateString(), result.content, "Hãy vào app kiểm tra.");
          // }
        }      
        break;
    case 'Light intensity':
        if(data > stagePlant.maxLight ) {
          warning = 2;
          const result = notificationsTemplate.find((item) => item.label === 'High Light');
          // if(result){
          //   // console.log(result)
          //   useAddNotification({...result, fieldID: 'field_1'});
          //   sendEmail(result.label, 'field_1', new Date().toLocaleDateString(), result.content, "Hãy vào app kiểm tra.");
          // }
        }
        else if( data < stagePlant.minLight) {
          warning = 1;
          const result = notificationsTemplate.find((item) => item.label === 'Low Light');
          // if(result){
          //   // console.log(result)
          //   useAddNotification({...result, fieldID: 'field_1'});
          //   sendEmail(result.label, 'field_1', new Date().toLocaleDateString(), result.content, "Hãy vào app kiểm tra.");
          // }
        }  
        break;
    case 'Soil moisturize':
      break;
    default:
      break;
  }
  return warning;
}
const configFeed = (data: dataNewestType[], stage: stagePlant) => {
    const matchedFeeds = 
        feedTemplate.filter((feed) => {return data.some(item => item.data.key === feed.key)})
        .map((feed) => {
             // Lấy phần tử tương ứng từ data
             const dataItem = data.find(item => item.data.key === feed.key)
             if (dataItem) {
                 return {
                     ...feed,
                     value: parseFloat(dataItem.data.last_value), // Lấy giá trị từ data
                     warning: changeWarning(parseFloat(dataItem.data.last_value), feed.key, stage), // Tạo cảnh báo
                     timeUpdate: new Date(dataItem.created_at).toISOString(), // Đảm bảo rằng create_at là một Date
                 };
             }
             return feed; // Trả về feed nếu không tìm thấy đối tượng tương ứng
        })
    return matchedFeeds;
}
export default configFeed;