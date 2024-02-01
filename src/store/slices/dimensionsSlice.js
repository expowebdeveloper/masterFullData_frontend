import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';

const initialDimensionData = {
    loading: false,
    dimensionsList: [],
    hierarchyList: [],
    listProperties: [],
    nodeProperties:[],
    smallLoader:false
}

export const dimensionsSlice = createSlice({
    name: 'dimension',
    initialState: initialDimensionData,
    reducers: {
        dimensionDataLoading: (state, action) => {
            state.loading = true;
        },
        dimensionDataLoadingSuccess: (state, action) => {
            state.loading = false;
            state.smallLoader=false
        },
        dimensionsDataSuccess: (state, action) => {
            state.loading = false;
            state.smallLoader=false

        },
        dimensionsDataListSuccess: (state, action) => {
            state.loading = false;
            state.dimensionsList = action.payload
        },

        smallLoaderData:(state,action)=>{
            state.smallLoader=true
        },
        dimensionDataError: (state, action) => {
            state.loading = false;
            state.smallLoader=false
        },
        dimensionHierarchy: (state, action) => {
            state.loading = false,
                state.hierarchyList = action.payload
        },
        allListProperties: (state, action) => {
            state.loading = false,
            state.listProperties = action.payload
        },
        singleNodeProperties: (state, action) => {
            state.loading = false,
                state.nodeProperties = action.payload
        }


    }

})

export const { dimensionDataLoading, dimensionsDataSuccess,smallLoaderData, dimensionDataError,dimensionDataLoadingSuccess, dimensionHierarchy, dimensionsDataListSuccess, allListProperties, singleNodeProperties } = dimensionsSlice.actions
export default dimensionsSlice.reducer


export function createDimensions(payload, callback) {
    return async (dispatch) => {
        
        dispatch(smallLoaderData())
        try {
            let result = await instance.post('create_dimension', { ...payload })
            dispatch(dimensionsDataSuccess())
            toast.success("New Dimension is Added")
            return callback()
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
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.get('list_dimensions', { ...payload })
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
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`list_properties`, {
                "dimension": payload
            })
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
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`add_node`, { ...payload })

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
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`delete_node`, { ...payload })

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
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`move_node`, { ...payload })

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
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`rename_node`, { ...payload })

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
            dispatch(singleNodeProperties(result.data.properties))

        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function addProperty(payload,callback) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            let result = await instance.post(`define_property`, { ...payload })
            dispatch(dimensionDataLoadingSuccess());
         toast.success(result.data.status)
         return callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function assignProperty(payload,callback) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            let result = await instance.post(`assign_property_value`,{...payload})
              toast.success(result.data.status)
              dispatch(dimensionDataLoadingSuccess());
              return callback()

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}


export function deleteProperty(payload,callback) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            let result = await instance.delete(`delete_property?property_name=${payload.property_name}&dimension=${payload.dimension}`)
              toast.success("Property is deleted")
              dispatch(dimensionDataLoadingSuccess());
              return callback()

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}

export function editPropertyDefinition(payload) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            let result = await instance.post(`edit_property_definition`,{...payload})
            toast.success("Property is updated successfully")
              dispatch(dimensionDataLoadingSuccess());

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}

export function deleteDimensionAPI(payload,callback) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            let result = await instance.post(`delete_dimension`,{...payload})   
            toast.success("Dimension is Deleted")    
            dispatch(dimensionDataLoadingSuccess());       
              return callback()


        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}



export function addImportData(payload,callback) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            let result = await instance.post(`import_hierarchy`,payload,{
                headers: {
                    "content-type": "multipart/form-data",
                },
            })   
            toast.success("Property is Exported")    
            dispatch(dimensionDataLoadingSuccess());       
              return callback()


        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}


export function addExportData(payload,callback) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            let result = await instance.post(`extract_hierarchy`,{...payload})   
            toast.success("Property is Exported")    
            dispatch(dimensionDataLoadingSuccess());       
              return callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}

