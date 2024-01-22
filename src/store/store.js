import { configureStore } from '@reduxjs/toolkit'
import {authenticationSlice} from "./slices/authenticationSlice"

const combinedReducer = {
  authData: authenticationSlice,
}

export default configureStore({
  reducer: combinedReducer
})