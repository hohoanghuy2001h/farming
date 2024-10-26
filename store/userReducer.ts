import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './globalinitial';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) =>  {
      state = initialState
    },
  },
})

// Action creators are generated for each case reducer function
export const { logOut } = userSlice.actions

export default userSlice.reducer