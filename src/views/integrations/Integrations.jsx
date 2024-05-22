import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root'); // For accessibility

const ExportConnections = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    url: '',
    applicationName: '',
    importMetadataJobName: '',
    apiVersion: 'v3',
    cubeRefreshJobName: ''
  });
  const [submittedData, setSubmittedData] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    closeModal();
  };

  return (
    <>
    <section className='main-wrapper dimensions-wrapper'>
        <h3 className='page-name mb-4'>Create Property</h3>
        <Container fluid>
          <div className="inner-main-wrapper">
            <div className="dimensionTable">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="inner-card-heading mb-0">All Properties</h4>
                <Button onClick={openModal}>Create Connection</Button>
              </div>
              <Row>
                <Col lg={4}>
                  <div className='property_details mb-2'>
                      <h6 className='mb-0'>Application Name</h6>
                      <ul>
                        <li>Email Id : <span>dummy@dummy.com</span></li>
                        <li>URL : <span>www.dummy.com</span></li>
                        <li>Metadata Job Name : <span>Dummy</span></li>
                      </ul>
                      <div className="editionbtn">
                          <a href="#"></a>
                          <a href="#"></a>
                      </div>
                  </div>
                </Col>
                <Col lg={4}>
                <div className='property_details mb-2'>
                      <h6 className='mb-0'>Application Name</h6>
                      <ul>
                        <li>Email Id : <span>dummy@dummy.com</span></li>
                        <li>URL : <span>www.dummy.com</span></li>
                        <li>Metadata Job Name : <span>Dummy</span></li>
                      </ul>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className='property_details mb-2'>
                      <h6 className='mb-0'>Application Name</h6>
                      <ul>
                        <li>Email Id : <span>dummy@dummy.com</span></li>
                        <li>URL : <span>www.dummy.com</span></li>
                        <li>Metadata Job Name : <span>Dummy</span></li>
                      </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
    </section>
    <MainWrapper>
      <Content>
        {/* <Button onClick={openModal}>Create Connection</Button> */}
      </Content>
      <StyledModal className='createProperty'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <ModalTitle>Enter Details</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <FormField className="primary">
            <Label>Email:</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField className="primary">
            <Label>Password:</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField className="primary">
            <Label>URL:</Label>
            <Input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField className="primary">
            <Label>Application Name:</Label>
            <Input
              type="text"
              name="applicationName"
              value={formData.applicationName}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField className="primary">
            <Label>Import Metadata Job Name:</Label>
            <Input
              type="text"
              name="importMetadataJobName"
              value={formData.importMetadataJobName}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField className="primary">
            <Label>API Version (default v3):</Label>
            <Input
              type="text"
              name="apiVersion"
              value={formData.apiVersion}
              onChange={handleChange}
              required
            />
          </FormField>
          <FormField className="secondary">
            <Label>Cube Refresh Job Name:</Label>
            <Input
              type="text"
              name="cubeRefreshJobName"
              value={formData.cubeRefreshJobName}
              onChange={handleChange}
              required
            />
          </FormField>
          <ButtonGroup  className="buttons">
            <SubmitButton type="submit">Submit</SubmitButton>
            <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
          </ButtonGroup>
        </Form>
      </StyledModal>
      {submittedData && (
        <Card>
          <CardTitle>The connection is created successfully</CardTitle>
          <CardContent>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>URL:</strong> {submittedData.url}</p>
            <p><strong>Application Name:</strong> {submittedData.applicationName}</p>
            <p><strong>Import Metadata Job Name:</strong> {submittedData.importMetadataJobName}</p>
            <p><strong>API Version:</strong> {submittedData.apiVersion}</p>
            <p><strong>Cube Refresh Job Name:</strong> {submittedData.cubeRefreshJobName}</p>
          </CardContent>
        </Card>
      )}
    </MainWrapper>
    </>
  );
};

const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c82333;
  }
`;

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  text-align: left;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const CardContent = styled.div`
  font-size: 1rem;
`;

export default ExportConnections;
