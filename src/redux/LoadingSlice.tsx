import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  isErrorPage: false
}

export const loadingSlice = createSlice({
  name: 'LoadingSlice',
  initialState,
  reducers: {
    setStatusLoading(state, action) {
      state.isLoading = action.payload
    },
    setStatusPage(state, action) {
      state.isErrorPage = action.payload
    }
  }
})

export const { setStatusLoading, setStatusPage } = loadingSlice.actions

export default loadingSlice.reducer
