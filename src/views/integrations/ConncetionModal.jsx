import React, { useEffect, useState } from 'react'
import styled , { keyframes }from 'styled-components';

import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility



const ConncetionPropertyModal = ({ handleSubmit, modalIsOpen,closeModal, isEdit, editItem, loading }) => {

    const initial = {
        id: 1,
        email: 'asklndlkansd',
        password: '',
        url: '',
        applicationName: '',
        importMetadataJobName: '',
        apiVersion: 'v3',
        cubeRefreshJobName: '',
        ConnectionName: '',
        Description: '',
        ConnectionType: '',
        username: ''
    }

    const [formData, setFormData] = useState(initial);


    const handlFormeSubmit = (e) =>{
        e.preventDefault();
        handleSubmit(formData, isEdit)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

    useEffect(() =>{
        setFormData(isEdit ? editItem : initial)
    },[editItem])


    return (
        <>
            <MainWrapper>
                <Content>
                </Content>
                <StyledModal className='createProperty'
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                >
                    <ModalTitle>Enter Details</ModalTitle>
                    <Form onSubmit={handlFormeSubmit}>
                        <FormField className="primary">
                            <Label>Connection name:</Label>
                            <Input
                                type="text"
                                name="ConnectionName"
                                value={formData.ConnectionName}
                                onChange={handleChange}
                                required
                            />
                        </FormField>
                        <FormField className="primary">
                            <Label>Description:</Label>
                            <Input
                                type="text"
                                name="Description"
                                value={formData.Description}
                                onChange={handleChange}
                                required
                            />
                        </FormField>
                        <FormField className="primary">
                            <Label>Connection Type:</Label>
                            <Input
                                type="text"
                                name="ConnectionType"
                                value={formData.ConnectionType}
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
                            <Label>API Version (default v3):</Label>
                            <Input
                                type="text"
                                name="apiVersion"
                                value={formData.apiVersion}
                                onChange={handleChange}
                                required
                            />
                        </FormField>
                        <FormField className="primary">
                            <Label>Username:</Label>
                            <Input
                                type="text"
                                name="username"
                                value={formData.username}
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
                            <Label>Import Metadata Job Name:</Label>
                            <Input
                                type="text"
                                name="importMetadataJobName"
                                value={formData.importMetadataJobName}
                                onChange={handleChange}
                                required
                            />
                        </FormField>
                        {/* <FormField className="secondary"> */}
                        <FormField className="primary">
                            <Label>Cube Refresh Job Name:</Label>
                            <Input
                                type="text"
                                name="cubeRefreshJobName"
                                value={formData.cubeRefreshJobName}
                                onChange={handleChange}
                                required
                            />
                        </FormField>
                        <ButtonGroup className="buttons">
                            {loading === true ? (
                                <SubmitButtonSpinn type="submit">{isEdit === true ? "Update" : "Create"} </SubmitButtonSpinn>
                            ):(
                                <SubmitButton type="submit">{isEdit === true ? "Update" : "Create"}</SubmitButton>
                            )}
                            <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                        </ButtonGroup>
                    </Form>
                </StyledModal>

            </MainWrapper>
        </>
    )
}

export default ConncetionPropertyModal;


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

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;


const SubmitButtonSpinn = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #218838;
  }

  &.loading {
    cursor: wait;
    color: transparent;

    &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      margin-top: -10px;
      margin-left: -10px;
      border: 2px solid rgba(255, 255, 255, 0.6);
      border-top-color: #fff;
      border-radius: 50%;
      animation: ${spinner} 0.6s linear infinite;
    }
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
