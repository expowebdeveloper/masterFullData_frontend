import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';

const initialDimensionData = {
    loading: false,
    dimensionsList:[],
    hierarchyList:[]
}

export const dimensionsSlice = createSlice({
    name: 'dimension',
    initialState: initialDimensionData,
    reducers: {
        dimensionDataLoading: (state, action) => {
            state.loading = true;
            
        },
        dimensionsDataSuccess: (state, action) => {
            state.loading = false;

        },
        dimensionsDataListSuccess: (state, action) => {
            state.loading = false;
            state.dimensionsList=action.payload 
        },
        dimensionDataError: (state, action) => {
            state.loading = false;
        },
        dimensionHierarchy:(state,action)=>{
            state.loading=false,
            state.hierarchyList=action.payload
        }

    }

})

export const {dimensionDataLoading,dimensionsDataSuccess,dimensionDataError,dimensionHierarchy,dimensionsDataListSuccess}= dimensionsSlice.actions
export default dimensionsSlice.reducer


export function createDimensions(payload, callback) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post('create_dimension', { ...payload })
             dispatch(dimensionsDataSuccess())
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        } 
    };
}

export function getAllDimensionsList(payload, callback) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.get('list_dimensions', { ...payload })
              console.log(result,"lll")
              dispatch(dimensionsDataListSuccess(result.data))
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        } 
    };
}


export function getHierarchy(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.get(`get_hierarchy?name=${payload}`)
              console.log(result,"lll")
              dispatch(dimensionHierarchy(result.data.hierarchy))
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        } 
    };
}

export function addNode(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`add_node`,{...payload})
              console.log(result,"lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        } 
    };
}

export function deleteNode(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`delete_node`,{...payload})
              console.log(result,"lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        } 
    };
}

export function moveNode(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`move_node`,{...payload})
              console.log(result,"lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        } 
    };
}

export function renameNode(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`rename_node`,{...payload})
              console.log(result,"lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        } 
    };
}