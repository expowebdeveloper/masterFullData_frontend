import { useEffect, useState } from "react";
import { flatTreeObjToNodeModel } from "../../../treeView/common/utils";
import GTree from "../../../treeView/components/gtree";
import { useDispatch, useSelector } from "react-redux";
import MdButton from "../../../components/common/atomic/MdButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import makeAnimated from "react-select/animated";
import {
  addNode,
  deleteNode,
  getHierarchy,
  getPropertyList,
  getPropertyNode,
  moveNode,
  renameNode,
} from "../../../store/slices/dimensionsSlice";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AddProperty from "../../../components/dimensions/AddProperty";
import AddPropertyModal from "../../../components/singleDimensions/AddPropertyModal";
import Select from "react-select";

const animatedComponents = makeAnimated();

const SingleDimension = () => {
  const [show, setShow] = useState(false);
  const [selectedNode, setSelectedNode] = useState("");
  const [selectedPropertyField, setSelectedPropertyFiled] = useState("");
  const [allNodeProperties, setAllNodeProperties] = useState([]);
  const [dropdownSelectedFields, setDropdownSelectedFields] = useState([]);
  const [isPropertyAdded,setIsPropertyAdded]=useState(true)
  const [isAssignProperty,setIsAssignProperty]=useState(false)
  const [isEditProperty,setPropertyEdit]=useState({
    isEdit:false,
    name:""
  })
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [propshow, setpropShow] = useState(false);

  const handlepropClose = () => {
    setPropertyEdit(prevState => ({
      ...prevState,
      isEdit: false,
      name:""
    }));
    setpropShow(false);
  }
  const handlepropShow = () => setpropShow(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentDimension = location.search.split("=")[1];
  const { hierarchyList, listProperties, nodeProperties } = useSelector(
    (state) => state.dimensionData
  );
  const newData = flatTreeObjToNodeModel(hierarchyList, 0, currentDimension);
  console.log(currentDimension, "currentDimension");

  useEffect(() => {
    let matchedPairs = listProperties
      .filter((item) => nodeProperties.some((prop) => prop.name === item.name))
      .map((matchedItem) => ({
        label: matchedItem.name,
        value: matchedItem.name,
      }));
    console.log(matchedPairs, "matchedPairs");
    setDropdownSelectedFields(matchedPairs);

  }, [nodeProperties]);

  let labelValueList=listProperties.map((item)=>{
    return {label:item.name,value:item.name}
  })



  useEffect(() => {
    dispatch(getHierarchy(currentDimension));
    dispatch(getPropertyList(currentDimension));
  }, []);

  console.log(listProperties, "listProperties");

  console.log(dropdownSelectedFields, "dropdownSelectedFields");
  useEffect(() => {
    setAllNodeProperties(nodeProperties);
  }, [nodeProperties]);

  const onAction = (v) => {
    console.log("onAction", v);
    let data = {};
    switch (v.type) {
      case "add-dir":
        data = {
          parent: v?.source[v.source.length - 2],
          child: v?.text,
          dimension: currentDimension,
          position: 0,
        };
        console.log(data, "hhh");
        dispatch(addNode(data));
        break;

      case "delete-dir":
        data = {
          name: v.source[v.source.length - 1],
          dimension: currentDimension,
        };

        dispatch(deleteNode(data));
        break;

      case "mv":
        if (
          v.source.length === v.target.length &&
          v.source[v.source.length - 1] !== v.target[v.target.length - 1]
        ) {
          data = {
            old_name: v.source[v.source.length - 1],
            new_name: v.target[v.target.length - 1],
            dimension: currentDimension,
          };
          dispatch(renameNode(data));
        } else {
          data = {
            node_name: v.source[v.source.length - 1],
            old_parent: v.source[v.source.length - 2],
            new_parent: v.target[v.target.length - 1],
            dimension: currentDimension,
            position: 0,
          };
          dispatch(moveNode(data));
        }

        break;

      case "select-dir":
        data = {
          dimension: currentDimension,
          node_name: v.source[v.source.length - 1],
        };
        setSelectedNode(data.node_name);
        dispatch(getPropertyNode(data));
        setIsPropertyAdded(true)
        break;
      default:
        break;
    }
  };



  console.log(hierarchyList, newData, "hierarchyList");
  return (
    <>
      <div className="dimensionSingle">
        <p onClick={()=>setIsPropertyAdded(false) }>Add Property</p>
        <Row>
          <div className="col-md-3">
            <div className="text-center" style={{ marginTop: "120px" }}>
              {newData.length > 0 ? (
                <GTree initialData={newData} onAction={onAction} />
              ) : (
                ""
              )}
            </div>
          </div>
         
          {listProperties.length > 0 ? (
            <AddProperty
              handleShow={handleShow}
              handlepropShow={handlepropShow}
              selectedNode={selectedNode}
              currentDimension={currentDimension}
              selectedPropertyField={selectedPropertyField}
              allNodeProperties={allNodeProperties}
              setIsAssignProperty={setIsAssignProperty}
              isPropertyAdded={isPropertyAdded}
              listProperties={listProperties}
              setPropertyEdit={setPropertyEdit}
            />
          ) : (
            ""
          )}
        </Row>
        {isAssignProperty?<div className="w-50 mb-5">
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
                console.log(filter, "del");
                setAllNodeProperties([...filter]);
              } else {
                dropdownSelectedFields;
                console.log(listProperties,"inside")
               let findObj= listProperties.find((item)=>item.name==action.option.value);
               console.log(findObj,"find")
            
                setAllNodeProperties([...allNodeProperties, findObj]);
              }
            }}
          />
        </div>:""}
      </div>

      <AddPropertyModal
        propshow={propshow}
        handlepropClose={handlepropClose}
        currentDimension={currentDimension}
        isEditProperty={isEditProperty}
       

      />

     {listProperties.length==0? <p className="text-center">
        No Property Added <span onClick={handlepropShow}>Add Property</span> to
        dimension

      </p>

      :""}

    </>
  );
};

export default SingleDimension;
