import { useFieldDetail } from '@/hooks/field';
import NofieldScreen from '@/screen/nofield/nofield.screen';
import { RootState } from '@/store/store';
import { Stack } from 'expo-router';
import { ToastProvider } from "react-native-toast-notifications";
import { useSelector } from 'react-redux';
export default function RootLayout() {
  const item = useSelector((state: RootState) => state.field);
  const {data}= useFieldDetail(item.fieldID); //Tìm kiếm thông tin của field dựa trên fieldID
  return (
    item.fieldID !== ''  && data ?
    <ToastProvider>
        <Stack >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
    </ToastProvider>
    : <NofieldScreen />
  );
}
