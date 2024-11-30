import notificationsTemplate from "@/constants/notifications.template";
const configNotification = (data: any[]) => {
    const matchedNotification: notificationType[] = data
    .filter((item) => {
        // Kiểm tra nếu có phần tử trong notificationsTemplate trùng label với item
        return notificationsTemplate.some(template => template.label === item.label);
    })
    .map((item) => {
        // Tìm phần tử trong notificationsTemplate có label trùng với item
        const matchedTemplate = notificationsTemplate.find(template => template.label === item.label);
        // Thêm image vào item nếu tìm thấy phần tử trùng
        if (matchedTemplate) {
            return { ...item, image: matchedTemplate.image, navigateLink: matchedTemplate.navigateLink, label: matchedTemplate.label};
        }    
    });
    return matchedNotification;
}
export default configNotification;