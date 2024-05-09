import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';
import { smallLoaderData, smallLoaderStop } from './dimensionsSlice';

const initialDimensionData = {
    loading: false,
    editBtnloading: false,
    propertiesList: [],
    propertyDetails:{}
}



export const propertySlice = createSlice({
    name: 'property',
    initialState: initialDimensionData,
    reducers: {
        propertiesLoading: (state, action) => {
            state.loading = true;
        },
        propertiesError: (state, action) => {
            state.loading = false;
        },
        propertiessDataSuccess: (state, action) => {
            state.loading = false;
            state.propertiesList = action.payload

        },
        propertiessCreateSuccess: (state, action) => {
            state.loading = false;
            state.propertiesList = action.payload

        }, 
        propertiessDetailsSuccess: (state, action) => {
            state.loading = false;
            state.propertyDetails = action.payload

        },     
        starteditBtnloading: (state, action) => {
            state.editBtnloading = true;
        },
        stopeditBtnloading: (state, action) => {
            state.editBtnloading = false;
        }
    }

})


export const {propertiesLoading, propertiessDataSuccess,propertiesError, propertiessCreateSuccess, propertiessDetailsSuccess, starteditBtnloading, stopeditBtnloading} = propertySlice.actions
export default propertySlice.reducer



export function getAllPropertyList(isLoading) {
    return async (dispatch) => {
        if (isLoading){
            dispatch(propertiesLoading())
        }
        try {
            let result = await instance.get('all_properties')
            dispatch(propertiessDataSuccess(result.data))
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(propertiesError())
            }
        }
    };
}

export function getPropertyDetails(property_name, callback) {
    return async (dispatch) => {
        dispatch(starteditBtnloading())

        try {
            let result = await instance.get(`get_property_details/${property_name}`)
            dispatch(propertiessDetailsSuccess(result.data))
            dispatch(stopeditBtnloading())
            callback(result.data)
        } catch (error) {
            console.log(error)
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(propertiesError())
            }
        }
    };
}


export function assignPropertyToDimension(payload, callback) {
    return async (dispatch) => {
        dispatch(propertiesLoading())
        try {
            let result = await instance.put(`assign_dimensions/${payload.property_name}`, payload)
            dispatch(propertiessDataSuccess(result.data))
            callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(propertiesError())
            }
        }
    };
}

export function createProperty(payload,callback) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            let result = await instance.post(`create_property`, { ...payload })
            dispatch(getAllPropertyList())
            toast.success(result.data.status)
            dispatch(smallLoaderStop())
            return callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(propertiesError())
            }
        }
    };
}