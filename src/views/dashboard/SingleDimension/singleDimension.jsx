import { useEffect, useState } from "react";
import { flatTreeObjToNodeModel } from "../../../treeView/common/utils";
import GTree from "../../../treeView/components/gtree";
import { useDispatch, useSelector } from "react-redux";
import MdButton from "../../../components/common/atomic/MdButton";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { addNode, deleteNode, getHierarchy, moveNode, renameNode } from "../../../store/slices/dimensionsSlice";


const SingleDimension = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [propshow, setpropShow] = useState(false);

  const handlepropClose = () => setpropShow(false);
  const handlepropShow = () => setpropShow(true);
  const dispatch = useDispatch();
  const { hierarchyList } = useSelector((state) => state.dimensionData);
  const inputHierarchy =  [
    {
      "node": {
        "name": "Aviox",
        "dimension": "Aviox"
      },
      "parent": "Aviox",
      "sortOrder": null
    },
    {
      "node": {
        "name": "React",
        "sort": 3,
        "dimension": "Aviox"
      },
      "parent": "Aviox",
      "sortOrder": 3
    },
    {
      "node": {
        "name": "Python",
        "sort": 1.5,
        "dimension": "Aviox"
      },
      "parent": "Aviox",
      "sortOrder": 1.5
    },
    {
      "node": {
        "name": "Pnakaj",
        "sort": 1,
        "dimension": "Aviox"
      },
      "parent": "Aviox",
      "sortOrder": 1
    }
];
  const newData = flatTreeObjToNodeModel(inputHierarchy, 0);
  useEffect(() => {
    dispatch(getHierarchy("College"));
  }, []);

  const onAction = (v) => {
    console.log("onAction", v);
    let data = {};
    switch (v.type) {
      case "add-dir":
        data = {
          parent: v?.source[v.source.length - 2],
          child: v?.text,
          dimension: "College",
          position: 0,
        };
        console.log(data,"hhh")
        dispatch(addNode(data));
        break;

      case "delete-dir":
        data = {
          name: v.source[v.source.length-1],
          dimension: "College",
        };
        dispatch(deleteNode(data));
        break;

      case "mv":
        if(v.source.length===v.target.length&&v.source[v.source.length-1]!==v.target[v.target.length-1]){
          data = 
            {
              "old_name": v.source[v.source.length-1],
              "new_name": v.target[v.target.length-1],
              "dimension": "College"
            
          };
          dispatch(renameNode(data))
        }else{
          data = {
            node_name: v.source[v.source.length - 1],
            old_parent: v.source[v.source.length - 2],
            new_parent: v.target[v.target.length - 1],
            dimension: "College",
            position: 0,
          };
          console.log(data,"nnew")
          dispatch(moveNode(data))
        }
        
        break;

      default:
        break;
    }

    console.log(data, "data");
  };
  

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

      
    </>
  );
};

export default SingleDimension;
