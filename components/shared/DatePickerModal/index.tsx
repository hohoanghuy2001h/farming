import { StyleSheet, Text, SafeAreaView, Button, Platform, TouchableOpacity  } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState} from 'react';
import ModalSelector from 'react-native-modal-selector';

const data = [
  { key: 0, label: 'Không lập lại', type:'none'},
  { key: 1, label: 'Lặp lại hằng phút', type:'minute'},
  { key: 2, label: 'Lặp lại hằng ngày', type:'daily'},
  { key: 3, label: 'Lặp lại hằng tuần', type:'weekly' },
  { key: 4, label: 'Lặp lại hằng tháng', type:'monthly' },
];
const DatePickerModal = () => {
  const [date, setDate] = useState(new Date());
  const [timerIds, setTimerIds] = useState<ReturnType<typeof setTimeout>[]>([]); // Store active timer IDs
  const [timers, setTimers] = useState<dateScheduleType[]>([]); // Mảng lưu các thời gian đã được đặt
  const [show, setShow] = useState(false);
  const [repeat, setRepeat] = useState('none'); // Lưu kiểu lặp lại: 'daily', 'weekly', 'monthly'


  //Hàm này để lưu ngày của schedule
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  //Hàm này để hiện tắt giao diện schedule
  const showDatepicker = () => {
    setShow(true);
  };
  const unShowDatePicker = () => {
    setShow(false);
  }
  //Hàm này dùng để reset lại giá trị repeat
  const resetRepeat = () => {
    setRepeat('none');
  }
  //Hàm này sẽ dùng để gán giá trị repeat khi người dùng chọn có lập lại ngày.
  const handleRepeat = (type: string) => {
    setRepeat(type)
  };
  //Hàm này sẽ thêm thời gian date vào mảng timer và sort theo dạng tăng dần 
  const addTimer = (date: Date, repeat: string) => {
    const newDay = new Date(date);
    setTimers((prevTimers: any) => {
      //Kiểm tra thời gian trung của thời gian biểu
      const isDuplicate = prevTimers.some((dateSchedule: dateScheduleType) => {
        return dateSchedule.date.getTime() === newDay.getTime();
      });
      //Nếu không trùng thì thêm vào array
      if(isDuplicate !== true) {
        const updatedTimers = [...prevTimers, { date: new Date(date), repeat: repeat}];
        console.log('=> [+]', updatedTimers);
        return updatedTimers.sort((a, b) => a.date.getTime() - b.date.getTime()); // Sắp xếp theo thứ tự thời gian tăng dần
      }
      //ngược lại
      else return prevTimers;
    });
  }
  //Hàm này dùng để xóa timer ra khỏi Timers array và trả timer đã xóa về.
  const removeTimer = (): dateScheduleType | null => {
    const now = new Date();
    let removeDate :  dateScheduleType | null = null;
    setTimers((prevTimers: dateScheduleType[]) => {
      prevTimers.forEach(timer => {
        if(timer.date < now) removeDate = timer;
      })
      const updatedTimers = prevTimers.filter(timer => timer.date > now);
      console.log('=> [-]', updatedTimers);
      return updatedTimers; // Cập nhật state với mảng mới
    });
    return removeDate;
  }
  //Hàm này dùng để chỉnh sửa thời gian timer được chọn trong mảng Timers
  const updatedTimers = (date: Date) => {}

  //Hàm này kiểm tra date được set và gọi hàm addTimers để add vào mảng và sau đó đổi repeat lại = none
  const scheduleIrrigation = () => {
      const now = new Date();
      const timeDifference = date.getTime() - now.getTime(); // Sửa ở đây
      if (timeDifference > 0) {
        console.log("Đặt hẹn giờ tưới nước vào: ", date);
        // Thêm thời gian mới vào mảng timers và sắp xếp lại
        addTimer(date, repeat);
        resetRepeat();
        // Đặt thời gian chờ cho thời gian đã lên lịch
        const timerId = setTimeout(() => {
          console.log("Tưới nước được kích hoạt vào: ", date);
          const removeDate = removeTimer();
          if(removeDate) 
            handleRepeatLogic(removeDate.date, removeDate.repeat);
        }, timeDifference);
        setTimerIds(prev => [...prev, timerId]);
      } else {
        console.log("Thời gian đã chọn phải ở tương lai");
      }
  };

  //Xử lý việc repeat date
  const handleRepeatLogic = (initialDate: Date, repeatType: string) => {
    let newDate = new Date(initialDate);
    switch (repeatType) {
      case 'minute': 
        newDate = new Date(newDate.getTime() + 1 * 60 * 1000);
        break;
      case 'daily':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'weekly':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'monthly':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      default:
        console.log("Don't have repeatType");
        return; // No repetition
    }
    console.log("Lần tưới tiếp theo sẽ vào: ", newDate);

    const timeDifference = newDate.getTime() - new Date().getTime();
    if(timeDifference > 0) {
      const timerId = setTimeout(() => {
        console.log("Tưới nước được kích hoạt vào: ", newDate);
        handleRepeatLogic(newDate, repeatType);
      }, timeDifference)
    }
    //Thêm timer 
    removeTimer();
    addTimer(newDate, repeatType);
  }

  //Đây là hàm xử lí setTimeout khi đã hoàn thành một schedule nào đó.
  const deleteTimer = (timerId: ReturnType<typeof setTimeout>, date: Date) => {
    clearTimeout(timerId);
    setTimerIds(prev => prev.filter(id => id !== timerId));
    setTimers(prevTimer => prevTimer.filter(timer => timer.date.getTime() !== date.getTime()));
    console.log("Đã hủy hẹn giờ tưới nước lúc: ", date);
    // console.log("DeleteTimer: ",timerIds, timers);
  };  
  

  return (
    <SafeAreaView>
        {show ? <Button onPress={unShowDatePicker} title="Tắt chọn thời gian tưới tiêu"/> : <Button onPress={showDatepicker} title="Chọn thời gian tưới tiêu" />}
        {show && (
          <SafeAreaView>
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChange}
            />
            <SafeAreaView>
              <Text>Lặp lại</Text>
              <ModalSelector
                data={data}
                initValue="Chọn kiểu lặp lại"
                onChange={(option) => {handleRepeat(option.type)}}
                style={styles.repeatbtn}
                selectTextStyle={styles.selectionText} // Style cho text đã chọn
                optionTextStyle={styles.optionText} // Style cho text của các option
                cancelTextStyle={styles.cancelText} // Style cho text của nút hủy
                overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Style cho overlay
                keyExtractor={(item) => item.key.toString()} // Sử dụng key để xác định giá trị
                labelExtractor={(item) => item.label} // Hiển thị label cho mỗi option
              />
            </SafeAreaView>
          </SafeAreaView>
        )}
      <Button onPress={scheduleIrrigation} title="Đặt hẹn giờ tưới tiêu" />    
      <SafeAreaView>
        {timers.map((timer, index) => (
          <SafeAreaView style={{flexDirection: 'row', gap: 20,}}>
            <Text key={index}>Thời gian tưới tiêu đã đặt: {timer.date.toLocaleString()}</Text>
            <TouchableOpacity
              style={{
                width: 30,
                height:30,
                backgroundColor: 'black',
              }} 
              onPress={() => {
                deleteTimer(timerIds[index], timer.date)
              }}
            >
                <Text>Delete Timer</Text>
            </TouchableOpacity>
          </SafeAreaView>
        ))}
      </SafeAreaView>
    </SafeAreaView>
  )
}

export default DatePickerModal

const styles = StyleSheet.create({
  repeatbtn: {},
  selectionText: {
    fontSize: 16,
  },
  optionText: {
    fontSize: 16,
    padding: 10,
  },
  cancelText: {
    fontSize: 16,
    paddingVertical: 10,
    color: 'red',
  },

})