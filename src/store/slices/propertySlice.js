import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';

const initialDimensionData = {
    loading: false,
    propertiesList: [
        {
            "name": 'Alias',
            "assignDimension": ["Mobile", "Laptop", "Desktop"]
        },
        {
            "name": 'Alias',
            "assignDimension": ["Mobile", "Laptop", "Desktop"]
        },
        {
            "name": 'Alias',
            "assignDimension": ["Mobile", "Laptop", "Desktop"]
        },
        {
            "name": 'Alias',
            "assignDimension": ["Mobile", "Laptop", "Desktop"]
        }
    ],
}



export const propertySlice = createSlice({
    name: 'property',
    initialState: initialDimensionData,
    reducers: {
        propertiesDataLoading: (state, action) => {
            state.loading = true;
        },
        propertiessDataSuccess: (state, action) => {
            state.loading = false;

        },       
    }

})


export const {propertiesDataLoading, propertiessDataSuccess, } = propertySlice.actions
export default propertySlice.reducer
