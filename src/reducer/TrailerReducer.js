import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'trailers',
  initialState: {
    trailers: null,
    current: false,
    trailer: null,
  },
  reducers: {
    get: (state, action) => {
      state.trailers = action.payload.object
    },
    getOne: (state, action) => {
      state.trailer = action.payload.object
      state.current = !state.current
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('TRAILER ADDED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('TRAILER EDITED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.error('TRAILER DELETED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
  },
})

export const getTrailer = (data) =>
  apiCall({
    url: '/trailers',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const getTrailerOne = (data) =>
  apiCall({
    url: '/trailers/' + data,
    method: 'get',
    onSuccess: slice.actions.getOne.type,
    onFail: slice.actions.getOne.type,
  })
export const addTrailer = (data) =>
  apiCall({
    url: '/trailers',
    method: 'post',
    data,
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editTrailer = (data) =>
  apiCall({
    url: '/trailers/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deleteTrailer = (data) =>
  apiCall({
    url: '/trailers/' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
