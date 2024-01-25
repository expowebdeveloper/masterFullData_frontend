import React from 'react'
import MdButton from '../common/atomic/MdButton'
import { Col, Row,Form,Button } from 'react-bootstrap'

const AddProperty = () => {
  return (
    <>
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
    </>
  )
}

export default AddProperty