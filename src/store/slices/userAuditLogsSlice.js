import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';
import { smallLoaderData, smallLoaderStop } from './dimensionsSlice';

const initialLogData = {
    loading: false,
    UserLogsList: [],
}



export const userLOgsSlice = createSlice({
    name: 'userLogs',
    initialState: initialLogData,
    reducers: {
        userLogsLoading: (state, action) => {
            state.loading = true;
        },
        userLogsError: (state, action) => {
            state.loading = false;
        },
        userLogsDataSuccess: (state, action) => {
            state.loading = false;
            state.UserLogsList = action.payload.data

        },
    }

})


export const {userLogsLoading, userLogsError,userLogsDataSuccess} = userLOgsSlice.actions
export default userLOgsSlice.reducer


export function getUserLogs() {
    return async (dispatch) => {

        try {
            dispatch(userLogsLoading())
            let result = await instance.get(`logs/`)
            dispatch(userLogsDataSuccess(result))
        } catch (error) {
            dispatch(userLogsError())
            console.log(error)
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                console.log("----------------------")
            }
        }
    };
}
