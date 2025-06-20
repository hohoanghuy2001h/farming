export interface stateType {
  userID: string,
  fieldID: string,
  plantDate: number,
  health: string, 
  plantStage: stagePlant,
  feed: feedType[],
  controller: {
    pump: {
      auto: boolean,
      manual: boolean,
    },
    fan: {
      right: boolean,
      left: boolean,
    }
  },
}

export const initialState: stateType = {
  fieldID: '',
  userID: '',
  plantDate: 0,
  health: 'Good Health',
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
    minSoil: -1,
    maxSoil: -1,
    stage: '',
  },
  feed: [
    {
      key: 'Temperature',
      value: 0,
      unit: '°C',
      warning: 0,
      timeUpdate: '',
      icon: 'temperature-half',
    },
    {
      key: 'Humidity',
      value: 0,
      unit: '%',
      warning: 0,
      timeUpdate:'',
      icon: 'water',
    },
    {
      key: 'Light intensity',
      value: 0,
      unit: 'lux',
      warning: 0,
      timeUpdate: '',
      icon: 'sun',
    },
    {
      key: 'Soil moisturize',
      value: 0,
      unit: '%',
      warning: 0,
      timeUpdate: '',
      icon: 'seedling',
    },
  ],
  controller: {
    pump: {
      auto: true,
      manual: false,
    },
    fan: {
      right: false,
      left: false,
    }
  }
}

