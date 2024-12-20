import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import sendEmail from '@/utils/gmailPush';
import { useAddNotification } from '@/hooks/notification';
import notificationsTemplate from '@/constants/notifications.template';
import { useNewestData } from '@/hooks/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tên của Task
const BACKGROUND_TASK_NAME = 'SYNC_NOTIFICATION_TASK';
// Hàm kiểm tra số ngày đã trồng và đưa ra thông báo

// Định nghĩa nhiệm vụ nền
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
        // Lấy ngày trồng từ AsyncStorage hoặc nơi lưu trữ dữ liệu của bạn
        const data = await AsyncStorage.getItem('environmentData');
        if (data) {
            console.log(data);
        } else {
          console.log('Không có data');
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
      minimumInterval: 1 * 60, // Thời gian lặp lại tối thiểu: 15 phút
      stopOnTerminate: false, // Tiếp tục chạy khi ứng dụng bị tắt
      startOnBoot: true, // Tự động chạy khi khởi động thiết bị
    });
    console.log('Background task registered!');
  } catch (err) {
    console.error('Failed to register background task:', err);
  }
};
