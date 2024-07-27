import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'file',
  initialState: {
    file: null,
    current: false,
    fileId: null,
  },
  reducers: {
    get: (state, action) => {
      state.file = action.payload.object
      console.log(action.payload.object)
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('FILE ADDED')
        state.fileId = action.payload.object.id
      } else {
        toast.error('SERVER ERROR')
        state.fileId = null
      }
      state.current = !state.current
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('FILE EDITED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.error('FILE DELETED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
  },
})

export const getFile = (data) =>
  apiCall({
    url: '/attachment/info',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const addFile = (data) =>
  apiCall({
    url: '/attachment/upload',
    method: 'post',
    data,
    contentType: 'multipart/form-data',
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
export const deleteFile = (data) =>
  apiCall({
    url: '/attachment/' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
