import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from "./slices/authenticationSlice"
import dimensionsSlice from './slices/dimensionsSlice'
import adminDashboardSlice from './slices/adminDashboardSlice'
import propertySlice from './slices/propertySlice'

const combinedReducer = {
    authData: authenticationSlice,
    dimensionData: dimensionsSlice,
    adminDashboardData: adminDashboardSlice,
    propertyData: propertySlice,
}

export default configureStore({
    reducer: combinedReducer
})