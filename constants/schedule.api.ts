const scheduleAPI: dateScheduleType[] = [
    {
        _id: '0',
        date: (() => {
            const date = new Date();
            date.setHours(16, 0, 0, 0); // Đặt giờ là 4 giờ chiều
            return date;
        })(),
        repeat: 'none', // Giá trị này đã đúng
        onActive: true,
        timeOut: 0, // Nếu bạn cần sử dụng NodeJS.Timeout, hãy thay đổi giá trị này
    },
    {
        _id: '1',
        date: (() => {
            const date = new Date();
            date.setHours(18, 0, 0, 0); // Đặt giờ là 8 giờ tối
            return date;
        })(),
        repeat: 'none', // Giá trị này đã đúng
        onActive: true,
        timeOut: 0,
    },
    {
        _id: '2',
        date: (() => {
            const date = new Date();
            date.setHours(20, 0, 0, 0); // Đặt giờ là 6 giờ chiều
            return date;
        })(),
        repeat: 'none', // Giá trị này đã đúng
        onActive: true,
        timeOut: 0,
    },
];

export default scheduleAPI;