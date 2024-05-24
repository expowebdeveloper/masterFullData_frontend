import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup, Container, Form, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const ExportIntegration = ({ closeModal }) => {
  return (
    <section className='main-wrapper dimensions-wrapper'>
      <h3 className='page-name mb-4'>Export Data</h3>
      <StyledContainer fluid>
        <div className="inner-main-wrapper">
          <div className="dimensionTable">
            <h4 className="inner-card-heading mb-3">New Export</h4>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Export Name</Form.Label>
                    <Form.Control type="text" name="Export Name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="Description" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Connection Type</Form.Label>
                    <div className='d-flex align-items-center'>
                      <Form.Select className="me-2">
                        <option disabled>Select Type</option>
                        <option>CmbeDev</option>
                        <option>Download file</option>
                      </Form.Select>
                      {/* <Button variant="primary"><FontAwesomeIcon icon={faDownload} /></Button> */}
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Dimension</Form.Label>
                    <Form.Select>
                      <option disabled>Select Dimension</option>
                      <option>Flex Dimension</option>
                      <option>Organization</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Properties</Form.Label>
                    <Form.Control type="text" name="Properties" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Delimiter</Form.Label>
                    <Form.Control type="text" name="Delimiter" />
                  </Form.Group>
                </Col>
              </Row>
              <ButtonGroup className="mb-3">
                <StyledButton variant="primary" type="submit">Save Export</StyledButton>
                <StyledButton variant="secondary" type="button">Run Export</StyledButton>
                {/* <StyledButton variant="secondary" type="button" onClick={closeModal}>Close</StyledButton> */}
              </ButtonGroup>
            </Form>
          </div>
        </div>
      </StyledContainer>
    </section>
  );
};

export default ExportIntegration;
