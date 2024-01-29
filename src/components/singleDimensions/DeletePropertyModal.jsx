import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const DeletePropertyModal = ({show,handleClose}) => {
  return (
    <>
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
  )
}

export default DeletePropertyModal