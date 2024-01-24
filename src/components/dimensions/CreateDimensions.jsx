import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import MdButton from "../common/atomic/MdButton";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createDimensions, getAllDimensionsList } from "../../store/slices/dimensionsSlice";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

const CreateDimensions = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const {loading}=useSelector(state=>state.dimensionData)


  const onSubmit = (data) => {
    dispatch(createDimensions(data));
    console.log(data, "ppp");
  };

//   useEffect(()=>{
//   dispatch(getAllDimensionsList())
//   },[])
  return (
    <>
      <Row className="justify-content-center">
        <Col xxl={10} xl={11}>
          <div className="create-dimension-card mb-4">
            <h4 className="dimension-head">Create Dimensions</h4>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Row className="mb-4">
                <Col lg={6}>
                  <div>
                    <label className="label-form">Dimension Name</label>
                    <input
                      type="text"
                      className="common-field"
                      name="name"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                    <p className="error-message">{errors.name?.message}</p>
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label className="label-form">Top Node</label>
                    <input
                      type="text"
                      name="top_node"
                      className="common-field"
                      {...register("top_node", {
                        required: {
                          value: true,
                          message: "Node is required",
                        },
                      })}
                    />
                    <p className="error-message">{errors.top_node?.message}</p>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                {/* <button className="common-btn shadow-none">
              </button> */}
                <MdButton text="Create Dimension" isLoading={loading} />
              </div>
            </form>
          </div>
          <div className='dimensionTable'>
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
                <tr>
                  <td>Test 1</td>
                  <td>CFO</td>
                  <td><Link className="edit text-black me-2">Edit</Link><Link className="delete text-danger">Delete</Link></td>
                </tr>
                <tr>
                  <td>Test 1</td>
                  <td>CFO</td>
                  <td><Link className="edit text-black me-2">Edit</Link><Link className="delete text-danger">Delete</Link></td>
                </tr>
                <tr>
                  <td>Test 1</td>
                  <td>CFO</td>
                  <td><Link className="edit text-black me-2">Edit</Link><Link className="delete text-danger">Delete</Link></td>
                </tr>
                <tr>
                  <td>Test 1</td>
                  <td>CFO</td>
                  <td><Link className="edit text-black me-2">Edit</Link><Link className="delete text-danger">Delete</Link></td>
                </tr>
                <tr>
                  <td>Test 1</td>
                  <td>CFO</td>
                  <td><Link className="edit text-black me-2">Edit</Link><Link className="delete text-danger">Delete</Link></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CreateDimensions;
