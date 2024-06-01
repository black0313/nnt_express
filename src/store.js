import { configureStore } from '@reduxjs/toolkit'
import { api } from 'src/middleware'
import loginReducer from 'src/reducer/loginReducer'
import TruckReducer from 'src/reducer/TruckReducer'
import DriverReducer from 'src/reducer/DriverReducer'
import trailerReducer from 'src/reducer/trailerReducer'

export default configureStore({
  reducer: { loginReducer, TruckReducer, DriverReducer, trailerReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
})
