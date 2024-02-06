import React, { useEffect, useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import trash from "../../assets/img/trash-solid.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ReactSwitch from 'react-switch';
import {
  addProperty,
  editPropertyDefinition,
  getPropertyList,
} from "../../store/slices/dimensionsSlice";
import SmallSpinner from "../common/atomic/SmallSpinner";

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

  const { loading, smallLoader } = useSelector(state => state.dimensionData)
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isInheritSwitchOn, setIsInheritSwitchOn] = useState(false);
  const [validValues, setValidValues] = useState([{ additionalProp: "", value: "" }]);
  const [dataTypeValue, setDataTypeValue] = useState('text')

  const handledefaultSwitchToggle = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  const handledeInheritSwitchToggle = () => {
    setIsInheritSwitchOn(!isInheritSwitchOn);
  };
  const handleAddInput = () => {
    setValidValues([...validValues, { additionalProp: "", value: "" }]);
  };
  // const handleChange = (event, index) => {
  //   let { name, value } = event.target;
  //   let onChangeValue = [...inputs];
  //   onChangeValue[index][name] = value;
  //   setInputs(onChangeValue);
  // };
  const handleDeleteInput = (index) => {
    const newArray = [...validValues];
    newArray.splice(index, 1);
    setValidValues(newArray);
  };
  useEffect(() => {
    setValue("name", isEditProperty.name?.name);
    setValue("type", isEditProperty.name?.type);
    setValue("dataType", isEditProperty.name?.dataType);
    setValue("defaultValues", isEditProperty.name?.defaultValue);
    setDataTypeValue(isEditProperty.name?.dataType || "text")
    if (isEditProperty.name?.dataType === "boolean"){
      setIsSwitchOn(isEditProperty.name?.defaultValue === 'true')
    }


  }, [isEditProperty]);

  const handledataType = (value) => {
    console.log(value)
    setDataTypeValue(value);
  };
  const onSubmit = (data) => {
    if (isEditProperty.edit) {
      let newData = {
        name: isEditProperty.name,
        new_type: data.type,
        dimensions: [currentDimension],
        new_default_value: dataTypeValue === "boolean" ? `${isSwitchOn}` : data.defaultValues,
        new_inherits: isInheritSwitchOn,
        new_data_type: data.dataType,
      };
      dispatch(editPropertyDefinition(newData, () => {
        handlepropClose()
        setDataTypeValue('text');
        setIsSwitchOn(false)
        setIsInheritSwitchOn(false)
        dispatch(getPropertyList(currentDimension))
      }));
    } else {
      let propertyData = {
        name: data.name,
        type: data.type,
        dimensions: [currentDimension],
        default_value: dataTypeValue === "boolean" ? `${isSwitchOn}` : data.defaultValues,
        inherits: isInheritSwitchOn,
        data_type: data.dataType,
      };
      console.log(propertyData, '===========================')
      dispatch(addProperty(propertyData, () => {
        handlepropClose()
        setDataTypeValue('text');
        setIsSwitchOn(false)
        setIsInheritSwitchOn(false)
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
                    <select className="common-field"
                      {...register("type", { required: true, message: "Type is required" })}
                    >
                      <option disabled>Select Input Type</option>
                      <option>Input</option>
                      <option>Calculated</option>
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Label>Data Type</Form.Label>
                    <select className="common-field"
                      {...register("dataType", { required: true, message: "Data Type is required", })}
                      onChange={(e) => {
                        handledataType(e.target.value)
                      }}
                    >
                      <option disabled>Select Data Type</option>
                      <option>text</option>
                      <option>number</option>
                      <option>date</option>
                      <option>boolean</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label className="d-block">Default Values</Form.Label>
                    {dataTypeValue === 'boolean' ? (
                      <ReactSwitch
                        {...register('defaultValues')}
                        checked={isSwitchOn}
                        onChange={handledefaultSwitchToggle}
                      />
                    ) : (
                      <input
                        type={dataTypeValue || 'text'}
                        className="common-field"
                        name="defaultValues"
                        {...register("defaultValues", {
                        })}
                      />
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label className="d-block">Inherit</Form.Label>
                    <ReactSwitch
                      {...register('inherit')}
                      checked={isInheritSwitchOn}
                      onChange={handledeInheritSwitchToggle}
                    />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label className="d-block">Formula</Form.Label>
                    <input
                      type="text"
                      className="common-field"
                      name="formula"
                      {...register("formula", {
                      })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Label>Valid Values</Form.Label>
                {validValues.map((item, index) => (
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBasicLName">
                        <Form.Label className="d-block">Property</Form.Label>
                        <input
                          type="text"
                          className="common-field"
                          name="formula"
                          {...register("formula", {
                          })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="d-block">Value</Form.Label>
                      <div className="d-flex align-items-center">
                        <Form.Group className="mb-3 w-100" controlId="formBasicLName">
                          <input
                            type="text"
                            className="common-field"
                            name="formula"
                            {...register("formula", {
                            })}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3 white-norwrap ps-3 d-flex gap-2" controlId="formBasicLName">
                          {validValues.length > 1 && (
                            <span className="cursor-pointer action-span trash action-btn" onClick={() => handleDeleteInput(index)}><img src={trash} alt="" className='action-image' /></span>
                          )}
                          {index === validValues.length - 1 && (
                            <span className="cursor-pointer  action-span add action-btn" onClick={() => handleAddInput()}>+</span>
                          )}
                        </Form.Group>
                      </div>
                    </Col>
                  </Row>
                ))}

              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              {smallLoader ? <SmallSpinner /> : isEditProperty.isEdit ? "Edit Property" : "Add Property"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddPropertyModal;
