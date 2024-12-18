import { Stack } from 'expo-router';
import { ToastProvider } from "react-native-toast-notifications";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Header from '@/components/shared/Header/Header';
// Ignore the specific warning related to Reanimated value access during render
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});
import Icon from 'react-native-vector-icons/FontAwesome';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Text, TouchableOpacity, View } from 'react-native';
export default function RootLayout() {
  return (
    <GestureHandlerRootView>
    <Provider store={store}>
    <ToastProvider
      placement="top"
      dangerIcon={<Icon name="exclamation-triangle" size={24} color="red" />}
      successIcon={<Icon name="check-circle" size={24} color="green" />}
      offset={10}
      renderType={{
        custom_toast: (toast) => (
          <View
            style={{
              maxWidth: "85%",
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: "#fff",
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: "#00C851",
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {toast.data.title}
            </Text>
            <Text style={{ color: "#a3a3a3", marginTop: 2 }}>{toast.message}</Text>
          </View>
        ),
        with_close_button: (toast) => (
          <View
            style={{
              maxWidth: "85%",
              paddingVertical: 10,
              backgroundColor: "#fff",
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: "#00C851",
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingHorizontal: 16,
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "#a3a3a3", marginRight: 16 }}>{toast.message}</Text>
            <TouchableOpacity
              onPress={() => toast.onHide()}
              style={{
                marginLeft: "auto",
                width: 25,
                height: 25,
                borderRadius: 5,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "500", marginBottom: 2.5 }}>
                x
              </Text>
            </TouchableOpacity>
          </View>
        ),
        custom_danger_toasttoast: (toast) => (
          <View
            style={{
              maxWidth: "85%",
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: "#fff",
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: "#E13832",
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {toast.data.title}
            </Text>
            <Text style={{ color: "#a3a3a3", marginTop: 2 }}>{toast.message}</Text>
          </View>
        ),
      }}
    >        
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
            name="(routes)/controller"
            options={{
              headerShown: true,
              // title: "My Farm",
              // headerBackTitle: "Back",
              header: () => <Header title='Controller'/>
            }}
          />
          <Stack.Screen
            name="(routes)/diagnostic/index"
            options={{
              headerShown: true,
              // title: "My Farm",
              // headerBackTitle: "Back",
              header: () => <Header title='Diagnostic' backgroundColor='none' position='absolute'/>
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
          <Stack.Screen
            name="(routes)/notplanted"
            options={{
              headerShown: true,
              header: () => <Header title='My Farm'/>
            }}
          />
          <Stack.Screen
            name="(routes)/qrcode/index"
            options={{
              headerShown: true,
              header: () => <Header title='My Farm' backgroundColor='none' position='absolute'/>
            }}
          />
        </Stack>
      </ToastProvider>
      <Toast />
    </Provider>
    </GestureHandlerRootView>
  );
}
