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
                 toast.success("New User is created");
                 dispatch(authDataSuccess())
                 return callback()
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(authDataError())
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
                console.log(result,"ppp")
                localStorage.setItem("user",result.data.first_name)
                window.location.href="/"
            }
        } catch (error) {
            dispatch(authDataError())
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(authDataError())
                toast.error("Please Enter valid credentials")
            }
            if(error.response.status==404){
                toast.error("Email not found!")
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
                dispatch(authDataSuccess())
                return callback(result.data?.user_id)
            } else {
                toast.error("Something went wrong")
            }
        } catch (error) {
            console.log(error)
            const message = error.response.data.detail || "Something went wrong";
            toast.error(message)
            if(error.response?.status==400){
                dispatch(authDataError())
               
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
            dispatch(authDataError())
            const message = error.message || "Something went wrong";
            if(error.response.status==404){
                toast.error("OTP not matched!")
                dispatch(authDataError())
            }
            

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
