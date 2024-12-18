import { CameraCapturedPicture } from "expo-camera";
import axios from "axios";
import * as FileSystem from 'expo-file-system'; // To handle file URIs
import * as ImageManipulator from 'expo-image-manipulator';
import { useEffect, useState } from "react";

const compressImage = async (uri: string) => {
    try {
        const resizedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 800 } }], // Resize to 800px width, maintain aspect ratio
            { compress: 0.7, format: ImageManipulator.SaveFormat.PNG } // Compress to 70% quality
        );
        return resizedImage.uri;
    } catch (error) {
        console.error('Error in manipulating image:', error);  // Bắt lỗi nếu có
    }
}
const uploadImage = async (
    img: string,
    setData: React.Dispatch<React.SetStateAction<any>>,
    setVisibleModal: React.Dispatch<React.SetStateAction<any>>
): Promise<void> => {
    try {
        // Lấy URI và nén ảnh
        const fileUri = img;
        const compressUri = await compressImage(fileUri);

        // Chuyển ảnh sang Base64
        const base64 = await FileSystem.readAsStringAsync(compressUri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // Gửi request API
        const response = await axios.post(
            "https://detect.roboflow.com/chili-disease-afgra/8",
            base64,
            {
                params: {
                    api_key: "IRGWq8PjN2AzOjQfptpV",
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        // Lưu dữ liệu dự đoán
        setData(response.data["predictions"]);
        console.log(response.data["predictions"]);
    } catch (error) {
        console.error("Error uploading image:", error);
    } finally {
        setVisibleModal(true);
    }
};

export default uploadImage;