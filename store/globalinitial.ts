export interface stateType {
  userID: string,
  fieldID: string,
  plantDate: number,
  health: string, 
  plantStage: stagePlant,
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
}

