import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from "./slices/authenticationSlice"
import dimensionsSlice from './slices/dimensionsSlice'
import adminDashboardSlice from './slices/adminDashboardSlice'
import propertySlice from './slices/propertySlice'
import userLogsSlice from './slices/userAuditLogsSlice'
import integrationSlice from './slices/integrationSlice'

const combinedReducer = {
    authData: authenticationSlice,
    dimensionData: dimensionsSlice,
    adminDashboardData: adminDashboardSlice,
    propertyData: propertySlice,
    userLogsData: userLogsSlice,
    integrationData: integrationSlice,
}

export default configureStore({
    reducer: combinedReducer
})