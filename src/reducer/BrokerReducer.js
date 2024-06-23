import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'brokers',
  initialState: {
    brokers: null,
    broker: null,
    current: false,
  },
  reducers: {
    get: (state, action) => {
      state.brokers = action.payload.object
    },
    getOne: (state, action) => {
      state.broker = action.payload.object
      state.current = !state.current
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('BROKER ADDED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('BROKER EDITED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.error('BROKER DELETED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
  },
})

export const getBrokers = (data) =>
  apiCall({
    url: '/brokers',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const getBroker = (data) =>
  apiCall({
    url: '/brokers/' + data,
    method: 'get',
    onSuccess: slice.actions.getOne.type,
    onFail: slice.actions.getOne.type,
  })
export const addBroker = (data) =>
  apiCall({
    url: '/brokers',
    data,
    method: 'post',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editBroker = (data) =>
  apiCall({
    url: '/brokers/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deleteBroker = (data) =>
  apiCall({
    url: '/brokers/' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
