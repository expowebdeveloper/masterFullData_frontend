import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';

const initialAuthData = {
    loading: false,
    allUser: [],
    activeUser: 0,
    inActiveUser: 0,
    totalUser: 0,
    pageNumber:1,
    singleUser: {},
    allRoles: [],
    allPermissions: [],
    DashboardHome:{
        dimension: 0,
        properties: 0,
        integration: 0,
        logs:[],
        graphlogs:[]
    }
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
            state.allUser = action.payload.users;
            state.activeUser = action.payload.total_active
            state.inActiveUser = action.payload.total_inactive
            state.totalUser = action.payload.total_user
            state.pageNumber = action.payload.page_number
        },
        removeDeletedUserFromList: (state, action) =>{
            let userId = action.payload
            let users = state.allUser.filter(obj => obj.id !== userId);
            state.allUser = users;
        },
        singleUserDetail: (state, action) => {
            state.singleUser = action.payload
        },
        allRoles: (state, action) => {
            state.allRoles = action.payload
        },
        allPermissions: (state, action) => {
            state.allPermissions = action.payload
        },
        updateActiveState: (state, action) => {
            var result = action.payload
            const userIndex = state.allUser.findIndex(user => user.id === result.user_id);
            if (userIndex !== -1) {
                state.allUser[userIndex].is_active = result.is_active
                state.activeUser = result.total_active
                state.inActiveUser = result.total_inactive
                state.totalUser = result.total_user
            }
        },
        dashboardHomeDataSuccess: (state, action) => {
            state.DashboardHome.dimension = action.payload.dimension
            state.DashboardHome.properties = action.payload.property
            state.DashboardHome.logs = action.payload.logs
            state.DashboardHome.graphlogs = action.payload.graphlogs
        }

    }

})

export const {
    authDataLoading,authDataSuccess,authDataError, saveUserDetail,
    removeDeletedUserFromList, singleUserDetail, allRoles,
    allPermissions, updateActiveState, dashboardHomeDataSuccess,
    } = adminDashboardSlice.actions
export default adminDashboardSlice.reducer

export function getUserList(page, page_size) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.get(`get-users?page=${page}&page_size=${page_size}`, {})
            if (result.status == 200) {
                dispatch(saveUserDetail(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log(message)
        }
    };
}

export function deleteUser(userID, callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.delete(`users/${userID}`, {})
            if (result.status == 200) {
                dispatch(removeDeletedUserFromList(userID))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log(message)
        }
    };
}

export function getUser(userID, callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.get(`get-user/${userID}`, {})
            if (result.status == 200) {
                dispatch(singleUserDetail(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log(message)
        }
    };
}


export function getRoles(callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.get(`roles`, {})
            if (result.status == 200) {
                dispatch(allRoles(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log(message)
        }
    };
}

export function getPermissions(callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.get(`permissions`, {})
            if (result.status == 200) {
                console.log('----permission-------', result.data)
                dispatch(allPermissions(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log(message)

        }
    };
}

export function updateUser(userId, payload, callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.patch(`users/${userId}`, payload)
            if (result.status == 200) {
                toast.success("User Update Successfully")
                dispatch(singleUserDetail(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log(message)

        }
    };
}

export function activeUserR(userId, payload, callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.post(`active`, payload)
            if (result.status == 200) {
                toast.success(result.data?.message || "User Update Successfully")
                var output = Object.assign({}, result.data, payload);
                dispatch(updateActiveState(output))
            }
            console.log(result, '====error====')
        } catch (error) {
            const message = error || "Something went wrong";
            toast.error(message || "User Update Successfully")
            console.log(error)
        }
    };
}

export function getDashboardHomeDetails(callback) {
    return async (dispatch) => {
        dispatch(authDataLoading())
        try {
            let result = await instance.get(`home-page-information`)
            if (result.status == 200) {
                dispatch(dashboardHomeDataSuccess(result.data))
            }
        } catch (error) {
            const message = error.message || "Something went wrong";
            console.log(message)
        }
    };
}
