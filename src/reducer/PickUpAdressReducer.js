import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'pickup',
  initialState: {
    pickups: null,
    pickup: null,
    current: false,
  },
  reducers: {
    get: (state, action) => {
      state.pickups = action.payload.object
    },
    getOne: (state, action) => {
      state.pickup = action.payload.object
      state.current = !state.current
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('PICK ADDED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('PICK EDITED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.error('PICK DELETED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
  },
})

export const getPicks = (data) =>
  apiCall({
    url: '/pickup-addresses',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const getPick = (data) =>
  apiCall({
    url: '/pickup-addresses/' + data,
    method: 'get',
    onSuccess: slice.actions.getOne.type,
    onFail: slice.actions.getOne.type,
  })
export const addPick = (data) =>
  apiCall({
    url: '/pickup-addresses',
    data,
    method: 'post',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editPick = (data) =>
  apiCall({
    url: '/pickup-addresses/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deletePick = (data) =>
  apiCall({
    url: '/pickup-addresses/' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
