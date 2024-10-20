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
}
type plant = {
    day: number,
}
type stagePlant = {
    id: number,
    stage: string,
    description: string,
    minTempurature: number,
    maxTempurature: number,
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
    size: number, //Theo hecta
    device: string
    latitude: number, //location của thiết bị
    longitude: number,
    timePlant: any, 
}