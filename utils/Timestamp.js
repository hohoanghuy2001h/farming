import { Timestamp } from "firebase/firestore";

export const convertToTimestamp = (date) => {
    const convertDate = new Date (date)
    const firebaseTimestamp = Timestamp.fromDate(convertDate);
    return firebaseTimestamp;
}
export const convertFromTimestamp = (date) => {
    return date.toDate();
}