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
  getPropertyNode,
  moveNode,
  renameNode,
} from "../../../store/slices/dimensionsSlice";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";


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
  const { hierarchyList } = useSelector((state) => state.dimensionData);
  const newData = flatTreeObjToNodeModel(hierarchyList, 0, currentDimension);
  console.log(currentDimension, "currentDimension");
  const [treeData, setTreeData] = useState(newData);
  
  useEffect(() => {
    dispatch(getHierarchy(currentDimension));
  }, []);


  console.log(newData, "newData");

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
        <div className="col-md-9">
            <div className="heading p-3"><h2 className="text-center m-0">Test 01 Dimension</h2></div>
            <div className="uploadFileCSV">
              <Form.Control type="file" placeholder="Enter First Name" />
              <b>Upload CSV or JSON File</b>
            </div>
            <div className="propertyListing p-4 mt-4">
              <Button variant="primary" onClick={handlepropShow} className="PropertyBtn">
                Add Property
              </Button>
              <Button variant="primary" onClick={handleShow} className="ms-2">
                Delete Popup
              </Button>
              <Form className="mt-4">
                <Row>
                  <Col md>
                    <Form.Group className="mb-3" controlId="formBasicFName">
                      <Form.Label>First Name</Form.Label>
                      <input type="text" className="common-field" name="name" placeholder=""/>
                    </Form.Group>
                  </Col>
                  <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                      <Form.Label>Last Name</Form.Label>
                      <input type="text" className="common-field" name="name" placeholder=""/>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md>
                    <Form.Group className="mb-3" controlId="formBasicpropertytype">
                      <Form.Label>Property Type</Form.Label>
                      <select className="d-block">
                        <option>Property Type 1</option>
                        <option>Property Type 1</option>
                        <option>Property Type 1</option>
                      </select>
                    </Form.Group>
                  </Col>
                  <Col md>
                    <Form.Group className="mb-3" controlId="formBasiczipcode">
                      <Form.Label>Zip Code</Form.Label>
                      <input type="text" className="common-field" name="name" placeholder=""/>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md>
                    <Form.Group className="mb-3" controlId="formBasicFName">
                      <Form.Label>Calculated Field</Form.Label>
                      <input type="text" className="common-field" name="name" placeholder=""/>
                    </Form.Group>
                  </Col>
                  <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                      <Form.Label>Member</Form.Label>
                      <input type="text" className="common-field" name="name" placeholder=""/>
                    </Form.Group>
                  </Col>
                </Row>
                {/* <Button variant="primary" type="submit">
                  Submit
                </Button> */}
              </Form>
            </div>
          </div>
      </Row>
    </div>
    <Modal show={show} className="deleteModal" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Node</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to delete the node?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Delete Node
          </Button>
        </Modal.Footer>
    </Modal>

    <Modal show={propshow} className="addProperty" onHide={handlepropClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form className="mt-4">
              <Row>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Label>Name</Form.Label>
                    <input type="text" className="common-field" name="name"/>
                  </Form.Group>
                </Col>
                <Col md>
                <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label>Type</Form.Label>
                    <input type="text" className="common-field" name="name"/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Label>Data Type</Form.Label>
                    <input type="text" className="common-field" name="name"/>
                  </Form.Group>
                </Col>
                <Col md>
                <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label>Default Values</Form.Label>
                    <input type="text" className="common-field" name="name"/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Label>Valid Values</Form.Label>
                    <input type="text" className="common-field" name="name"/>
                  </Form.Group>
                </Col>
                <Col md>
                <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label>Values</Form.Label>
                    <input type="text" className="common-field" name="name"/>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlepropClose}>
          Add Property
          </Button>
        </Modal.Footer>
    </Modal>

      
    </>
  );
};

export default SingleDimension;
