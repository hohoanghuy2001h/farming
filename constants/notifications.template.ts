const notificationsTemplate: notificationType[] = [
    //Moisture
    {
        _id: '1',
        label: 'Lack of Moisture',
        content: 'Cây hiện tại đang thiếu nước, hãy tưới cây đi !!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/pump',
    },
    {
        _id: '2',
        label: 'Exceeding Moisture',
        content: 'Cây hiện tại đang quá thừa nước, hãy xử lý đi !!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/pump',
    },
    //Temperature
    {
        _id: '3',
        label: 'High temperature',
        content: 'Hiện tại nhiệt độ môi trường đang quá cao hãy sử dụng quạt!!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    {
        _id: '4',
        label: 'Low temperature',
        content: 'Hiện tại nhiệt độ môi trường đang quá thấp!!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    //Humidity
    {
        _id: '5',
        label: 'High Humidity',
        content: 'Hiện tại độ ẩm không khí đang quá cao hãy sử dụng quạt!!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    {
        _id: '6',
        label: 'Low Humidity',
        content: 'Hiện tại độ ẩm không khí đang quá cao hãy sử dụng quạt!!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    //Light
    {
        _id: '7',
        label: 'High Light',
        content: 'Hiện tại độ ẩm không khí đang quá cao hãy sử dụng quạt!!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    {
        _id: '8',
        label: 'Low Light',
        content: 'Hiện tại cây chưa được cung cấp đủ sáng hãy bật đèn!!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    //Harvest
    {
        _id: '9',
        label: 'Harvesting',
        content: 'Đã đến thời gian thu hoạch, thời gian sẽ kéo dài dài hạn hãy thường xuyên trông nom vườn nhé',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    //New Stage
    {
        _id: '10',
        label: 'New Stage',
        content: 'Cây đã chuyển sang giai đoạn mới!!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    //Disease Detected
    {
        _id: '11',
        label: 'Disease',
        content: 'Đã phát hiện bệnh ở cây!!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    //Watering
    {
        _id: '12',
        label: 'Watering',
        content: 'Hệ thống đang bật máy bơm!!!',
        date: new Date(),
        image: 'temperature-half',
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
];
export default notificationsTemplate