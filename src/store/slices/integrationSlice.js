import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';
import { faL } from '@fortawesome/free-solid-svg-icons';


const initialDIntegrationData = {
    loading: false,
    mainLoading: false,
    connections: []
    
}

export const integrationSlice = createSlice({
    name: 'integration',
    initialState: initialDIntegrationData,
    reducers: {
        connectionListSuccess: (state, action) => {
            state.connections = action.payload;
            state.mainLoading = false
            state.loading = false
        },
        connectionListError: (state, action) => {
            state.loading = false;
            state.mainLoading = false
        },
        ConnectionCreatedSuccess: (state, action) =>{
            state.loading = false;
        },
        ConnectionDeletedSuccess:(state, action) => {
            state.loading = false;
            state.connections = state.connections.filter(item => item.id != action.payload)
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
        ConnectionEditSuccess:(state, action) => {
            state.loading = false;
            state.connections = state.connections.map(item => item.id === action.payload.id ? action.payload : item)
            state.mainLoading = false
        },
    
    }

})


export const {connectionListSuccess, connectionListError, ConnectionCreatedSuccess, ConnectionDeletedSuccess, stopLoader, startLoader, ConnectionEditSuccess} = integrationSlice.actions
export default integrationSlice.reducer



export function getAllConnectionList() {
    return async (dispatch) => {
        dispatch(startLoader())
        try {
            let result = await instance.get('connections/')
            dispatch(connectionListSuccess(result.data))
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(connectionListError())
            }
        }
    };
}


export function AddConnection(payload, callback) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`connections/`, { ...payload })
            dispatch(ConnectionCreatedSuccess(result))
            dispatch(getAllConnectionList())
            callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(connectionListError())
            }
        }
    };
}


export function deleteConnection(itemId,callback) {
    return async (dispatch) => {
        dispatch(startLoader())
        try {
            let result = await instance.delete(`connections/${itemId}`)
              toast.success("connection is deleted")
              dispatch(ConnectionDeletedSuccess(itemId))
              callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}


export function editConnection(payload, callback) {
    return async (dispatch) => {
        dispatch(startLoader())
        try {
            let result = await instance.put(`connections/${payload.id}`,{...payload})
            toast.success("Connection detail updated successfully")
              dispatch(ConnectionEditSuccess(result.data))
              callback()

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}