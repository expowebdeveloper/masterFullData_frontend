import React, { useEffect } from "react";
import MdButton from "../common/atomic/MdButton";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { assignProperty } from "../../store/slices/dimensionsSlice";
import EditDeleteProperty from "./EditDeleteProperty";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import NoDataFound from "../common/atomic/NoDataFound";
import SmallSpinner from "../common/atomic/SmallSpinner";


const animatedComponents = makeAnimated();

const AddProperty = ({
  handlepropShow,
  handleShow,
  currentDimension,
  selectedNode,
  selectedPropertyField,
  allNodeProperties,
  setIsAssignProperty,
  isPropertyAdded,
  listProperties,
  setPropertyEdit,
  setAllNodeProperties,
  setDropdownSelectedFields,
  isAssignProperty,
  labelValueList,
  dropdownSelectedFields
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const {loading}=useSelector(state=>state.dimensionData)

  
  useEffect(() => {
    allNodeProperties.forEach((item) => {
      setValue(item.name, item.value || item.defaultValue || "");
    });
  }, [allNodeProperties, setValue]);

 
  const onSubmit = (value) => {
  let filteredObj = {};
  allNodeProperties.forEach(property => {
    // Check if the property name exists in the obj
    if (value.hasOwnProperty(property.name)) {
        // Add the property to the filteredObj
        filteredObj[property.name] = value[property.name];
    }
});
    let propertiesValue = {};
    for (let key in filteredObj) {
      console.log(key, "ll");
      if (filteredObj[key]) {
        propertiesValue[key] = filteredObj[key];
      }
    }
    let payloadData = {
      dimension: currentDimension,
      assignments: [
        {
          node_name: selectedNode==""?currentDimension:selectedNode,
          properties: propertiesValue,
        },
      ],
    };

    dispatch(assignProperty(payloadData,()=>{

    }));
  };

  console.log(allNodeProperties,"allNodeProperties")
  return (
    <div className="PropertyAddon">
      <div className="heading p-3">
        <h2 className="text-center m-0">{currentDimension}</h2>
      </div>
      <div className="uploadFileCSV">
        <Form.Control type="file" placeholder="Enter First Name" accept="csv/json"/>
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

        {isAssignProperty?<div className="w-100 my-4">
          <label>Select Property</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={labelValueList}
                value={dropdownSelectedFields}
                onChange={(selectedOption, action) => {
                  console.log(action,"act")
                  setDropdownSelectedFields(selectedOption);
                  if (action.action === "remove-value") {
                    let filter = allNodeProperties.filter(
                      (item) => item.name !== action.removedValue.label
                    );
                    setAllNodeProperties([...filter]);
                  } else {
                  let findObj= listProperties.find((item)=>item.name==action.option.value);
                    setAllNodeProperties([...allNodeProperties, findObj]);
                  }
                }}
              />
            </div>:""}
        {allNodeProperties.length > 0 ? (
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            {allNodeProperties?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Row>
                    <Col md>
                      <Form.Group className="mb-3" controlId={`formBasic${item.name}`}>
                        <Form.Label>{item.name}</Form.Label>
                        <input
                          type={item?.type||'text'}
                          className="common-field"
                          name={item.name}
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
              {loading?<SmallSpinner/>: "Submit"}
            </Button>
          </form>
        ) : (
          <NoDataFound/>
        )}
      </div>
      :
      <>
      <Button onClick={handlepropShow} className="mt-3 me-3">Add Property</Button>
      
        <EditDeleteProperty
      listProperties={listProperties}
      currentDimension={currentDimension}
      handlepropShow={handlepropShow}
      setPropertyEdit={setPropertyEdit}
      />
      </>
   
      }
    </div>
  );
};

export default AddProperty;
