import { createSlice } from '@reduxjs/toolkit'

import { initialState } from './globalinitial';

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeed: (state, action) => {
        state.feed = action.payload;
    },
    setSoil: (state, action) => {
      const { value, timeUpdate } = action.payload; // Giá trị và thời gian mới được truyền vào
      state.feed = state.feed.map((item) => {
        if (item.key === 'Soil moisturize') {
          return {
            ...item,
            value,
            timeUpdate,
          };
        }
        return item; // Giữ nguyên các phần tử khác
      });
    },
    setTemp: (state, action) => {
      const { value, timeUpdate } = action.payload; // Giá trị và thời gian mới được truyền vào
      state.feed = state.feed.map((item) => {
        if (item.key === 'Temperature') {
          return {
            ...item,
            value,
            timeUpdate,
          };
        }
        return item; // Giữ nguyên các phần tử khác
      });
    },
    setHumid: (state, action) => {
      const { value, timeUpdate } = action.payload; // Giá trị và thời gian mới được truyền vào
      state.feed = state.feed.map((item) => {
        if (item.key === 'Humidity') {
          return {
            ...item,
            value,
            timeUpdate,
          };
        }
        return item; // Giữ nguyên các phần tử khác
      });
    },
  },
});
// Action creators are generated for each case reducer function
export const { setFeed, setSoil,setTemp, setHumid } = feedSlice.actions

export default feedSlice.reducer