import React from "react";
import MdButton from "../common/atomic/MdButton";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddProperty = ({ handlepropShow, handleShow }) => {
  const { nodeProperties } = useSelector((state) => state.dimensionData);
  console.log(nodeProperties, "nodeProperties");
  return (
    <div className="col-md-9">
      <div className="heading p-3">
        <h2 className="text-center m-0">Test 01 Dimension</h2>
      </div>
      <div className="uploadFileCSV">
        <Form.Control type="file" placeholder="Enter First Name" />
        <b>Upload CSV or JSON File</b>
      </div>
      <div className="propertyListing p-4 mt-4">
        <Button
          variant="primary"
          onClick={handlepropShow}
          className="PropertyBtn"
        >
          Assign Property
        </Button>
        {/* <Button variant="primary" onClick={handleShow} className="ms-2">
        Delete Popup
      </Button> */}
        {nodeProperties.length>0?<Form className="mt-4">
          {nodeProperties?.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Row>
                  <Col md>
                    <Form.Group className="mb-3" controlId="formBasicFName">
                      <Form.Label>{item.name}</Form.Label>
                      <input
                        type={item.type}
                        className="common-field"
                        name={item.name}
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </React.Fragment>
            );
          })}

          <Button variant="primary" type="submit">
          Submit
        </Button>
        </Form>:""}
      </div>
    </div>
  );
};

export default AddProperty;
