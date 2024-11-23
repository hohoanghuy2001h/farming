import { createSlice } from '@reduxjs/toolkit'

import { initialState } from './globalinitial';

export const irrigationSlice = createSlice({
  name: 'irrigation',
  initialState,
  reducers: {
    setManualIrrgation: (state, action) => {
        state.irrigation.manual = action.payload;
    },
    setAutoIrrgation: (state, action) => {
        state.irrigation.auto = action.payload;
    }
  },

});
// Action creators are generated for each case reducer function
export const { setManualIrrgation, setAutoIrrgation } = irrigationSlice.actions

export default irrigationSlice.reducer