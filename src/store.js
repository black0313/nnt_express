import { configureStore } from '@reduxjs/toolkit'
import { api } from 'src/middleware'
import loginReducer from 'src/reducer/loginReducer'
import TruckReducer from 'src/reducer/TruckReducer'
import DriverReducer from 'src/reducer/DriverReducer'
import TrailerReducer from 'src/reducer/TrailerReducer'
import DispatcherReducer from 'src/reducer/DispatcherReducer'
import UserReducer from 'src/reducer/UserReducer'
import BrokerReducer from 'src/reducer/BrokerReducer'
import FacilityReducer from 'src/reducer/FacilityReducer'
import PickUpAdressReducer from 'src/reducer/PickUpAdressReducer'
import LoadReducer from 'src/reducer/LoadReducer'
import RoleReducer from 'src/reducer/RoleReducer'
import AttachmentReducer from 'src/reducer/AttachmentReducer'

export default configureStore({
  reducer: {
    loginReducer,
    TruckReducer,
    DriverReducer,
    TrailerReducer,
    DispatcherReducer,
    UserReducer,
    BrokerReducer,
    FacilityReducer,
    PickUpAdressReducer,
    LoadReducer,
    RoleReducer,
    AttachmentReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
})
