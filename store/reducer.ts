import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface stateType {
  fieldID: string,
}

export const initialState: stateType = {
  fieldID: '',
}

