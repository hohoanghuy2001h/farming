import { router, Tabs } from 'expo-router';
import BottomTab from '@/components/shared/BottomTab/BottomTab';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import NofieldScreen from '@/screen/nofield/nofield.screen';
import { useFieldDetail } from '@/hooks/field';
import { useEffect } from 'react';
export default function MyfarmLayout() {
  const item = useSelector((state: RootState) => state.field);
  const {data}= useFieldDetail(item.fieldID); //Tìm kiếm thông tin của field dựa trên fieldID
  // useEffect(() => {
  //   if (data) {
  //     if (!data.isPlanted) {
  //       // Set timeout để delay 10 giây
  //       const timer = setTimeout(() => {
  //         router.replace({
  //           pathname: "/(routes)/home",
  //           params: {},
  //         });
  //       }, 10000); // 10000ms = 10 giây

  //       // Cleanup để hủy setTimeout nếu component bị unmount
  //       return () => clearTimeout(timer);
  //     }
  //   }
  // }, [data]);
  useEffect(() => {
    if(data) {
      if(!data.isPlanted) 
        router.replace({
          pathname: "/(routes)/notplanted",
          params: {  },
        })
    }
  }, [data])
  return (
    item.fieldID !== ''  && data ?
    <Tabs screenOptions={{headerShown: false,}} tabBar={props => <BottomTab {...props}/>}>
      <Tabs.Screen name="info/index" options={{title: 'Information'}}/>
      <Tabs.Screen name="statis/index" options={{title: 'Statistical'}}/>
      <Tabs.Screen name='stages/index' options={{title: 'Stages'}} />
    </Tabs> 
    : <NofieldScreen />
  );
}
