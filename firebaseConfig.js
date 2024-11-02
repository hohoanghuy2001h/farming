
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCtu5B8wn9cejDd26R2xy6RkWSsqOyfnWI",
  authDomain: "myfarming-65306.firebaseapp.com",
  databaseURL: "https://myfarming-65306-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "myfarming-65306",
  storageBucket: "myfarming-65306.firebasestorage.app",
  messagingSenderId: "458723023861",
  appId: "1:458723023861:web:43d1498d72b2f2ddca5ebc",
  measurementId: "G-ML1314NEG1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const auth = getAuth(app);
