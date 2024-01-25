import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getHierarchy } from "../../store/slices/dimensionsSlice";

const DimensionTable = () => {
  const navigate=useNavigate() 
  const dispatch =useDispatch()
 
  const { dimensionsList } = useSelector((state) => state.dimensionData);
  console.log(dimensionsList,"dimensionsList")
  const editDimension=(item)=>{
    // dispatch(getHierarchy(item));
    navigate(`/single-dimension?dimension=${item}`)
  }

  const deleteDimension=()=>{

  }
  return (
    <>
      <div className="dimensionTable">
        <h4 className="dimension-head">Dimensions</h4>
        <Table hover>
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
                      <span className="delete text-danger" onClick={deleteDimension}>Delete</span>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DimensionTable;
