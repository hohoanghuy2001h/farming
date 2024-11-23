export interface stateType {
  userID: string,
  fieldID: string,
  plantDate: number,
  health: string, 
  plantStage: stagePlant,
  feed: feedType[],
  irrigation: {
    auto: boolean,
    manual: boolean,
  },
}

export const initialState: stateType = {
  fieldID: '',
  userID: '',
  plantDate: 0,
  health: '',
  plantStage: {
    id: -1,
    maxHumidity:-1,
    days: -1,
    description:'',
    maxLight: -1,
    maxTemperature: -1,
    minHumidity: -1,
    minLight: -1,
    minTemperature: -1,
    stage: '',
  },
  feed: [
    {
      label: 'Temperature',
      value: 0,
      unit: '°C',
      warning: 0,
      timeUpdate: '',
      icon: 'temperature-half',
      key: '',
    },
    {
      label: 'Humidity',
      value: 0,
      unit: '%',
      warning: 0,
      timeUpdate:'',
      icon: 'water',
      key: '',
    },
    {
      label: 'Light intensity',
      value: 0,
      unit: 'lux',
      warning: 0,
      timeUpdate: '',
      icon: 'sun',
      key: ''
    },
    {
      label: 'Soil moisturize',
      value: 0,
      unit: '%',
      warning: 0,
      timeUpdate: '',
      icon: 'seedling',
      key: '',
    },
  ],
  irrigation: {
    auto: true,
    manual: false,
  }
}

