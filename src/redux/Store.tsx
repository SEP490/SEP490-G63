import { configureStore } from '@reduxjs/toolkit'
import LoadingSlice from './LoadingSlice'
import UserSlice from './UserSlice'

export const store = configureStore({
  reducer: {
    LoadingSlice: LoadingSlice,
    UserSlice: UserSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
