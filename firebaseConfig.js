
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBaZgVDNG2DPbOQw2pXmpMAMVCtLj9Vhh0",
  authDomain: "farmingapp-d1407.firebaseapp.com",
  projectId: "farmingapp-d1407",
  storageBucket: "farmingapp-d1407.firebasestorage.app",
  messagingSenderId: "133154069330",
  appId: "1:133154069330:web:d568893dfd59176be7f88b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
