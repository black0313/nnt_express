import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'login',
  initialState: {
    login: null,
  },
  reducers: {
    get: (state, action) => {
      console.log(action.payload.success)
      if (action.payload.success) {
        localStorage.setItem('user', JSON.stringify(action.payload.object))
        window.href('/dashboard')
      } else {
        toast.error(action.payload.message)
      }
    },
  },
})

export const getLogin = (data) =>
  apiCall({
    url: '/users',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const addLogin = (data) =>
  apiCall({
    url: '/auth/authenticate',
    method: 'post',
    data,
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })

export default slice.reducer
