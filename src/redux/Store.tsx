import { configureStore } from '@reduxjs/toolkit'
import LoadingSlice from './LoadingSlice'

export const store = configureStore({
  reducer: {
    LoadingSlice: LoadingSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
