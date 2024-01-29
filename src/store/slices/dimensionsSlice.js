import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';

const initialDimensionData = {
    loading: false,
    dimensionsList: [],
    hierarchyList: [],
    listProperties: [],
    nodeProperties:[]
}

export const dimensionsSlice = createSlice({
    name: 'dimension',
    initialState: initialDimensionData,
    reducers: {
        dimensionDataLoading: (state, action) => {
            state.loading = true;
        },
        dimensionsDataSuccess: (state, action) => {
            state.loading = false;

        },
        dimensionsDataListSuccess: (state, action) => {
            state.loading = false;
            state.dimensionsList = action.payload
        },
        dimensionDataError: (state, action) => {
            state.loading = false;
        },
        dimensionHierarchy: (state, action) => {
            state.loading = false,
                state.hierarchyList = action.payload
        },
        allListProperties: (state, action) => {
            let listPropertyLabelAndValues=action.payload?.map((item)=>{
                return {label:item,value:item}
            })
            state.loading = false,
            state.listProperties = listPropertyLabelAndValues
        },
        singleNodeProperties: (state, action) => {
            state.loading = false,
                state.nodeProperties = action.payload
        }


    }

})

export const { dimensionDataLoading, dimensionsDataSuccess, dimensionDataError, dimensionHierarchy, dimensionsDataListSuccess, allListProperties, singleNodeProperties } = dimensionsSlice.actions
export default dimensionsSlice.reducer


export function createDimensions(payload, callback) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post('create_dimension', { ...payload })
            dispatch(dimensionsDataSuccess())
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function getAllDimensionsList(payload, callback) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.get('list_dimensions', { ...payload })
            console.log(result, "lll")
            dispatch(dimensionsDataListSuccess(result.data))
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}


export function getHierarchy(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.get(`get_hierarchy?name=${payload}`)
            console.log(result, "lll")
            dispatch(dimensionHierarchy(result.data.hierarchy))
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function getPropertyList(payload) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`list_properties`, {
                "dimension": payload
            })
            console.log(result, "lll")
            dispatch(allListProperties(result.data))
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function addNode(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`add_node`, { ...payload })
            console.log(result, "lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function deleteNode(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`delete_node`, { ...payload })
            console.log(result, "lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function moveNode(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`move_node`, { ...payload })
            console.log(result, "lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function renameNode(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`rename_node`, { ...payload })
            console.log(result, "lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function getPropertyNode(payload) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`get_node_properties`, { ...payload })
            console.log(result, "lll")
            dispatch(singleNodeProperties(result.data.properties))

        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function addProperty(payload) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`define_property`, { ...payload })
            console.log(result, "lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function assignProperty(payload) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`assign_property_value`,{...payload})
              console.log(result,"lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}


export function deleteProperty(payload) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.delete(`delete_property?property_name=${payload.property_name}&dimension=${payload.dimension}`)
              console.log(result,"lll")

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}