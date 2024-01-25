import { useEffect, useState } from "react";
import { flatTreeObjToNodeModel } from "../../../treeView/common/utils";
import GTree from "../../../treeView/components/gtree";
import { useDispatch, useSelector } from "react-redux";
import MdButton from "../../../components/common/atomic/MdButton";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addNode, deleteNode, getHierarchy, moveNode, renameNode } from "../../../store/slices/dimensionsSlice";

const SingleDimension = () => {
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
        <div className="col-md-8">
          <div className="text-center" style={{ marginTop: "120px" }}>
            {newData.length > 0 ? (
              <GTree initialData={newData} onAction={onAction} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-md-4">
            <div className="heading p-3"><h2 className="text-center m-0">Test 01 Dimension</h2></div>
            <div className="propertyListing p-4 mt-4">
              <MdButton text="Add Property"/>
              <Form className="mt-4">
                <Row>
                  <Col md>
                    <Form.Group className="mb-3" controlId="formBasicFName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter First Name" />
                    </Form.Group>
                  </Col>
                  <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Last Name" />
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
                      <Form.Control type="number" placeholder="Enter Zip code" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md>
                    <Form.Group className="mb-3" controlId="formBasicFName">
                      <Form.Label>Calculated Field</Form.Label>
                      <Form.Control type="number" placeholder="Enter Calculated Field" />
                    </Form.Group>
                  </Col>
                  <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                      <Form.Label>Member</Form.Label>
                      <Form.Control type="text" placeholder="CFO" />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
      </Row>
    </div>
      

      
    </>
  );
};

export default SingleDimension;
