import { createSlice } from '@reduxjs/toolkit'

import { initialState } from './globalinitial';

export const controllerSlice = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    setManualIrrgation: (state, action) => {
        state.controller.pump.manual = action.payload;
    },
    setAutoIrrgation: (state, action) => {
        state.controller.pump.auto = action.payload;
    },
    setRightFan:  (state, action) => {
      state.controller.fan.right = action.payload;
    },
    setLeftFan:  (state, action) => {
      state.controller.fan.left = action.payload;
    },
  },
 
});
// Action creators are generated for each case reducer function
export const { setManualIrrgation, setAutoIrrgation, setRightFan, setLeftFan} = controllerSlice.actions

export default controllerSlice.reducer