type User = {
    _id: string;
    name: string;
    email: string;
    password?: string;
    createdAt: string;
    updatedAt: string;
};
type weather = {
   type: string,
   temperature : number,
   humidity: number,
   feellike: number,
   wind: number
}
type plant = {
    day: number,
}
type stagePlant = {
    id: number,
    stage: string,
    description: string,
    minTemperature: number,
    maxTemperature: number,
    minHumidity: number,
    maxHumidity: number,
    minLight: number,
    maxLight: number,
    days: number,
}
type listDataType = {
    _id: string;
    image: any;
    title: string;
    summary: string;
    detail: string;
};
type fieldType = {
    _id: string,
    image: any,
    name: string,
    size: number, // Theo hecta
    device: Array<string>, // Mảng chuỗi (Array of strings)
    latitude: number, // Location của thiết bị
    longitude: number,
    timePlant: any, 
    apiReadKey: string,
    isPlanted: boolean,
    channelID: string,
    isHarvest: boolean,
    apiWriteKey: string,
};
type dateScheduleType = {
    _id: string,
    date: Date,
    repeat: string,
    onActive: boolean,
    timeOut: NodeJS.Timeout | number,
}