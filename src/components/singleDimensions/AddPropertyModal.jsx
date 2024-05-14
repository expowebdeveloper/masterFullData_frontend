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
  assignProperty,
} from "../../store/slices/dimensionsSlice";
import SmallSpinner from "../common/atomic/SmallSpinner";
import { createProperty } from "../../store/slices/propertySlice";

const AddPropertyModal = ({
  propshow,
  handlepropClose,
  currentDimension,
  isEditProperty,
  hierarchyList,
  addPropertyOnly
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({
    defaultValues:{
      validValues: ['']
    }
  });

  const validValues = watch('validValues');

  const { loading, smallLoader } = useSelector(state => state.dimensionData)
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isInheritSwitchOn, setIsInheritSwitchOn] = useState(false);
  const [isSyncSharedSwitchOn, setIsSyncSharedSwitchOn] = useState(false);
  const [dataTypeValue, setDataTypeValue] = useState('text')

  const handledefaultSwitchToggle = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  const handledeInheritSwitchToggle = () => {
    setIsInheritSwitchOn(!isInheritSwitchOn);
  };
  const handledeSyncSharedSwitchToggle = () => {
    setIsSyncSharedSwitchOn(!isSyncSharedSwitchOn);
  };
  const handleAddInput = () => {
    const newValues = [...validValues, ''];
    setValue('validValues', newValues);
  };
  // const handleChange = (event, index) => {
  //   let { name, value } = event.target;
  //   let onChangeValue = [...inputs];
  //   onChangeValue[index][name] = value;
  //   setInputs(onChangeValue);
  // };
  const handleDeleteInput = (index) => {
    const newValues = validValues.filter((_, i) => i !== index);
    setValue('validValues', newValues);

  };
  useEffect(() => {
    setValue("name", isEditProperty.name?.name);
    setValue("type", isEditProperty.name?.type);
    setValue("dataType", isEditProperty.name?.dataType);
    setValue("defaultValues", isEditProperty.name?.defaultValue);
    setDataTypeValue(isEditProperty.name?.dataType || "text")
    if (isEditProperty.name?.dataType === "boolean") {
      setIsSwitchOn(isEditProperty.name?.defaultValue === 'true')
    }
    setValue('validValues',  isEditProperty.name && isEditProperty.name?.validValues.length > 0 ? isEditProperty.name?.validValues : ['']);
    setIsInheritSwitchOn(isEditProperty.name?.inherits);
    setIsSyncSharedSwitchOn(isEditProperty.name?.isSharedSync);

  }, [isEditProperty]);

  const handledataType = (value) => {
    setDataTypeValue(value);
  };

  const onSubmit = (data) => {
    if (isEditProperty.isEdit) {
      let newData = {
        name: isEditProperty.name.name,
        is_shared_sync: isSyncSharedSwitchOn,
        new_dimensions: currentDimension,
        new_type: data.type,
        new_default_value: dataTypeValue === "boolean" ? `${isSwitchOn}` : data.defaultValues,
        new_inherits: isInheritSwitchOn,
        new_data_type: data.dataType,
        new_valid_values: data.validValues[0] === '' ? [] : data.validValues,
      };

      dispatch(editPropertyDefinition(newData, () => {
        handlepropClose()
        setDataTypeValue('text');
        setIsSwitchOn(false)
        setIsInheritSwitchOn(false)
        if(addPropertyOnly !== true) {
          dispatch(getPropertyList(currentDimension))
        }
      }));
    } else {
      alert()
      let propertyData = {
        name: data.name,
        type: data.type,
        dimensions: [currentDimension],
        default_value: dataTypeValue === "boolean" ? `${isSwitchOn}` : data.defaultValues,
        inherits: isInheritSwitchOn,
        data_type: data.dataType,
        is_shared_sync: isSyncSharedSwitchOn,
        ...(
          addPropertyOnly === true ? 
          { valid_values: data.validValues[0] === '' ? [] : data.validValues } : 
          { valid_values: { [currentDimension]: data.validValues[0] === '' ? [] : data.validValues } }
        )
      };

      console.log(propertyData,'------------------')

      if(addPropertyOnly === true) {
        dispatch(createProperty(propertyData, () => {
          handlepropClose()
          setDataTypeValue('text');
          setIsSwitchOn(false)
          setIsInheritSwitchOn(false)
        }))
      }else{
        dispatch(addProperty(propertyData, () => {
          handlepropClose()
          setDataTypeValue('text');
          setIsSwitchOn(false)
          setIsInheritSwitchOn(false)
          assignPropertyOnNodes(propertyData)
        }));        
      }

    }
  };

  const assignPropertyOnNodes = (propertyData) =>{
    alert('called')
    let input_data = {
      "dimension": currentDimension,
      "assignments": []
    }

    hierarchyList.forEach(item => {
      input_data.assignments.push({
        "node_name": item.node.name,
        "properties": {
          [propertyData.name]: dataTypeValue === "boolean" ? `${isSwitchOn}` : propertyData.default_value,
        }
      })
    });

    dispatch(assignProperty(input_data, ()=>{
      dispatch(getPropertyList(currentDimension));
    }))
    setValue('validValues', ['']);
  }


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
            <Form className="mt-3">
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
                        <Form.Label className="d-block">Sync Shared</Form.Label>
                        <ReactSwitch
                          {...register('syncShared')}
                          checked={isSyncSharedSwitchOn}
                          onChange={handledeSyncSharedSwitchToggle}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                  <Form.Label>Valid Values</Form.Label>
                    {validValues.map((item, index) => (
                      <Row key={index}>
                        <Col md={10}>
                          <div className="d-flex align-items-center">
                            <Form.Group className="mb-3" controlId="formBasicLName">
                              <input
                                type="text"
                                className="common-field"
                                name="validValues"
                                // {...register("validValues", {
                                // })}

                                {...register(`validValues.${index}`)}
                                defaultValue={item} // Set the default value

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

                  </Form.Group>
                </Col>
                {/* <Col md>
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
                </Col> */}
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
