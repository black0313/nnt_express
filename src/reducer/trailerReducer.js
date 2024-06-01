import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'trailer',
  initialState: {
    trailer: null,
  },
  reducers: {
    get: (state, action) => {
      console.log(action.payload)
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('TRAILER ADDED')
      } else {
        toast.error(action.payload.message)
      }
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('TRAILER EDITED')
      } else {
        toast.error(action.payload.message)
      }
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('TRAILER DELETED')
      } else {
        toast.error(action.payload.message)
      }
    },
  },
})

export const getTrailer = (data) =>
  apiCall({
    url: '/trailer',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const addTrailer = (data) =>
  apiCall({
    url: '/trailer',
    data,
    method: 'post',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editTrailer = (data) =>
  apiCall({
    url: '/trailer' + data,
    method: 'put',
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deleteTrailer = (data) =>
  apiCall({
    url: '/trailer' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
