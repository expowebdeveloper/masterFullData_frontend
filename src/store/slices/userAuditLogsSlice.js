import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';
import { smallLoaderData, smallLoaderStop } from './dimensionsSlice';

const initialLogData = {
    loading: false,
    UserLogsList: [],
    totalLogs: 0,
    pageNumber: 0,
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
            state.UserLogsList = action.payload.data.logs
            state.totalLogs = action.payload.data.total_logs
            state.pageNumber = action.payload.data.page_number

        },
    }

})


export const {userLogsLoading, userLogsError,userLogsDataSuccess} = userLOgsSlice.actions
export default userLOgsSlice.reducer


export function getUserLogs(page, page_size) {
    return async (dispatch) => {

        try {
            dispatch(userLogsLoading())
            let result = await instance.get(`logs/?page=${page}&page_size=${page_size}`)
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
