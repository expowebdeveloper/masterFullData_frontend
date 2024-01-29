import React, { useEffect } from "react";
import MdButton from "../common/atomic/MdButton";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { assignProperty } from "../../store/slices/dimensionsSlice";
import EditDeleteProperty from "./EditDeleteProperty";

const AddProperty = ({
  handlepropShow,
  handleShow,
  currentDimension,
  selectedNode,
  selectedPropertyField,
  allNodeProperties,
  setIsAssignProperty,
  isPropertyAdded,
  listProperties
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});

  const onSubmit = (data) => {
    console.log(data, "jjjj");
    let propertiesValue = {};
    for (let key in data) {
      console.log(key, "ll");
      if (data[key]) {
        propertiesValue = {
          ...propertiesValue,
          [key]: data[key],
        };
      }
    }
    let payloadData = {
      dimension: currentDimension,
      assignments: [
        {
          node_name: selectedNode,
          properties: propertiesValue,
        },
      ],
    };

    dispatch(assignProperty(payloadData));
  };

  return (
    <div className="col-md-9">
      <div className="heading p-3">
        <h2 className="text-center m-0">{currentDimension}</h2>
      </div>
      <div className="uploadFileCSV">
        <Form.Control type="file" placeholder="Enter First Name" />
        <b>Upload CSV or JSON File</b>
      </div>
    { isPropertyAdded? <div className="propertyListing p-4 mt-4">
        <Button
          variant="primary"
          onClick={() => setIsAssignProperty(true)}
          className="PropertyBtn"
        >
          Assign Property
        </Button>
        {allNodeProperties.length > 0 ? (
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            {allNodeProperties?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Row>
                    <Col md>
                      <Form.Group className="mb-3" controlId="formBasicFName">
                        <Form.Label>{item.name}</Form.Label>
                        <input
                          type={item?.type}
                          className="common-field"
                          name={item.name}
                          value={item?.defaultValue}
                          placeholder=""
                          {...register(item?.name, {
                            required: {
                              value: true,
                              message: `${item?.name} is required`,
                            },
                          })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </React.Fragment>
              );
            })}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        ) : (
          ""
        )}
      </div>
      :
      <EditDeleteProperty
      listProperties={listProperties}
      currentDimension={currentDimension}
      />
      }
    </div>
  );
};

export default AddProperty;
