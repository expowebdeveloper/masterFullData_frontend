import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';

const initialAuthData = {
    loading: false,
    userData: {},
    isVerified: true,
    forgotPasswordID: '',
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
            state.userData = action.payload
        },
        authDataError: (state, action) => {
            state.loading = false;
            state.isVerified = false
            state.userData.email = action.payload
        },

    }

})

export const {authDataLoading,authDataSuccess,authDataError}= authenticationSlice.actions

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
            dispatch(authDataError(error.response.data.email))
            if (error.response.data.verified == false) {
                dispatch(authDataError(error.response.data.email))
                return callback("sign-up")
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
            toast.success("otp send successfully")
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(authDataError(false))
               
            }

        }
    };
}