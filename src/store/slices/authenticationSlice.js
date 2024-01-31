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
            let result = await instance.post('user', { ...payload })
            if (result.status == 200) {
                console.log(result)
                localStorage.setItem("token", result.data.access_token);
                localStorage.setItem("refreshToken", result.data.refresh_token)
                 toast.success("New User is created");
                 dispatch(authDataSuccess())
                 return callback()
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
            if (result.status == 200) {
                toast.success("OTP send successfully")
                return callback(result.data?.user_id)
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log(error)
            const message = error.message || "Something went wrong";
            if(error.response?.status==400){
                dispatch(authDataError(false))
               
            }

        }
    };
}

export function verifyOtp(payload, callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.post('verify-otp', { ...payload })
            if (result.status == 200) {
                toast.success("OTP Matched!")
                return callback()
            } else {
                toast.error("Something went wrong----")
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==404){
                toast.error("OTP not matched!")
            }
            // if(error.response.status==400){
            //     dispatch(authDataError(false))
               
            // }

        }
    };
}

export function resetPassword(payload, callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.post('reset-pass', { ...payload })
            if (result.status == 200) {
                toast.success("Reset Password Successfully")
                return callback()
            } else {
                toast.error("Something went wrong----")
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response?.status==404){
                toast.error("Otp not verified!")
            }
            // if(error.response.status==400){
            //     dispatch(authDataError(false))
               
            // }

        }
    };
}
