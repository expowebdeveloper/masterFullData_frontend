import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';

const initialAuthData = {
    loading: false,
}

export const authenticationSlice = createSlice({
    name: 'auth',
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

    }

})

export const {authDataLoading,authDataSuccess,authDataError}= authenticationSlice.actions
export default authenticationSlice.reducer

export function userRegister(payload, callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.post('login/', { ...payload })
            if (result.status == 200) {
                localStorage.setItem("token", result.data.access_token);
                localStorage.setItem("refreshToken", result.data.refresh_token)
                localStorage.setItem("subscribed",result.data.subscribed)
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(authDataError(false))
                toast.error("Please Enter valid credentials")
            }
        }
    };
}

export function userLogin(payload, callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.post('token', { ...payload })
            if (result.status == 200) {
                localStorage.setItem("token", result.data.access_token);
                localStorage.setItem("refreshToken", result.data.refresh_token)
                window.location.href="/"
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(authDataError(false))
                toast.error("Please Enter valid credentials")
            }

        }
    };
}

export function forGotPassword(payload, callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.post('forget-pass', { ...payload })
            console.log(result, '--------------------')
            if (result.status == 200) {
                toast.success("OTP send successfully")
                return callback()
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(authDataError(false))
               
            }

        }
    };
}