import { StyleSheet, Text, View, FlatList, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import StepIndicator from 'react-native-step-indicator';
import stageDefault from '@/constants/stage.template';
import HeaderMyFarm from '@/components/shared/HeaderMyFarm/HeaderMyFarm';
import { windowHeight, windowWidth } from '@/utils/Dimensions';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import stageImages from '@/assets/images/stages';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalQuestion from '@/components/shared/Modal/ModalQuestion';
const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#54805A',
  separatorFinishedColor: '#54805A',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#54805A',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#54805A',
};

const StagesScreen = () => {
  const item = useSelector((state: RootState) => state.field);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getStageProgress = () => {
    stageDefault.forEach((stage, index) => {
      if(stage === item.plantStage) setCurrentPage(index)
    })
  }
  useEffect(() => {
    getStageProgress();
  }, [item,currentPage])


  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <HeaderMyFarm />
        <View style ={{flexDirection: 'row'}}>
          <ScrollView 
            contentContainerStyle = {styles.left}
            showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
            showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang nếu có
          >
            <View style={styles.stepIndicator}>
                <StepIndicator
                  customStyles={stepIndicatorStyles}
                  stepCount={stageDefault.length}
                  direction="vertical"
                  currentPosition={currentPage}
                  labels={stageDefault.map((item) => item.stage)}
                  renderLabel={({ position, stepStatus, label }) => {
                    const stage = stageDefault[position];
                    return (
                      (
                        <View style={styles.progressText}>
                          <Text
                            style={[
                              styles.progresslabel,
                              stepStatus === 'current' && styles.progresscurrentLabel, // Áp dụng style tùy chỉnh cho bước hiện tại
                            ]}
                          >
                            {label}
                          </Text>
                          <Text style={styles.progressDay}>{stage.days} days</Text>
                        </View>
                      )
                    )
                  }
                  }
                /> 
            </View >
          </ScrollView>
          <Image source={stageImages[currentPage]} style={styles.right} />
        </View>
      </View>
    </View>
  );
}

export default StagesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  wrapper: {
    width: windowWidth - 40,
  },
  stepIndicator: {
    height: windowHeight,
  },
  rowItem: {
    flex: 3,
    paddingVertical: 20,
  },
  left: {
    width: '50%',
    paddingBottom: 200,
  },
  right: {
    alignSelf: 'flex-end',
    marginBottom: 200,
    maxWidth: '50%',
    aspectRatio: 3/4,
  },
  progressText: {
    alignItems: 'flex-start', 
    width: 120,
    marginHorizontal: 10,
  },
  progresslabel: {},
  progresscurrentLabel: {
    color: '#54805A',
    fontWeight: 'bold',
  },
  progressDay: {
    fontSize: 12,
    color: '#b5b5b5',
  },
  modalWrapper: {
    backgroundColor: 'pink',
  }
})