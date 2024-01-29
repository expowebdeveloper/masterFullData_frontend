import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const DeletePropertyModal = ({show,handleClose,message,heading,confirmDelete}) => {
  return (
    <>
     <Modal show={show} className="deleteModal" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Delete Node
          </Button>
        </Modal.Footer>
    </Modal> 
    </>
  )
}

export default DeletePropertyModal