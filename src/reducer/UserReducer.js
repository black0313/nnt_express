import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'users',
  initialState: {
    users: null,
    user: null,
    dispatchers: null,
    current: false,
  },
  reducers: {
    get: (state, action) => {
      state.users = action.payload.object
    },
    getOne: (state, action) => {
      state.user = action.payload.object
      state.current = !state.current
    },
    getDispatchers: (state, action) => {
      state.dispatchers = action.payload.object
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('USER ADDED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('USER EDITED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.error('USER DELETED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
  },
})

export const getUsers = (data) =>
  apiCall({
    url: '/user',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const getUserDispatchers = (data) =>
  apiCall({
    url: '/users/dispatchers',
    method: 'get',
    onSuccess: slice.actions.getDispatchers.type,
    onFail: slice.actions.getDispatchers.type,
  })
export const getUser = (data) =>
  apiCall({
    url: '/user/' + data,
    method: 'get',
    onSuccess: slice.actions.getOne.type,
    onFail: slice.actions.getOne.type,
  })
export const addUser = (data) =>
  apiCall({
    url: '/user',
    data,
    method: 'post',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editUser = (data) =>
  apiCall({
    url: '/user/' + data.id,
    method: 'put',
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deleteUser = (data) =>
  apiCall({
    url: '/user/' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
