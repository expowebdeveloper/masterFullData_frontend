import { useEffect, useState } from "react";
import { defaultConfirmDelete, flatTreeObjToNodeModel } from "../../../treeView/common/utils";
import GTree from "../../../treeView/components/gtree";
import { useDispatch, useSelector } from "react-redux";
import MdButton from "../../../components/common/atomic/MdButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  addNode,
  deleteNode,
  deletePropertyNode,
  getHierarchy,
  getPropertyList,
  getPropertyNode,
  moveNode,
  renameNode,
  assignAllExistingDimenssionPropertytoNewNode,
} from "../../../store/slices/dimensionsSlice";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AddProperty from "../../../components/dimensions/AddProperty";
import AddPropertyModal from "../../../components/singleDimensions/AddPropertyModal";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import SmallSpinner from "../../../components/common/atomic/SmallSpinner";
import ImportExportModal from "../../../components/common/atomic/ImportExportModal";
import ImportModalContent from "../../../components/common/atomic/importModalContent";
import ExportModalContent from "../../../components/common/atomic/ExportModalContent";
import DeletePropertyModal from "../../../components/singleDimensions/DeletePropertyModal";
import { useOnDeleteTreeObj } from "../../../treeView/components/gtree/hooks";

const SingleDimension = () => {
  const onDelete = useOnDeleteTreeObj();
  const [show, setShow] = useState(false);
  const [selectedNode, setSelectedNode] = useState("");
  const [selectedPropertyField, setSelectedPropertyFiled] = useState("");
  const [importExport, setImportExport] = useState({
    isModal: false,
    whichOneModal: null,
  });
  const [allNodeProperties, setAllNodeProperties] = useState([]);
  const [dropdownSelectedFields, setDropdownSelectedFields] = useState([]);
  const [isPropertyAdded, setIsPropertyAdded] = useState(true);
  const [isAssignProperty, setIsAssignProperty] = useState(false);
  const [isEditProperty, setPropertyEdit] = useState({
    isEdit: false,
    name: "",
  });
  const handleClose = () => {
    dispatch(deletePropertyNode(null))
  };
  const handleShow = () => setShow(true);
 

  const [propshow, setpropShow] = useState(false);

  const handlepropClose = () => {
    setPropertyEdit((prevState) => ({
      ...prevState,
      isEdit: false,
      name: "",
    }));
    setpropShow(false);
  };
  const handlepropShow = () => setpropShow(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentDimensions = location.search.split("=")[1];
  const currentDimension=currentDimensions.replace(/%20/g, ' ');
  const { hierarchyList, listProperties, nodeProperties, loading,smallLoader,isNodeDelete,deleteNodeText, newShareNodeAdded } =
    useSelector((state) => state.dimensionData);
  
  const [newData, setNewData] = useState([])

  const oldtreeData = JSON.parse(JSON.stringify(newData));

  useEffect(() => {
    let matchedPairs = listProperties
      .filter((item) => nodeProperties.some((prop) => prop.name === item.name))
      .map((matchedItem) => ({
        label: matchedItem.name,
        value: matchedItem.name,
      }));
    setDropdownSelectedFields(matchedPairs);
  }, [nodeProperties]);

  let labelValueList = listProperties.map((item) => {
    return { label: item.name, value: item.name };
  });

  useEffect(() => {
    dispatch(getHierarchy(currentDimension));
    dispatch(getPropertyList(currentDimension));
  }, []);

  useEffect(() =>{
    if(hierarchyList.length > 0 && newShareNodeAdded === false){
      let data = {
        dimension: currentDimension,
        node_name: hierarchyList[0]?.node?.name,
        parent: hierarchyList[0]?.parent
      };
      dispatch(getPropertyNode(data));

      const newDataa = flatTreeObjToNodeModel(hierarchyList, 0, currentDimension);
      setNewData(newDataa)
    }
  },[hierarchyList])

  useEffect(() =>{
    if(newShareNodeAdded){
      const newDataa = flatTreeObjToNodeModel(hierarchyList, 0, currentDimension);
      setNewData(newDataa)
    }
  },[newShareNodeAdded])

  useEffect(() => {
    setAllNodeProperties(nodeProperties);
  }, [nodeProperties]);

  const importExportClick = (currentModal) => {
    setImportExport({
      isModal: true,
      whichOneModal: currentModal,
    });
  };

  const importExportClickClose = () => {
    setImportExport({ isModal: false, whichOneModal: null });
  };

  const assignPropertyToNewNode = (data) =>{
    dispatch(assignAllExistingDimenssionPropertytoNewNode(data))
  }

  const onAction = (v, position=null) => {
    let data = {};
    console.log(v,"ll")
    switch (v.type) {
      case "add-dir":
        data = {
          parent: v?.source[v.source.length - 2],
          child: v?.text,
          dimension: currentDimension,
          position: 0,
        };
        dispatch(addNode(data, assignPropertyToNewNode));
        break;

      case "delete-dir":
        data = {
          name: v.source[v.source.length - 1],
          dimension: currentDimension,
        };

        dispatch(deleteNode(data));
        break;

      case "rename":
        data = {
          old_name: v.source[v.source.length - 1],
          new_name: v.target[v.target.length - 1],
          dimension: currentDimension,
        };
        dispatch(renameNode(data));
        break;

      case "mv":
        data = {
          node_name: v.source[v.source.length - 1],
          old_parent: v.source[v.source.length - 2],
          new_parent: v.target[v.target.length - 1],
          dimension: currentDimension,
          position: position,
        };
        dispatch(moveNode(data));

        break;

      case "select-dir":
        data = {
          dimension: currentDimension,
          node_name: v.source[v.source.length - 1],
          parent: v.source[v.source.length - 2]
        };
        setIsAssignProperty(false);
        setSelectedNode(data.node_name);
        dispatch(getPropertyNode(data));
        setIsPropertyAdded(true);
        break;
      default:
        break;
    }
  };
  const confirmDelete = () => {
    let data = {
      name:deleteNodeText,
      dimension: currentDimension,
    };
    defaultConfirmDelete("node")
    onDelete("878","first")
   
    dispatch(deleteNode(data,()=>{
      dispatch(deletePropertyNode(null))
      dispatch(getHierarchy(currentDimension));
    }));
  };


  return (
    <>
      <div className="dimensionSingle">
        <Row>
          <div className="col-md-3 p-0">
            <div className="secondBar">
              <div className="topName">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="titleName">
                    <h2
                      className="property_added-toggle"
                      onClick={() => setIsPropertyAdded(false)}
                    >
                      {currentDimension} <MdOutlinePlaylistAdd />
                      <span>{hierarchyList.length} Total Nodes</span>
                    </h2>
                  </div>
                  <div className="btnList">
                    <button onClick={() => importExportClick("import")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 9.33333L7.764 9.56933L8 9.80467L8.236 9.56933L8 9.33333ZM8.33333 3.33333C8.33333 3.24493 8.29821 3.16014 8.2357 3.09763C8.17319 3.03512 8.0884 3 8 3C7.91159 3 7.82681 3.03512 7.76429 3.09763C7.70178 3.16014 7.66666 3.24493 7.66666 3.33333H8.33333ZM4.43066 6.236L7.764 9.56933L8.236 9.09733L4.90266 5.764L4.43066 6.236ZM8.236 9.56933L11.5693 6.236L11.0973 5.764L7.764 9.09733L8.236 9.56933ZM8.33333 9.33333V3.33333H7.66666V9.33333H8.33333Z"
                          fill="#5864FF"
                        />
                        <path
                          d="M3.33331 10.6667V11.3334C3.33331 11.687 3.47379 12.0262 3.72384 12.2762C3.97389 12.5263 4.31302 12.6667 4.66665 12.6667H11.3333C11.6869 12.6667 12.0261 12.5263 12.2761 12.2762C12.5262 12.0262 12.6666 11.687 12.6666 11.3334V10.6667"
                          stroke="#5864FF"
                        />
                      </svg>
                      Import
                    </button>
                    <button onClick={() => importExportClick("export")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 3.33339L7.764 3.09739L8 2.86206L8.236 3.09739L8 3.33339ZM8.33333 9.33339C8.33333 9.4218 8.29821 9.50658 8.2357 9.5691C8.17319 9.63161 8.0884 9.66673 8 9.66673C7.91159 9.66673 7.82681 9.63161 7.76429 9.5691C7.70178 9.50658 7.66666 9.4218 7.66666 9.33339H8.33333ZM4.43066 6.43073L7.764 3.09739L8.236 3.56939L4.90266 6.90273L4.43066 6.43073ZM8.236 3.09739L11.5693 6.43073L11.0973 6.90273L7.764 3.56939L8.236 3.09739ZM8.33333 3.33339V9.33339H7.66666V3.33339H8.33333Z"
                          fill="#5864FF"
                        />
                        <path
                          d="M3.33331 10.6667V11.3334C3.33331 11.687 3.47379 12.0262 3.72384 12.2762C3.97389 12.5263 4.31302 12.6667 4.66665 12.6667H11.3333C11.6869 12.6667 12.0261 12.5263 12.2761 12.2762C12.5262 12.0262 12.6666 11.687 12.6666 11.3334V10.6667"
                          stroke="#5864FF"
                        />
                      </svg>
                      Export
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-center" style={{ marginTop: "30px" }}>
                {newData.length > 0 ? (
                  <GTree
                    key={newData.length}
                    initialData={newData}
                    oldData={oldtreeData}
                    onAction={onAction}
                    className="treeStructure"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-md-9">
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
                isAssignProperty={isAssignProperty}
                setDropdownSelectedFields={setDropdownSelectedFields}
                dropdownSelectedFields={dropdownSelectedFields}
                setAllNodeProperties={setAllNodeProperties}
                labelValueList={labelValueList}
                hierarchyList={hierarchyList}
                treeData={newData}
              />
            ) : (
              ""
            )}

            {!loading && listProperties.length === 0 && (
              <p className="text-center noPropertyaddition mt-5">
                No Property Added{" "}
                <span onClick={handlepropShow}>Add Property</span> to dimension
              </p>
            )}
          </div>
        </Row>
      </div>

      <AddPropertyModal
        propshow={propshow}
        handlepropClose={handlepropClose}
        currentDimension={currentDimension}
        isEditProperty={isEditProperty}
        hierarchyList={hierarchyList}
      />
      <ImportExportModal
        show={importExport.isModal}
        importExportClickClose={importExportClickClose}
        data={
          importExport.whichOneModal == "import"
            ? "Import"
            : "Export"
        }
      >
        {importExport.whichOneModal == "import" ? (
          <ImportModalContent currentDimension={currentDimension} importExportClickClose={importExportClickClose}/>
        ) : (
          <ExportModalContent currentDimension={currentDimension} importExportClickClose={importExportClickClose} />
        )}
      </ImportExportModal>

     {isNodeDelete? <DeletePropertyModal
        show={true}
        handleClose={handleClose}
        heading={"Node"}
        message={"Are you sure, you want to delete the Node?"}
        confirmDelete={confirmDelete}
        isLoading={smallLoader}
      />:'' }
    </>
  );
};

export default SingleDimension;
