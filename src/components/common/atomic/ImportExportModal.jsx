import React from "react";
import { Button, Modal } from "react-bootstrap";

const ImportExportModal = ({show, children ,importExportClickClose,data}) => {
  return (
    <>
      <Modal show={show} className="addProperty" onHide={importExportClickClose}>
       
          <Modal.Header closeButton>
            <Modal.Title>{data} Properties</Modal.Title>
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          {/* <Modal.Footer>
            <Button variant="primary" type="submit">
              {data}
            </Button>
          </Modal.Footer> */}
  
      </Modal>
    </>
  );
};

export default ImportExportModal;
