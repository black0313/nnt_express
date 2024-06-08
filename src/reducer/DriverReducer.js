import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'driver',
  initialState: {
    driver: null,
    current: false,
  },
  reducers: {
    get: (state, action) => {
      state.driver = action.payload.object
      console.log(action.payload.object)
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('DRIVER ADDED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('DRIVER EDITED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('DRIVER DELETED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
  },
})

export const getDrivers = (data) =>
  apiCall({
    url: '/drivers',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const addDrivers = (data) =>
  apiCall({
    url: '/drivers',
    data,
    method: 'post',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editDriver = (data) =>
  apiCall({
    url: '/drivers/' + data,
    method: 'put',
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deleteDriver = (data) =>
  apiCall({
    url: '/drivers/' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
