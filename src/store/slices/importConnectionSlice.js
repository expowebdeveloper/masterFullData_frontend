import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';
import { faL } from '@fortawesome/free-solid-svg-icons';


const initialDIntegrationData = {
    loading: false,
    mainLoading: false,
    importConnections: [],
    errorMessage: null,
    backroundTask:"",
    
}

export const importConnectionSlice = createSlice({
    name: 'importIntegration',
    initialState: initialDIntegrationData,
    reducers: {
        importConnectionListSuccess: (state, action) => {
            state.importConnections = action.payload;
            state.mainLoading = false
            state.loading = false
        },
        importConnectionListError: (state, action) => {
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
        importConnectionCreatedSuccess: (state, action) =>{
            state.loading = false;
        },
        importConnectionError: (state, message) =>{
            state.errorMessage =  message;
            state.loading = false
            state.mainLoading = false
        },
        importbackroundTask: (state, message) =>{
            state.backroundTask =  message;
            state.loading = false
            state.mainLoading = false
        },
      
    
    }

})


export const {importConnectionListSuccess, importConnectionCreatedSuccess, stopLoader, startLoader,importConnectionError, importbackroundTask } = importConnectionSlice.actions
export default importConnectionSlice.reducer



export function getAllImportList(connection_id) {
    return async (dispatch) => {
        try {
            dispatch(startLoader())
            let result = await instance.get(`get-import-list/${connection_id}`)
            dispatch(importConnectionListSuccess(result.data))
        } catch (error) {
            const message = error.message || "Something went wrong";
            dispatch(stopLoader())
            if (error.response.status == 400) {
                dispatch(importConnectionListError())
            }
        }
    };
}


export function AddImportConnection(payload, callback) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            dispatch(startLoader())
            let result = await instance.post(`import-upload-file/`, { ...payload })
            dispatch(importConnectionCreatedSuccess(result.data))
            dispatch(getAllimportList(payload.connection_id))
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log("message", message)
            dispatch(stopLoader())
            dispatch(importConnectionError(message))
            if (error.response.status == 400) {
                dispatch(importConnectionListError())
            }
        }
    };
}




export function RunimportConnection(import_item, callback) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            dispatch(startLoader())
            let result = await instance.post(`import-run/${import_item._id}`)
            dispatch(importConnectionCreatedSuccess(result))
            if (result?.payload?.status == "completed"){
                dispatch(importbackroundTask("Job is completed"))
            }else{
                dispatch(importbackroundTask("Task is already running Please wait"))
            }  
            dispatch(getAllimportList(import_item.connection_id))
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log("message", message)
            dispatch(stopLoader())
            if (error.response.status == 400) {
                dispatch(importConnectionListError())
            }
        }
    };
}
