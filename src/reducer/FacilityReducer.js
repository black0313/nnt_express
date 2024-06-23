import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'facilities',
  initialState: {
    facilities: null,
    facility: null,
    current: false,
  },
  reducers: {
    get: (state, action) => {
      state.facilities = action.payload.object
    },
    getOne: (state, action) => {
      state.facility = action.payload.object
      state.current = !state.current
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('FACILITY ADDED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('FACILITY EDITED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.error('FACILITY DELETED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
  },
})

export const getFacilities = (data) =>
  apiCall({
    url: '/facilities',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const getFacility = (data) =>
  apiCall({
    url: '/facilities/' + data,
    method: 'get',
    onSuccess: slice.actions.getOne.type,
    onFail: slice.actions.getOne.type,
  })
export const addFacility = (data) =>
  apiCall({
    url: '/facilities',
    data,
    method: 'post',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editFacility = (data) =>
  apiCall({
    url: '/facilities/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deleteFacility = (data) =>
  apiCall({
    url: '/facilities/' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
