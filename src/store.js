import { configureStore } from '@reduxjs/toolkit'
import { api } from 'src/middleware'
import loginReducer from 'src/reducer/loginReducer'

export default configureStore({
  reducer: { loginReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
})
