import { createSlice } from '@reduxjs/toolkit'
import { apiCall } from '../api'
import { toast } from 'react-toastify'

export const slice = createSlice({
  name: 'dispatchTeam',
  initialState: {
    teams: null,
    team: null,
    current: false,
    roleBoolean: false,
  },
  reducers: {
    get: (state, action) => {
      state.teams = action.payload.object
      state.roleBoolean = false
    },
    getOne: (state, action) => {
      state.team = action.payload.object
      state.current = !state.current
      state.roleBoolean = false
    },
    saveFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('TEAM ADDED')
        state.roleBoolean = true
      } else {
        toast.error(action.payload.message)
        state.roleBoolean = false
      }
      state.current = !state.current
    },
    editFrom: (state, action) => {
      if (action.payload.success) {
        toast.success('TEAM EDITED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
    deleteFrom: (state, action) => {
      if (action.payload.success) {
        toast.error('TEAM DELETED')
      } else {
        toast.error(action.payload.message)
      }
      state.current = !state.current
    },
  },
})

export const getDispatchTeams = (data) =>
  apiCall({
    url: '/dispatchers-team',
    method: 'get',
    onSuccess: slice.actions.get.type,
    onFail: slice.actions.get.type,
  })
export const getDispatchTeam = (data) =>
  apiCall({
    url: '/dispatchers-team/' + data,
    method: 'get',
    onSuccess: slice.actions.getOne.type,
    onFail: slice.actions.getOne.type,
  })
export const addDispatchTeam = (data) =>
  apiCall({
    // url: '/dispatchers-team',
    url: `/dispatchers-team?name=${data.name}`,
    data,
    method: 'post',
    onSuccess: slice.actions.saveFrom.type,
    onFail: slice.actions.saveFrom.type,
  })
export const editDispatchTeam = (data) =>
  apiCall({
    // url: '/dispatchers-team/' + data.id,
    url: `/dispatchers-team/${data.id}?name=${data.name}&groupId=${data?.groupId}`,
    method: 'put',
    data,
    onSuccess: slice.actions.editFrom.type,
    onFail: slice.actions.editFrom.type,
  })
export const deleteDispatchTeam = (data) =>
  apiCall({
    url: '/dispatchers-team/' + data,
    method: 'delete',
    onSuccess: slice.actions.deleteFrom.type,
    onFail: slice.actions.deleteFrom.type,
  })

export default slice.reducer
