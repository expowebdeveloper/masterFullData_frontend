import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';
import { faL } from '@fortawesome/free-solid-svg-icons';


const initialDIntegrationData = {
    loading: false,
    mainLoading: false,
    exportConnections: [],
    errorMessage: null,
    backroundTask: ''    
}

export const exportConnectionSlice = createSlice({
    name: 'exportIntegration',
    initialState: initialDIntegrationData,
    reducers: {
        exportConnectionListSuccess: (state, action) => {
            state.exportConnections = action.payload;
            state.mainLoading = false
            state.loading = false
        },
        exportConnectionListError: (state, action) => {
            state.loading = false;
            state.mainLoading = false
        },
        startLoader: (state, action) =>{
            state.loading = true
            state.mainLoading = true
        },
        stopLoader: (state, action) =>{
            state.loading = false
            state.mainLoading = false
        },
        exportConnectionCreatedSuccess: (state, action) =>{
            state.loading = false;
        },
        errorMessage: (state, message) =>{
            state.errorMessage =  message;
            state.loading = false
            state.mainLoading = false
        },
        exportbackroundTask: (state, message) =>{
            state.backroundTask =  message;
            state.loading = false
            state.mainLoading = false
        },
    
    }

})


export const {exportConnectionListSuccess, exportConnectionCreatedSuccess, stopLoader, startLoader, errorMessage, exportbackroundTask } = exportConnectionSlice.actions
export default exportConnectionSlice.reducer



export function getAllExportList(connection_id) {
    return async (dispatch) => {
        try {
            dispatch(startLoader())
            let result = await instance.get(`getexportlist/${connection_id}`)
            dispatch(exportConnectionListSuccess(result.data))
        } catch (error) {
            const message = error.message || "Something went wrong";
            dispatch(errorMessage(message))
            dispatch(stopLoader())
            if (error.response.status == 400) {
                dispatch(exportConnectionListError())
            }
        }
    };
}


export function AddExportConnection(payload, callback) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            dispatch(startLoader())
            let result = await instance.post(`export_connection/5`, { ...payload })
            dispatch(exportConnectionCreatedSuccess(result.data))
            dispatch(getAllExportList(payload.connection_id))
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log("message", message)
            dispatch(stopLoader())
            dispatch(errorMessage(message))
            if (error.response.status == 400) {
                dispatch(exportConnectionListError())
            }
        }
    };
}




export function RunExportConnection(export_item, callback) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            dispatch(startLoader())
            let result = await instance.post(`run_export/${export_item._id}`)
            dispatch(exportConnectionCreatedSuccess(result))
            dispatch(getAllExportList(export_item.connection_id))
            if (result?.payload?.status == "completed"){
                dispatch(exportbackroundTask("Job is completed"))
            }else{
                dispatch(exportbackroundTask("Task is already running Please wait"))
            }
            
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log("message", message)
            dispatch(stopLoader())
            dispatch(errorMessage(message))
            if (error.response.status == 400) {
                dispatch(exportConnectionListError())
            }
        }
    };
}
