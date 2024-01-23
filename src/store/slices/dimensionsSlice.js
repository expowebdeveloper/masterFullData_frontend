import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';

const initialDimensionData = {
    loading: false,
    dimensionsList:[]
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
        dimensionDataError: (state, action) => {
            state.loading = false;
        },

    }

})

export const {dimensionDataLoading,dimensionsDataSuccess,dimensionDataError}= dimensionsSlice.actions
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
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        } 
    };
}
