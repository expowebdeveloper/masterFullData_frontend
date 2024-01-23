import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from "./slices/authenticationSlice"
import dimensionsSlice from './slices/dimensionsSlice'

const combinedReducer = {
    authData: authenticationSlice,
    dimensionData: dimensionsSlice
}

export default configureStore({
    reducer: combinedReducer
})