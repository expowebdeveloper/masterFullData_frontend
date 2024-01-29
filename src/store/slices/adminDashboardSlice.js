import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';

const initialAuthData = {
    loading: false,
    allUser: [],
    activeUser: 0,
    inActiveUser: 0,
    totalUser: 0
}

export const adminDashboardSlice = createSlice({
    name: 'admin',
    initialState: initialAuthData,
    reducers: {
        authDataLoading: (state, action) => {
            state.loading = true;
        },
        authDataSuccess: (state, action) => {
            state.loading = false;
        },
        authDataError: (state, action) => {
            state.loading = false;
        },
        saveUserDetail: (state, action) => {
            console.log(action, 'action000000000000000')
            state.allUser = action.payload.users;
            state.activeUser = action.payload.total_active
            state.inActiveUser = action.payload.total_inactive
            state.totalUser = action.payload.total_user
        },

    }

})

export const {authDataLoading,authDataSuccess,authDataError, saveUserDetail}= adminDashboardSlice.actions
export default adminDashboardSlice.reducer

export function getUserList(callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.get('get-users', {})
            if (result.status == 200) {
                console.log('----result-------', result.data)
                dispatch(saveUserDetail(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log(message)
            // if(error.response.status==400){
            //     dispatch(authDataError(false))
            //     toast.error("Please Enter valid credentials")
            // }
        }
    };
}