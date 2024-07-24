import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'roles',
  initialState: {
    roles: null,
    role: null,
    current: false,
    roleBoolean: false,
  },
  reducers: {
    get: (state, action) => {
      state.roles = action.payload.object
      state.roleBoolean = false
    },
    getOne: (state, action) => {
      state.role = action.payload.object
      state.current = !state.current
      state.roleBoolean = false
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('ROLE ADDED')
        state.roleBoolean = true
      } else {
        toast.error(action.payload.message)
        state.roleBoolean = false
      }
      state.current = !state.current
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('ROLE EDITED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.error('ROLE DELETED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
  },
})

export const getRoles = (data) =>
  apiCall({
    url: '/role',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const getRole = (data) =>
  apiCall({
    url: '/role/' + data,
    method: 'get',
    onSuccess: slice.actions.getOne.type,
    onFail: slice.actions.getOne.type,
  })
export const addRole = (data) =>
  apiCall({
    url: '/role',
    data,
    method: 'post',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editRole = (data) =>
  apiCall({
    url: '/role/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deleteRole = (data) =>
  apiCall({
    url: '/role/' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
