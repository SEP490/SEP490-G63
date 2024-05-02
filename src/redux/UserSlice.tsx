import { PayloadAction, createSlice } from '@reduxjs/toolkit'
interface IUserState {
  role: Number
  token: String
}
const initialState: IUserState = {
  role: 1,
  token: ''
}

export const userSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<Number>) {
      state.role = action.payload
    },
    setToken(state, action: PayloadAction<String>) {
      state.token = action.payload
    }
  }
})

export const { setRole, setToken } = userSlice.actions

export default userSlice.reducer
