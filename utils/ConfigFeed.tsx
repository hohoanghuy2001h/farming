import feedTemplate from "@/constants/feed.template";
const changeWarning = (data: number, label: string, stagePlant: stagePlant) => {
  let warning = 0;
  switch(label) {
    case 'Temperature':
        if(data > stagePlant.maxTemperature ) warning = 2;
        else if( data < stagePlant.minTemperature) warning = 1;
      break;
    case 'Humidity':
        if(data > stagePlant.maxHumidity ) warning = 2;
        else if( data < stagePlant.minHumidity) warning = 1;      
        break;
    case 'Light intensity':
        if(data > stagePlant.maxLight ) warning = 2;
        else if( data < stagePlant.minLight) warning = 1;  
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
        feedTemplate.filter((feed) => {return data.some(item => item.data.name === feed.label)})
        .map((feed) => {
             // Lấy phần tử tương ứng từ data
             const dataItem = data.find(item => item.data.name === feed.label);
             if (dataItem) {
                 return {
                     ...feed,
                     value: parseFloat(dataItem.data.last_value), // Lấy giá trị từ data
                     warning: changeWarning(parseFloat(dataItem.data.last_value), feed.label, stage), // Tạo cảnh báo
                     timeUpdate: new Date(dataItem.created_at).toISOString(), // Đảm bảo rằng create_at là một Date
                     key:  dataItem.data.key,
                 };
             }
 
             return feed; // Trả về feed nếu không tìm thấy đối tượng tương ứng
        })
    return matchedFeeds;
}
export default configFeed;