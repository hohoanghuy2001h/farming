import { StyleSheet, Text, View, Button, Platform, TouchableOpacity  } from 'react-native'
import React, { useEffect, useState} from 'react';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-gesture-handler';
import ModalQuestion from '../Modal/ModalQuestion';
import { useSchedule, useAddSchedule, useRemoveSchedule, useUpdateSchedule } from '@/hooks/schedule';
import Item from '../Item';
import LoadingScreen from '@/screen/loading/loading.screen';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useFieldDetail } from '@/hooks/field';
import { useAddData } from '@/hooks/data';
const dataOption = [
  { key: 0, label: 'Không lập lại', type:'none'},
  { key: 1, label: 'Lặp lại hằng phút', type:'minute'},
  { key: 2, label: 'Lặp lại hằng ngày', type:'daily'},
  { key: 3, label: 'Lặp lại hằng tuần', type:'weekly' },
  { key: 4, label: 'Lặp lại hằng tháng', type:'monthly' },
];
interface DatePickerModalProps {
  activePumpAuto: () => void;
}
const DatePickerModal: React.FC<DatePickerModalProps> = ({ activePumpAuto }) => {
  const field = useSelector((state: RootState) => state.field);
  const fieldDetail = useFieldDetail(field.fieldID);
  const {data, loading} = useSchedule();
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });
  const [timers, setTimers] = useState<dateScheduleType[]>([]); // Mảng lưu các thời gian đã được đặt
  const [repeat, setRepeat] = useState('none'); // Lưu kiểu lặp lại: 'daily', 'weekly', 'monthly', 'minutely'
  const [scheduleStack, setScheduleStack] = useState<dateScheduleType[]>([]);
  useEffect(() => {
    setTimers(data)
  }, [data])
  //Hàm này để lưu ngày của schedule
  const onChangeDay = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const onChangeTime = (event: any, selectedDate: any) => {
    const currentTime = selectedDate || time;
    setTime({
      hours: currentTime.getHours(),
      minutes: currentTime.getMinutes(),
    });    
  };
  //Hàm này để hiện tắt giao diện schedule
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeDay,
      mode: 'date',
    });
  };
  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange: onChangeTime,
      mode: 'time',
      is24Hour: false, // Sử dụng định dạng 12 giờ (AM/PM)
    });
  }
  //Reset time 
  const resetTime = () => {
    setDate(new Date());
    setTime({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    }); 
    setRepeat('none'); 
  }
  //Create a schedule
  const createSchedule = (date: Date, time: any, repeat: string) => {
    //Combine the time
    const combinedDate = new Date(date); // Tạo bản sao của đối tượng date
    combinedDate.setHours(time.hours); // Gán giờ từ time
    combinedDate.setMinutes(time.minutes); // Gán phút từ time
    combinedDate.setSeconds(0); // Đặt giây về 0 (nếu cần)
    combinedDate.setMilliseconds(0);
    const newSchedule = {
      _id: `schedule_${Math.floor(Math.random() * 2000)}`, //Đây là giá trị không có ở database
      date: combinedDate,
      onActive: true,
      repeat: repeat,
      timeOut: 0,  //Đây là giá trị không có ở database
    }
    useAddSchedule(newSchedule);
    addStack(newSchedule)
    resetTime();
    setVisible(false);
  }
  
  //Delete a schedule
  const deleteSchedule = (_id: string) => {
    useRemoveSchedule(_id)
    deleteStack(_id)
  }
  const deleteSchedulehasRepeat = (timer: dateScheduleType) => {
    let newDate = new Date(timer.date);
    deleteSchedule(timer._id);
    switch (timer.repeat) {
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
    createSchedule(newDate, 
    {
      hours: newDate.getHours(),
      minutes: newDate.getMinutes(),
    }, 
    timer.repeat)
  }
  //Add a item stack schedule
  const addStack = (schedule: dateScheduleType) => {
    if(schedule.onActive === true) {
      const timeDifference = schedule.date.getTime() - new Date().getTime();
      if (timeDifference > 0) {
        const timerId = setTimeout(() => {
          activeIrrigation(schedule); //Khi tới thời gian kích hoạt active
        }, timeDifference);

        //Không đủ thời gian cho nó vào hàng đợi
        setScheduleStack((prev) => [
          ...prev, 
          {
            ...schedule,
            timeOut: timerId
          }
        ])
        console.log(`Đã thêm schedule ${schedule._id} vào stack.`);
      }
    }
  }
  const deleteStack = (_id: string) => {
    setScheduleStack((prev) => 
      prev.filter((item) => {
        if(item._id === _id) clearInterval(item.timeOut)
          return item._id !== _id;
      })
    )
    console.log(`Đã xóa schedule ${_id} ra khỏi stack`);
  }
  //Đây là hàm active một schedule, và tự động xóa cái schedule đó ra khỏi server
  const activeIrrigation = (schedule: dateScheduleType) => {
    //Kích hoạt tưới nước
    console.log("Đã kích hoạt", schedule.date);
    activePumpAuto();
    //Xóa khỏi server
    deleteSchedulehasRepeat(schedule);
  }
  // //Đây là hàm lấy thứ trong tuần của timer
  const getDayofWeek = (date: Date) =>  {
    const daysOfWeek: string[] = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const dayOfWeek: string = daysOfWeek[date.getDay()]; // Lấy tên thứ trong tuần
    return dayOfWeek;
  }
  // // Hàm để xử lý thay đổi trạng thái của switch
  const toggleSwitch = (timerId: string, schedule: dateScheduleType) => {
      useUpdateSchedule(timerId, schedule);
      if(schedule.onActive === true) {
        addStack(schedule)
      }
      else {
        deleteStack(timerId);
      }
  };
  return (
    loading? <LoadingScreen />:
    <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Thời Gian Biểu</Text>
      <TouchableOpacity
        onPress={() => {
          //hiển thị modal tạo giờ
          setVisible(true)
        }} 
      >
        <Icon name="plus" size={20}></Icon>
      </TouchableOpacity>
    </View>
  <View style={styles.listtimerContainer}>
    {timers.map((timer, index) => (
      <Item onDelete={() =>{
        deleteSchedule(timer._id)
      }} key={index}>
        <View style={styles.timerContainer}>
          <View style={styles.left}>
          <View 
              style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center'
              }}
            >
            <Text key={index} style={styles.timerText}>{timer.date.toLocaleString().split(', ')[1]}</Text>
            {
              timer.repeat !== 'none' ?  
              <View style={styles.repeatWrapper}>
                <Text style={styles.repeatText}>{timer.repeat}</Text>
              </View>
              : ''
            }
            </View>
            <Text style={styles.dateText}>{`${getDayofWeek(timer.date)}, ${timer.date.toLocaleDateString()}`}</Text>
          </View>
          <View style={styles.right}>
            <Switch 
                value={timer.onActive} 
                style = {styles.switch}
                onValueChange={(value) => {
                  toggleSwitch(timer._id, {...timer, onActive: value});
                }} 
                trackColor={{false: '#D9D9D9' , true: '#13852F'}}
              />
          </View>
      </View>
      </Item>
    ))}
  </View>
  <ModalQuestion isOpen = {visible} setIsOpen={setVisible} 
        submit={() => {
          createSchedule(date, time, repeat)
        }}
  >
    <View>
      <Text style={styles.modalTitle}>
          Edit Planting Time
      </Text>
      <View style={styles.datePickerWrapper}>
        <Button title={`${date.toLocaleDateString()}`} onPress={showDatePicker} />
        <Button title={`${time.hours}:${time.minutes}`} onPress={showTimePicker} />
        <View style={styles.repeatOptionWrapper}>
          <Text style={styles.repeateTitle}>Lặp lại:</Text>
          <ModalSelector
            data={dataOption}
            initValue="Chọn kiểu lặp lại"
            onChange={(option) => {setRepeat(option.type)}}
            style={styles.repeatbtn}
            selectTextStyle={styles.selectionText} // Style cho text đã chọn
            optionTextStyle={styles.optionText} // Style cho text của các option
            cancelTextStyle={styles.cancelText} // Style cho text của nút hủy
            overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Style cho overlay
            keyExtractor={(item) => item.key.toString()} // Sử dụng key để xác định giá trị
            labelExtractor={(item) => item.label} // Hiển thị label cho mỗi option
          />
        </View>
      </View>
    </View>
  </ModalQuestion>
</View>
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
  container: {
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  listtimerContainer: {
    flexDirection: 'column',
    gap: 25,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    
  },
  timerText: {
    fontSize: 24,
  },
  dateText: {
    color: 'black',
    fontSize: 12,
  },
  repeatWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4
  },
  repeatText: {
    color: '#2E5A1C',
    fontSize: 12,
  },
  right: {
    flexDirection: 'row',
  },
  switch: {

  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  datePickerWrapper: {
    marginBottom: 20,
    gap: 20,
    justifyContent: 'center',
  },
  repeatOptionWrapper: {
    flexDirection: 'column',
    gap: 5,
  },
  repeateTitle: {}
})