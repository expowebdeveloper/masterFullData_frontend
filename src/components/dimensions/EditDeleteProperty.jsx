import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import DeletePropertyModal from "../singleDimensions/DeletePropertyModal";
import { useDispatch } from "react-redux";
import { deleteProperty } from "../../store/slices/dimensionsSlice";

const EditDeleteProperty = ({
  listProperties,
  currentDimension,
  handlepropShow,
  setPropertyEdit,
}) => {
  const [show, setShow] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const dispatch = useDispatch();
  const deleteModal = (item) => {
    setShow(true);
    setSelectedProperty(item);
  };
  const handleClose = () => {
    setShow(false);
  };

  const confirmDelete = () => {
    let data = {
      property_name: selectedProperty,
      dimension: currentDimension,
    };
    dispatch(deleteProperty(data));
    setShow(false);
  };
  return (
    <>
      <Container>
        <Row>
          {listProperties.map((item) => {
            return (
              <>
                <Col>
                  <div className="property-edit-delete">
                    {item.label}
                    <div>
                      <span
                        onClick={() => {
                          handlepropShow(),
                          setPropertyEdit(prevState => ({
                            ...prevState,
                            isEdit: true,
                            name:item.label
                          }));
                        }}
                      >
                        {" "}
                        <MdEdit />
                      </span>
                      <span onClick={() => deleteModal(item.label)}>
                        {" "}
                        <MdDelete />
                      </span>
                    </div>
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
      <DeletePropertyModal
        show={show}
        handleClose={handleClose}
        heading={"Property"}
        message={"Are you sure, you want to delete the Property?"}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default EditDeleteProperty;
