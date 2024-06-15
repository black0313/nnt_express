import { configureStore } from '@reduxjs/toolkit'
import { api } from 'src/middleware'
import loginReducer from 'src/reducer/loginReducer'
import TruckReducer from 'src/reducer/TruckReducer'
import DriverReducer from 'src/reducer/DriverReducer'
import TrailerReducer from 'src/reducer/TrailerReducer'

export default configureStore({
  reducer: { loginReducer, TruckReducer, DriverReducer, TrailerReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
})
