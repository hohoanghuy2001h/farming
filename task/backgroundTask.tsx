import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import sendEmail from '@/utils/gmailPush';
import { useAddNotification } from '@/hooks/notification';
import notificationsTemplate from '@/constants/notifications.template';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tên của Task
const BACKGROUND_TASK_NAME = 'SYNC_PLANTING_TASK';
// Hàm kiểm tra số ngày đã trồng và đưa ra thông báo
const checkPlantingDays = (plantDate: any) => {
    const startDate = new Date(plantDate);
    const currentDate = new Date();
  
    const timeDifference = currentDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Số ngày
    const result = notificationsTemplate.find((item) => item.label === 'New Stage');

    switch(daysDifference) {
        case 9:
            if(result){
                // console.log(result)
              useAddNotification({...result, fieldID: "field_1"})
              sendEmail(result.label, "field_1", new Date().toLocaleDateString(), result.content, 'Germination');
              }
            break;
        case 40:
            if(result){
                // console.log(result)
              useAddNotification({...result, fieldID: "field_1"})
              sendEmail(result.label, "field_1", new Date().toLocaleDateString(), result.content, 'Seedling');
              }
            break;
        case 47:
            if(result){
                // console.log(result)
              useAddNotification({...result, fieldID: "field_1"})
              sendEmail(result.label, "field_1", new Date().toLocaleDateString(), result.content, 'Green Anise');
              }
            break;
        case 65:
            if(result){
                // console.log(result)
              useAddNotification({...result, fieldID: "field_1"})
              sendEmail(result.label, "field_1", new Date().toLocaleDateString(), result.content, 'Branching');
              }
            break;
        case 85:
            if(result){
                // console.log(result)
              useAddNotification({...result, fieldID: "field_1"})
              sendEmail(result.label, "field_1", new Date().toLocaleDateString(), result.content, 'Flowering');
              }
            break;
        case 100:
            if(result){
                // console.log(result)
              useAddNotification({...result, fieldID: "field_1"})
              sendEmail(result.label, "field_1", new Date().toLocaleDateString(), result.content, 'Fruit');
              }
            break;
        case 140:
            if(result){
                // console.log(result)
              useAddNotification({...result, fieldID: "field_1"})
              sendEmail(result.label, "field_1", new Date().toLocaleDateString(), result.content, 'Rippen & First Harvest');
              }
            break;
        case 200:
            if(result){
                // console.log(result)
              useAddNotification({...result, fieldID: "field_1"})
              sendEmail(result.label, "field_1", new Date().toLocaleDateString(), result.content, 'Rippen & Second Harvest');
              }
            break;  
        defautl: 
              break;
    }
  };

// Định nghĩa nhiệm vụ nền
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
        // Lấy ngày trồng từ AsyncStorage hoặc nơi lưu trữ dữ liệu của bạn
        const plantDate = await AsyncStorage.getItem('plantDate'); // Giả sử bạn lưu ngày trồng ở đây
 
        if (plantDate) {
          // Kiểm tra ngày trồng
          checkPlantingDays(JSON.parse(plantDate));
        } else {
          console.log('Không có ngày trồng trong dữ liệu');
        }
    return BackgroundFetch.BackgroundFetchResult.NewData; // Thành công
  } catch (error) {
    console.error('Error in background task:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed; // Thất bại
  }
});

// Đăng ký nhiệm vụ nền
export const registerBackgroundTask = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval:  24 * 60 * 60, // Thời gian lặp lại tối thiểu: 15 phút
      stopOnTerminate: false, // Tiếp tục chạy khi ứng dụng bị tắt
      startOnBoot: true, // Tự động chạy khi khởi động thiết bị
    });
    console.log('Background task registered!');
  } catch (err) {
    console.error('Failed to register background task:', err);
  }
};
