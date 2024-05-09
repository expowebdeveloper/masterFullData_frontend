import { createSlice } from '@reduxjs/toolkit';
import instance from '../../service/axios.instance';
import { toast } from 'react-toastify';

const initialDimensionData = {
    loading: false,
    dimensionsList: [],
    hierarchyList: [],
    listProperties: [],
    nodeProperties:[],
    smallLoader:false,
    isNodeDelete:false,
    deleteNodeText:null,
    newShareNodeAdded: false,
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
        smallLoaderStop:(state,action)=>{
            state.smallLoader=false
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
        },
        deleteNodeDisp: (state, action) => {
            state.isNodeDelete = action.payload==null?false:true,
            state.deleteNodeText=action.payload
        },
        createShareNodeSuccess: (state, action) => {
            state.newShareNodeAdded = true
            state.smallLoader=false
        },
        createShareNodeFailure: (state, action) => {

        }


    }

})

export const { dimensionDataLoading, 
    deleteNodeDisp,
    dimensionsDataSuccess,
    smallLoaderData, 
    dimensionDataError,
    dimensionDataLoadingSuccess, 
    dimensionHierarchy, 
    dimensionsDataListSuccess, 
    allListProperties, 
    singleNodeProperties, 
    smallLoaderStop, 
    createShareNodeSuccess,
    createShareNodeFailure } = dimensionsSlice.actions
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


export function getHierarchy(payload, callback, comeFromSharedNodeAction=false) {
    return async (dispatch) => {
        dispatch(dimensionDataLoading())
        try {
            let result = await instance.get(`get_hierarchy?name=${payload}`)
            dispatch(dimensionHierarchy(result.data.hierarchy))
            if(comeFromSharedNodeAction){
                dispatch(createShareNodeSuccess());  
                callback()
            }
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

export function addNode(payload, callback) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.post(`add_node`, { ...payload })
            callback(payload)
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function assignAllExistingDimenssionPropertytoNewNode(payload) {
    return async (dispatch) => {
        // dispatch(dimensionDataLoading())
        try {
            let result = await instance.put(`/assign_all_properties_to_new_node`, payload);
        } catch (error) {
            const message = error.message || "Something went wrong";
            if (error.response.status == 400) {
                dispatch(dimensionDataError())
            }
        }
    };
}

export function deleteNode(payload,callback) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            let result = await instance.post(`delete_node`, { ...payload })
            dispatch(dimensionDataLoadingSuccess());
            return callback()
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

export function editPropertyDefinition(payload, callback) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            let result = await instance.post(`edit_property_definition`,{...payload})
            toast.success("Property is updated successfully")
              dispatch(dimensionDataLoadingSuccess());
              callback()

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
            dispatch(dimensionDataError())
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
            if(error.response?.status==400){
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
            if (payload.output_format ===  "CSV"){
                const blob = new Blob([result.data], { type: 'text/csv' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'data.csv';
                link.click();
            } else {
                const jsonString = JSON.stringify(result.data, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'data.json';
                link.click();
            }
            
            dispatch(dimensionDataLoadingSuccess());       
            return callback()
        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response?.status==400){
                dispatch(dimensionDataError())
            }
        }
    };
}

export function deletePropertyNode(payload){
    return (dispatch)=>{
        dispatch(deleteNodeDisp(payload))
    }
}

export function createShareNode(payload, callback) {
    return async (dispatch) => {
        dispatch(smallLoaderData())
        try {
            await instance.post(`add_shared_node`, payload) 

            toast.success("Property is Exported")  
            dispatch(getHierarchy(payload.dimension, callback, true))  
                 

        } catch (error) {
            const message = error.message || "Something went wrong";
            if(error.response?.status==400){
                dispatch(createShareNodeFailure())
            }
        }
    };
}
