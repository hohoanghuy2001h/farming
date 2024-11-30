import { Stack } from 'expo-router';
import { ToastProvider } from "react-native-toast-notifications";
export default function RootLayout() {
  return (
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
  );
}
