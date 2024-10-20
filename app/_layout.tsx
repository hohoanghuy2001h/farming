import { Stack } from 'expo-router';
import { ToastProvider } from "react-native-toast-notifications";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Header from '@/components/shared/Header/Header';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
export default function RootLayout() {
  return (
    <GestureHandlerRootView>
    <Provider store={store}>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/welcome-intro/index" />
          <Stack.Screen name="(routes)/login/index" />
          <Stack.Screen name="(routes)/home/index" />
          <Stack.Screen
            name="(routes)/myfarm"
            options={{
              headerShown: true,
              // title: "My Farm",
              // headerBackTitle: "Back",
              header: () => <Header title='My Farm' right/>
            }}
          />
          <Stack.Screen
            name="(routes)/irrigation"
            options={{
              headerShown: true,
              // title: "My Farm",
              // headerBackTitle: "Back",
              header: () => <Header title='Irrigation'/>
            }}
          />
          <Stack.Screen
            name="(routes)/diagnostic/index"
            options={{
              headerShown: true,
              // title: "My Farm",
              // headerBackTitle: "Back",
              header: () => <Header title='Diagnostic'/>
            }}
          />
          <Stack.Screen
            name="(routes)/cultivation"
            options={{
              headerShown: true,
              // title: "My Farm",
              // headerBackTitle: "Back",
              header: () => <Header title='Cultivation Tips'/>
            }}
          />
          <Stack.Screen
            name="(routes)/disease"
            options={{
              headerShown: true,
              header: () => <Header title='Diseases & Medicare'/>
            }}
          />
          <Stack.Screen
            name="(routes)/news"
            options={{
              headerShown: true,
              header: () => <Header title='News'/>
            }}
          />
          <Stack.Screen
            name="(routes)/aboutus/index"
            options={{
              headerShown: true,
              header: () => <Header title='About Us'/>
            }}
          />
          <Stack.Screen
            name="(routes)/notices"
            options={{
              headerShown: true,
              header: () => <Header title='Notices'/>
            }}
          />
        </Stack>
      </ToastProvider>
    </Provider>
    </GestureHandlerRootView>
  );
}
