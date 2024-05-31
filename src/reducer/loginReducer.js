import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'

export const slice = createSlice({
  name: 'login',
  initialState: {
    login: null,
  },
  reducers: {
    get: (state, action) => {
      console.log(action.payload)
    },
  },
})

export const getLogin = (data) =>
  apiCall({
    url: '/users' + data,
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })

export default slice.reducer
