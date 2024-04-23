import { configureStore } from '@reduxjs/toolkit'
import LoadingSlice from './LoadingSlice'

export const store = configureStore({
  reducer: {
    LoadingSlice: LoadingSlice
  }
})
