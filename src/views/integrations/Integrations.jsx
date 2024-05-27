import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Modal from 'react-modal';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { getAllConnectionList, AddConnection, deleteConnection, editConnection } from "../../store/slices/integrationSlice";
import ConncetionPropertyModal from "./ConncetionModal";
import DeletePropertyModal from "../../components/singleDimensions/DeletePropertyModal";

Modal.setAppElement('#root'); // For accessibility

const ExportConnections = () => {
  const dispatch = useDispatch();
  const { connections, loading, mainLoading } = useSelector((state) => state.integrationData);

  useEffect(() => {
    dispatch(getAllConnectionList());
  }, [dispatch]);

  useEffect(() => {
    console.log(connections);
  }, [connections]);

  const navigate = useNavigate()

  const gotToExportPage=(connectionId)=>{
      navigate(`/integration/export/${connectionId}`)
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteConnectionID, setDeleteConnectionID] = useState(null);

  const openModal = (item = null, isEdit = false) => {
    if (isEdit) {
      setEditItem(item);
      setEditModal(true);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditItem({});
    setEditModal(false);
  };

  const handleSubmit = async (formData, isEdit = false) => {
    if (isEdit) {
      dispatch(editConnection(formData, closeModal));
    } else {
      dispatch(AddConnection(formData, closeModal));
    }
  };

  const handleDelete = (connectionId) => {
    setDeleteModal(true);
    setDeleteConnectionID(connectionId);
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
    setDeleteConnectionID(null);
  };

  const confirmDelete = () => {
    dispatch(deleteConnection(deleteConnectionID, handleDeleteModalClose));
  };

  return (
    <>
      <section className='main-wrapper dimensions-wrapper'>
        <h3 className='page-name mb-4'>Create Property</h3>
        {mainLoading && (
          <div className="d-flex justify-content-center align-items-center mb-3" >
            <div className="loader">
              <Spinner animation="border" style={{ width: '30px' }} />
            </div>
          </div>
        )}
        <Container fluid>
          <div className="inner-main-wrapper">
            <div className="dimensionTable">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="inner-card-heading mb-0">All Properties</h4>
                <Button onClick={openModal}>Create Connection</Button>
              </div>
              <Row>
                {connections.map((item) => (
                  <Col lg={4} key={item.id}>
                    <div className='property_details mb-2'>
                      <div className="heading">
                        <h6 className='mb-0'>{item.applicationName}</h6>
                        <div className="editionbtn">
                          <a onClick={() => openModal(item, true)} className="edit">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </a>
                          <a onClick={() => handleDelete(item.id)} href="#" className="delete">
                            <FontAwesomeIcon icon={faTrash} />
                          </a>
                        </div>
                      </div>
                      <ul>
                        <li><span>Username : </span><b>{item.username}</b></li>
                        <li><span>URL :  </span><b>{item.url}</b></li>
                        <li><span>Metadata Job Name :  </span><b>{item.importMetadataJobName}</b></li>
                      </ul>
                      <div className="belowButtons">
                        <button>Import</button>
                        <button onClick={()=>gotToExportPage(item.id)}>Export</button>
                      </div>
                    </div>
                    
                  </Col>
                  
                ))}
              </Row>
            </div>
          </div>
        </Container>
      </section>
      <ConncetionPropertyModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        handleSubmit={handleSubmit}
        editItem={editItem}
        isEdit={editModal}
        loading={loading}
      />
      <DeletePropertyModal
        show={deleteModal}
        handleClose={handleDeleteModalClose}
        heading={"Connection"}
        message={"Are you sure, you want to delete the Connection?"}
        confirmDelete={confirmDelete}
        isLoading={loading}
        btnText={"Delete Connection"}
      />
      {/* <Modal
        isOpen={showExportModal}
        onRequestClose={toggleExportModal}
        contentLabel="Export Modal"
        style={customStyles}
      >
        <Export closeModal={toggleExportModal} />
      </Modal> */}
    </>
  );
};

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Adjusted width to make it responsive
    maxWidth: '600px', // Max width to ensure it's not too wide
    padding: '20px', // Added padding for better spacing
  },
};

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

export default ExportConnections;
