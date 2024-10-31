import { StyleSheet, Text, SafeAreaView, Button, Platform, TouchableOpacity  } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState} from 'react';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-gesture-handler';
import ModalQuestion from '../Modal/ModalQuestion';
import { useSchedule, useAddSchedule, useRemoveSchedule } from '@/hooks/schedule';
import Item from '../Item';
const dataOption = [
  { key: 0, label: 'Không lập lại', type:'none'},
  { key: 1, label: 'Lặp lại hằng phút', type:'minute'},
  { key: 2, label: 'Lặp lại hằng ngày', type:'daily'},
  { key: 3, label: 'Lặp lại hằng tuần', type:'weekly' },
  { key: 4, label: 'Lặp lại hằng tháng', type:'monthly' },
];
interface DatePickerModalProps {
  isScheduling: boolean;
  setIsScheduling: (value: boolean) => void; // Function that takes a boolean value
}
const DatePickerModal: React.FC<DatePickerModalProps> = ({ isScheduling, setIsScheduling }) => {
  const {data} = useSchedule();
  const [visible, setVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timers, setTimers] = useState<dateScheduleType[]>([]); // Mảng lưu các thời gian đã được đặt
  const [show, setShow] = useState(false);
  const [repeat, setRepeat] = useState('none'); // Lưu kiểu lặp lại: 'daily', 'weekly', 'monthly'
  useEffect(() => {
    setTimers(data)
  }, [data])
  
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
  const addTimer = (date: Date, repeat: string, timeOut: NodeJS.Timeout | number = 0) => {
    // useAddSchedule(date, repeat, timeOut);
    const newDay = new Date(date);
    setTimers((prevTimers: any) => {
      //Kiểm tra thời gian trung của thời gian biểu
      const isDuplicate = prevTimers.some((dateSchedule: dateScheduleType) => {
        return dateSchedule.date.getTime() === newDay.getTime();
      });
      //Nếu không trùng thì thêm vào array
      if(isDuplicate !== true) {
        const updatedTimers = [...prevTimers, { date: new Date(date), repeat: repeat, onActive: timeOut != 0, timeOut: timeOut, _id: timeOut}];
        setIsScheduling(true),
        console.log('=> [+]', updatedTimers);
        return updatedTimers.sort((a, b) => a.date.getTime() - b.date.getTime()); // Sắp xếp theo thứ tự thời gian tăng dần
      }
      //ngược lại
      else return prevTimers;
    });
  }
  //Hàm này dùng để xóa timer ra khỏi Timers array và trả timer đã xóa về.
  //Hàm này sẽ gọi và kiểm tra nếu vượt qua thời gian hiện tại thì xóa.
  //Xóa auto
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
      const timeDifference = date.getTime() - now.getTime();
      if (timeDifference > 0) {
        // Đặt thời gian chờ cho thời gian đã lên lịch
        const timerId = setTimeout(() => {
          console.log("Tưới nước được kích hoạt vào: ", date);
          const removeDate = removeTimer();
          if(removeDate) 
            handleRepeatLogic(removeDate.date, removeDate.repeat);
        }, timeDifference);
        // Thêm thời gian mới vào mảng timers và sắp xếp lại
        console.log("Đặt hẹn giờ tưới nước vào: ", date);
        addTimer(date, repeat, timerId);
        resetRepeat();
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
         //Thêm timer 
      removeTimer();
      addTimer(newDate, repeatType, timerId);
    }
  }

  //Đây là hàm xử lí setTimeout khi đã hoàn thành một schedule nào đó.
  //Xóa manual
  const deleteTimer = (timerId: string) => {
    timers.forEach((timer) => {
      if(timer._id === timerId) {
        console.log("Đã hủy hẹn giờ tưới nước lúc: ", timer.date);
        clearTimeout(timer.timeOut);
      }
    }) 
    setTimers(prevTimer => prevTimer.filter(timer => timer._id !== timerId));
  };  
  
  //Đây là hàm lấy thứ trong tuần của timer
  const getDayofWeek = (date: Date) =>  {
    const daysOfWeek: string[] = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const dayOfWeek: string = daysOfWeek[date.getDay()]; // Lấy tên thứ trong tuần
    return dayOfWeek;
  }
  // Hàm để xử lý thay đổi trạng thái của switch
  const toggleSwitch = (date: Date) => {
    setTimers((prevData) =>
      prevData.map((item) => {
          if(item.date.getTime()  === date.getTime()) {
            //Nếu tắt switch, xóa timeOut
            if(item.onActive) clearInterval(item.timeOut);
            //Nếu bật switch, khởi tạo lại timeOut
            else {
              const timeDifference = item.date.getTime() - new Date().getTime();
              if (timeDifference > 0) {
                const newTimeout = setTimeout(() => {
                  console.log("Tưới nước được kích hoạt vào: ", item.date);
                  handleRepeatLogic(item.date, item.repeat);
                }, timeDifference);
                item.timeOut = newTimeout;
              }
            }
          }
          return {...item, onActive: !item.onActive };
      })
    );
  };
  return (
    <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.titleContainer}>
          <Text style={styles.title}>Thời Gian Biểu</Text>
          <TouchableOpacity
            onPress={() => {
              //hiển thị modal tạo giờ
              setVisible(true)
            }} 
          >
            <Icon name="plus" size={20}></Icon>
          </TouchableOpacity>
        </SafeAreaView>
      <SafeAreaView style={styles.listtimerContainer}>
        {timers.map((timer, index) => (
          <Item onDelete={() =>{deleteTimer(timer._id)}} key={index}>
            <SafeAreaView style={styles.timerContainer}>
              <SafeAreaView style={styles.left}>
              <SafeAreaView 
                  style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center'
                  }}
                >
                <Text key={index} style={styles.timerText}>{timer.date.toLocaleString().split(", ")[1]}</Text>
                {
                  timer.repeat !== 'none' ?  
                  <SafeAreaView style={styles.repeatWrapper}>
                    <Text style={styles.repeatText}>{timer.repeat}</Text>
                  </SafeAreaView>
                  : ''
                }
                </SafeAreaView>
                <Text style={styles.dateText}>{`${getDayofWeek(timer.date)}, ${timer.date.toLocaleString().split(", ")[0]}`}</Text>
              </SafeAreaView>
              <SafeAreaView style={styles.right}>
                <Switch 
                    value={timer.onActive} 
                    style = {styles.switch}
                    onValueChange={() => {
                      toggleSwitch(timer.date)
                    }} 
                    trackColor={{false: '#D9D9D9' , true: '#13852F'}}
                  />
              </SafeAreaView>
          </SafeAreaView>
          </Item>
        ))}
      </SafeAreaView>
      <ModalQuestion isOpen = {visible} setIsOpen={setVisible} 
            submit={() => {
              scheduleIrrigation()
              setVisible(false)
            }}
      >
        <SafeAreaView>
          <Text style={styles.modalTitle}>
              Edit Planting Time
          </Text>
          <SafeAreaView style={styles.datePickerWrapper}>
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={onChange}
            />
            <SafeAreaView style={styles.repeatOptionWrapper}>
              <Text style={styles.repeateTitle}>Lặp lại:</Text>
              <ModalSelector
                data={dataOption}
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
        </SafeAreaView>
      </ModalQuestion>
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