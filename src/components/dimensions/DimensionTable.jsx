import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DimensionTable = () => {
  const { dimensionsList } = useSelector((state) => state.dimensionData);
  const editDimension=()=>{

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
            {['','','','',''].map((item, index) => {
              return (
                <>
                  <tr>
                    <td>Test 1</td>
                    <td>CFO</td>
                    <td>
                      <Link className="edit text-black me-2 " onClick={editDimension}>Edit</Link>
                      <Link className="delete text-danger" onClick={deleteDimension}>Delete</Link>
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
