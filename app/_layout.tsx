import { Stack } from 'expo-router';
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
  return (
    <ToastProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/welcome-intro/index" />
          <Stack.Screen name="(routes)/login/index" />
          <Stack.Screen name="(routes)/home/index" />

          {/* <Stack.Screen
            name="(routes)/course-details/index"
            options={{
              headerShown: true,
              title: "Course Details",
              headerBackTitle: "Back",
            }}
          /> */}
        </Stack>
    </ToastProvider>
  );
}
