import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { GUESS } from '~/common/const/role'
interface IUserState {
  role: number
  token: string
}
const initialState: IUserState = {
  role: GUESS,
  token: ''
}

export const userSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<number>) {
      state.role = action.payload
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    }
  }
})

export const { setRole, setToken } = userSlice.actions

export default userSlice.reducer
