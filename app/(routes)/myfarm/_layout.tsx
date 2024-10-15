import { Tabs } from 'expo-router';
import BottomTab from '@/components/shared/BottomTab/BottomTab';
export default function MyfarmLayout() {
  return (
    <Tabs screenOptions={{headerShown: false,}} tabBar={props => <BottomTab {...props}/>}>
      <Tabs.Screen name="info/index" options={{title: 'Information'}}/>
      <Tabs.Screen name="statis/index" options={{title: 'Statistical'}}/>
      <Tabs.Screen name='stages/index' options={{title: 'Stages'}} />
    </Tabs>
  );
}
