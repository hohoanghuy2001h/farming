const notificationsTemplate = [
    //Moisture
    {
        label: 'Lack of Moisture',
        content: 'Cây hiện tại đang thiếu nước, hãy tưới cây đi !!!',
        date: new Date(),
        image: require('@/assets/images/notice/lowsoil.png'),
        isRead: false,
        navigateLink: '/(routes)/controller/pump',
    },
    {
        label: 'Exceeding Moisture',
        content: 'Cây hiện tại đang quá thừa nước, hãy xử lý đi !!!',
        date: new Date(),
        image: require('@/assets/images/notice/highsoil.png'),
        isRead: false,
        navigateLink: '/(routes)/controller/pump',
    },
    //Temperature
    {
        label: 'High Temperature',
        content: 'Hiện tại nhiệt độ môi trường đang quá cao hãy sử dụng quạt!!!',
        date: new Date(),
        image: require('@/assets/images/notice/hightemp.png'),
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    {
        label: 'Low Temperature',
        content: 'Hiện tại nhiệt độ môi trường đang quá thấp!!!',
        date: new Date(),
        image: require('@/assets/images/notice/lowtemp.png'),
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    //Humidity
    {
        label: 'High Humidity',
        content: 'Hiện tại độ ẩm không khí đang quá cao hãy sử dụng quạt!!!',
        date: new Date(),
        image: require('@/assets/images/notice/highhumid.png'),
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    {
        label: 'Low Humidity',
        content: 'Hiện tại độ ẩm không khí đang quá cao hãy sử dụng quạt!!!',
        date: new Date(),
        image: require('@/assets/images/notice/lowhumid.png'),
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    //Light
    {
        label: 'High Light',
        content: 'Hiện tại độ ẩm không khí đang quá cao hãy sử dụng quạt!!!',
        date: new Date(),
        image: require('@/assets/images/notice/lowsoil.png'),
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    {
        label: 'Low Light',
        content: 'Hiện tại cây chưa được cung cấp đủ sáng hãy bật đèn!!!',
        date: new Date(),
        image: require('@/assets/images/notice/lowsoil.png'),
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    //Harvest
    {
        label: 'Harvesting',
        content: 'Đã đến thời gian thu hoạch, thời gian sẽ kéo dài dài hạn hãy thường xuyên trông nom vườn nhé',
        date: new Date(),
        image: require('@/assets/images/notice/harvesting.png'),
        isRead: false,
        navigateLink: '',
    },
    //New Stage
    {
        label: 'New Stage',
        content: 'Cây đã chuyển sang giai đoạn mới!!!',
        date: new Date(),
        image: require('@/assets/images/notice/newseason.png'),
        isRead: false,
        navigateLink: '',
    },
    //Disease Detected
    {
        label: 'Disease',
        content: 'Đã phát hiện bệnh ở cây!!!',
        date: new Date(),
        image: require('@/assets/images/notice/disease.jpg'),
        isRead: false,
        navigateLink: '/(routes)/controller/diseases',
    },
    //Watering
    {
        label: 'Watering',
        content: 'Hệ thống đang bật máy bơm!!!',
        date: new Date(),
        image: require('@/assets/images/notice/setting.png'),
        isRead: false,
        navigateLink: '/(routes)/controller/fan',
    },
    //New Season
    {
        label: 'New Season',
        content: 'Đã bất đầu một mùa vụ mới!!!',
        date: new Date(),
        image: require('@/assets/images/notice/newseason.png'),
        isRead: false,
        navigateLink: '',
    },
    //Change Time PlantPlant
    {
        label: 'Change Time Plant',
        content: 'Thời gian trồng đã bị thay đổi!!!',
        date: new Date(),
        image: require('@/assets/images/notice/setting.png'),
        isRead: false,
        navigateLink: '',
    },
];
export default notificationsTemplate