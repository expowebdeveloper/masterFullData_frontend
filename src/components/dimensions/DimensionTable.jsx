import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteDimensionAPI, getAllDimensionsList, getHierarchy } from "../../store/slices/dimensionsSlice";
import DeletePropertyModal from "../singleDimensions/DeletePropertyModal";
import SmallSpinner from "../common/atomic/SmallSpinner";

const DimensionTable = () => {
  const navigate=useNavigate() 
  const dispatch =useDispatch()
  const [deleteDimensionNode,setDeleteDimensionNode]=useState({
    isDelete:false,
    value:''
  })
  const { dimensionsList,loading,smallLoader} = useSelector((state) => state.dimensionData);
  const editDimension=(item)=>{
    // dispatch(getHierarchy(item));
    window.location.href=`/single-dimension?dimension=${item}`
  }

  const deleteDimension=(item)=>{
    setDeleteDimensionNode({
      isDelete:true,
      value:item
    })
  }

  const handleClose=()=>{
    setDeleteDimensionNode({
      isDelete:false,
      value:""
    })
  }

  const confirmDelete=()=>{
    let data={
      dimension_name:deleteDimensionNode?.value
    }

    dispatch(deleteDimensionAPI(data,()=>{
      dispatch(getAllDimensionsList())
      setDeleteDimensionNode({
        isDelete:false,
        value:""
      })
    }))

  }
  return (
    <>
      <div className="dimensionTable">
        <h4 className="dimension-head">Dimensions</h4>
       { loading?
       <div className="text-center"><SmallSpinner/></div>
       : <Table hover>
          <thead>
            <tr>
              <th>Dimension Name</th>
              <th>Top Node</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dimensionsList?.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{item}</td>
                    <td>{item}</td>
                    <td>
                      <span className="edit text-black me-2" onClick={()=>editDimension(item)}>Edit</span>
                      <span className="delete text-danger" onClick={()=>deleteDimension(item)}>Delete</span>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>}
      </div>
      <DeletePropertyModal 
       show={deleteDimensionNode.isDelete}
       handleClose={handleClose}
       heading={"Dimension"}
       message={"Are you sure, you want to delete the Dimension?"}
       confirmDelete={confirmDelete}
       isLoading={smallLoader}
      />
    </>
  );
};

export default DimensionTable;
