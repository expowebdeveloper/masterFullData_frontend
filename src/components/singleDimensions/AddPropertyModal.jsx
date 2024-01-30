import React, { useEffect } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addProperty,
  editPropertyDefinition,
  getPropertyList,
} from "../../store/slices/dimensionsSlice";

const AddPropertyModal = ({
  propshow,
  handlepropClose,
  currentDimension,
  isEditProperty,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});

  useEffect(() => {
    setValue("name", isEditProperty.name?.name);
    setValue("type", isEditProperty.name?.type);
    setValue("dataType", isEditProperty.name?.dataType);
    setValue("defaultValues", isEditProperty.name?.defaultValue);
  }, [isEditProperty]);

  console.log(isEditProperty,"isEditProperty")

  const onSubmit = (data) => {
    if (isEditProperty.edit) {
      let newData = {
        name: isEditProperty.name,
        new_type: data.type,
        dimensions: [currentDimension],
        new_default_value: data.defaultValues,
        new_inherits: true,

        new_data_type: data.dataType,
      };
      dispatch(editPropertyDefinition(newData));
    } else {
      console.log(data);
      let propertyData = {
        name: data.name,
        type: data.type,
        dimensions: [currentDimension],
        default_value: data.defaultValues,
        inherits: true,
        data_type: data.dataType,
      };
      dispatch(addProperty(propertyData,()=>{
        handlepropClose()
        dispatch(getPropertyList(currentDimension));
      }));
    }
  };
  return (
    <>
      <Modal show={propshow} className="addProperty" onHide={handlepropClose}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditProperty.isEdit ? "Edit Property" : "Add Property"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="mt-4">
              <Row>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Label>Name</Form.Label>
                    <input
                      type="text"
                      className="common-field"
                      name="name"
                      readOnly={isEditProperty.isEdit}
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label>Type</Form.Label>
                    {/* <input
                      type="text"
                      className="common-field"
                      name="type"
                      {...register("type", {
                        required: {
                          value: true,
                          message: "Type is required",
                        },
                      })}
                    /> */}

                    <select className="common-field">
                      <option disabled>Select Input Type</option>
                    <option>text</option>
                    <option>number</option>
                    <option>date</option>
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Label>Data Type</Form.Label>
                    {/* <input
                      type="text"
                      className="common-field"
                      name="dataType"
                      {...register("dataType", {
                        required: {
                          value: true,
                          message: "Data Type is required",
                        },
                      })}
                    /> */}
                     <select className="common-field">
                      <option disabled>Select Data Type</option>
                    <option>string</option>
                    <option>number</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label>Default Values</Form.Label>
                    <input
                      type="text"
                      className="common-field"
                      name="defaultValues"
                      {...register("defaultValues", {
                        required: {
                          value: true,
                          message: "Default Values is required",
                        },
                      })}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {isEditProperty.isEdit ? "Edit" : "Add"} Property
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddPropertyModal;
