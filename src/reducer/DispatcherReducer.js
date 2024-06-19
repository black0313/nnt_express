import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'dispatchers',
  initialState: {
    dispatchers: null,
    dispatcher: null,
    current: false,
  },
  reducers: {
    get: (state, action) => {
      state.dispatchers = action.payload.object
    },
    getOne: (state, action) => {
      state.dispatcher = action.payload.object
      state.current = !state.current
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('DISPATCHER ADDED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('DISPATCHER EDITED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.error('DISPATCHER DELETED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
  },
})

export const getDispatchers = (data) =>
  apiCall({
    url: '/dispatchers',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const getDispatcher = (data) =>
  apiCall({
    url: '/dispatchers/' + data,
    method: 'get',
    onSuccess: slice.actions.getOne.type,
    onFail: slice.actions.getOne.type,
  })
export const addDispatcher = (data) =>
  apiCall({
    url: '/dispatchers',
    data,
    method: 'post',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editDispatcher = (data) =>
  apiCall({
    url: '/dispatchers/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deleteDispatcher = (data) =>
  apiCall({
    url: '/dispatchers/' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
