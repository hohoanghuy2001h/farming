import { createSlice } from '@reduxjs/toolkit'

import { initialState } from './globalinitial';

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed: (state, action) => {
        state.feed = action.payload;
    }

  },

});
// Action creators are generated for each case reducer function
export const { setFeed } = feedSlice.actions

export default feedSlice.reducer