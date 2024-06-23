import { configureStore } from '@reduxjs/toolkit'
import { api } from 'src/middleware'
import loginReducer from 'src/reducer/loginReducer'
import TruckReducer from 'src/reducer/TruckReducer'
import DriverReducer from 'src/reducer/DriverReducer'
import TrailerReducer from 'src/reducer/TrailerReducer'
import DispatcherReducer from 'src/reducer/DispatcherReducer'
import UserReducer from 'src/reducer/UserReducer'
import BrokerReducer from 'src/reducer/BrokerReducer'

export default configureStore({
  reducer: {
    loginReducer,
    TruckReducer,
    DriverReducer,
    TrailerReducer,
    DispatcherReducer,
    UserReducer,
    BrokerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
})
