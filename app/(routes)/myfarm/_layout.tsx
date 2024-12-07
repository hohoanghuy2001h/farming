import { Tabs } from 'expo-router';
import BottomTab from '@/components/shared/BottomTab/BottomTab';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import NofieldScreen from '@/screen/nofield/nofield.screen';
export default function MyfarmLayout() {
  const item = useSelector((state: RootState) => state.field);

  return (
    item.fieldID !== '' ? 
    <Tabs screenOptions={{headerShown: false,}} tabBar={props => <BottomTab {...props}/>}>
      <Tabs.Screen name="info/index" options={{title: 'Information'}}/>
      <Tabs.Screen name="statis/index" options={{title: 'Statistical'}}/>
      <Tabs.Screen name='stages/index' options={{title: 'Stages'}} />
    </Tabs> 
    : <NofieldScreen />
  );
}
