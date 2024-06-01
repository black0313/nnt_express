import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'truck',
  initialState: {
    trucks: null,
  },
  reducers: {
    get: (state, action) => {
      console.log(action.payload)
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('TRUCK ADDED')
      } else {
        toast.error(action.payload.message)
      }
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('TRUCK EDITED')
      } else {
        toast.error(action.payload.message)
      }
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('TRUCK DELETED')
      } else {
        toast.error(action.payload.message)
      }
    },
  },
})

export const getTrucks = (data) =>
  apiCall({
    url: '/trucks',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const addTrucks = (data) =>
  apiCall({
    url: '/trucks',
    data,
    method: 'post',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editTrucks = (data) =>
  apiCall({
    url: '/trucks' + data,
    method: 'put',
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deleteTrucks = (data) =>
  apiCall({
    url: '/trucks' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
