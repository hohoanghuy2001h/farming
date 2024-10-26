import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialState } from './globalinitial';
import { useFieldDetail } from '@/hooks/field';
// Cấu trúc đúng cho createAsyncThunk
export const getFieldDetail = createAsyncThunk(
  'getFieldDetail', // Đây là typePrefix, một chuỗi để xác định loại action này
  async (_id: string) => { // Đây là payloadCreator, một hàm async trả về dữ liệu
    const {data} = await useFieldDetail(_id);
    return data;
  }
);
export const fieldSlice = createSlice({
  name: 'field',
  initialState,
  reducers: {
    getCurrentField: (state, action) => {
        state.fieldID = action.payload;
    },
    getCurrentStage: (state, action) => {
        state.plantDate = action.payload.day;
        state.plantStage = action.payload.stagePlant;
    },
    incrementByAmount: (state, action: PayloadAction<fieldType>) => {

    },
  },
  extraReducers(builder) {
    builder.addCase(getFieldDetail.fulfilled, (state, action) => {
        state.fieldID = action.payload?._id ? action.payload?._id : '-1';
    })
  },
});
// Action creators are generated for each case reducer function
export const { getCurrentField, getCurrentStage } = fieldSlice.actions

export default fieldSlice.reducer