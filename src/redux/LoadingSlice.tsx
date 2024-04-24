import { PayloadAction, createSlice } from '@reduxjs/toolkit'
interface ILoadingState {
  isLoading: boolean
  isErrorPage: boolean
}
const initialState: ILoadingState = {
  isLoading: false,
  isErrorPage: false
}

export const loadingSlice = createSlice({
  name: 'LoadingSlice',
  initialState,
  reducers: {
    setStatusLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setStatusPage(state, action: PayloadAction<boolean>) {
      state.isErrorPage = action.payload
    }
  }
})

export const { setStatusLoading, setStatusPage } = loadingSlice.actions

export default loadingSlice.reducer
