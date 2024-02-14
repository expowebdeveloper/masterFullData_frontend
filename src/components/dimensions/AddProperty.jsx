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
  dropdownSelectedFields,
  hierarchyList
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});
  const { loading, smallLoader } = useSelector(state => state.dimensionData)


  console.log(allNodeProperties, 'fffffffffffffffffffffffffffff')

  useEffect(() => {
    allNodeProperties.forEach((item) => {
      setValue(item.name, item.value || item.defaultValue || "");
    });
  }, [allNodeProperties, setValue]);


  function findAllDescendants(nodes, parentId) {
    let descendants = [];

    nodes.forEach(node => {
      if (node.parent === parentId) {
        descendants.push(node);
        descendants = descendants.concat(findAllDescendants(nodes, node.id));
      }
    });
    return descendants;
  }


  const onSubmit = (value) => {
    let filteredObj = {};
    allNodeProperties.forEach(property => {
      if (value.hasOwnProperty(property.name)) {
        filteredObj[property.name] = value[property.name];
      }
    });
    let propertiesValue = {};
    for (let key in filteredObj) {
      if (filteredObj[key]) {
        propertiesValue[key] = filteredObj[key];
      }
    }
    let payloadData = {
      dimension: currentDimension,
      assignments: [
        {
          node_name: selectedNode == "" ? currentDimension : selectedNode,
          properties: propertiesValue,
        },
      ],
    };

    console.log(allNodeProperties, filteredObj, 'eeeeeeeeeeeeeeeeeeeeeeeeeee')


    dispatch(assignProperty(payloadData, () => {
      const allChildNodes = findAllDescendants(hierarchyList, selectedNode)

      let nodeName = allChildNodes.map(item => {
        return item.node?.name
      })

      let updatedData = {};

      allNodeProperties.forEach(item => {
        if (filteredObj[item.name] && filteredObj[item.name] !== item.value) {
          updatedData[item.name] = filteredObj[item.name];
        }
      });

      let data = {
        "dimension": currentDimension,
        "assignments": []
      }

      nodeName.forEach(item => {
        data.assignments.push({
          "node_name": item,
          "properties": updatedData
        })
      })

      dispatch(assignProperty(data, () =>{
        console.log("Child also updated")
      }))


    }));
  };

  return (
    <div className="PropertyAddon">
      <div className="heading p-3">
        <h2 className="text-center m-0">{currentDimension}</h2>
      </div>
      <div className="uploadFileCSV">
        <Form.Control type="file" placeholder="Enter First Name" accept="csv/json" />
        <b>Upload CSV or JSON File</b>
      </div>
      {isPropertyAdded ? <div className="propertyListing p-4 mt-4">
        <Button
          variant="primary"
          onClick={() => setIsAssignProperty(prev => !prev)}
          className="PropertyBtn"
        >
          Assign Property
        </Button>

        {loading ? <div className="text-center"><SmallSpinner /></div> :
          <> {isAssignProperty ? <div className="w-100 my-4">
            <label>Select Property</label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={labelValueList}
              value={dropdownSelectedFields}
              onChange={(selectedOption, action) => {
                setDropdownSelectedFields(selectedOption);
                if (action.action === "remove-value") {
                  let filter = allNodeProperties.filter(
                    (item) => item.name !== action.removedValue.label
                  );
                  setAllNodeProperties([...filter]);
                } else {
                  let findObj = listProperties.find((item) => item.name == action.option.value);
                  setAllNodeProperties([...allNodeProperties, findObj]);
                }
              }}
            />
          </div> : ""}


            {allNodeProperties.length > 0 ? (
              <form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Row className="d-flex align-items-center">
                  {allNodeProperties?.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId={`formBasic${item.name}`}>
                            <Form.Label>{item.name}</Form.Label>
                            {item.validValues.length > 0 ? (
                              <select className="common-field"
                                {...register(item?.name, {
                                  required: {
                                    value: true,
                                    message: `${item?.name} is required`,
                                  },
                                })}

                              >
                                <option selected>{item.defaultValue}</option>
                                {item.validValues.map((data, index) => (
                                  <option key={index}>{data}</option>
                                ))}

                              </select>
                            ) : (
                              <input
                                type={item?.type || 'text'}
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
                            )}
                          </Form.Group>
                        </Col>

                      </React.Fragment>
                    );
                  })}
                  <Col md={4}>
                    <Button variant="primary" type="submit">
                      {smallLoader ? <SmallSpinner /> : "Submit"}
                    </Button>
                  </Col>
                </Row>
              </form>
            ) : (
              <NoDataFound />
            )}</>

        }
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
