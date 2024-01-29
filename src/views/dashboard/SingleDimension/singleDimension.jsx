import { useEffect, useState } from "react";
import { flatTreeObjToNodeModel } from "../../../treeView/common/utils";
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

const SingleDimension = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [propshow, setpropShow] = useState(false);

  const handlepropClose = () => setpropShow(false);
  const handlepropShow = () => setpropShow(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const currentDimension = location.search.split("=")[1];
  const { hierarchyList, listProperties } = useSelector(
    (state) => state.dimensionData
  );
  const newData = flatTreeObjToNodeModel(hierarchyList, 0, currentDimension);
  console.log(currentDimension, "currentDimension");

  useEffect(() => {
    dispatch(getHierarchy(currentDimension));
    dispatch(getPropertyList(currentDimension));
   
  }, []);

  console.log(listProperties, "listProperties");

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
        dispatch(getPropertyNode(data));

        break;
      default:
        break;
    }
  };

  console.log(hierarchyList, newData, "hierarchyList");
  return (
    <>
      <div className="dimensionSingle">
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
            />
          ) : (
            ""
          )}
        </Row>
      </div>

<<<<<<< HEAD
      
=======
      <AddPropertyModal
        propshow={propshow}
        handlepropClose={handlepropClose}
        currentDimension={currentDimension}
      />

      <p className="text-center">
        No Property Added <span onClick={handlepropShow}>Add Property</span> to
        dimension
      </p>
>>>>>>> e989fbe3c04348ea277e9cb2ba811f9ea9abaea4
    </>
  );
};

export default SingleDimension;
