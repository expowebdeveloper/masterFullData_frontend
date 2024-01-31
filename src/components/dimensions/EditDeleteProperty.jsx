import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import DeletePropertyModal from "../singleDimensions/DeletePropertyModal";
import { useDispatch } from "react-redux";
import { deleteProperty, getPropertyList } from "../../store/slices/dimensionsSlice";

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
    dispatch(deleteProperty(data,()=>{
        dispatch(getPropertyList(currentDimension));
    }));
    setShow(false);
  };
  return (
    <>
      <div className="propertyDetails">
        <Row>
          {listProperties.map((item) => {
            return (
              <>
                <Col>
                  <div className="property-edit-delete">
                    {item.name}
                    <div>
                      <span
                        onClick={() => {
                          handlepropShow(),
                          setPropertyEdit(prevState => ({
                            ...prevState,
                            isEdit: true,
                            name:item
                          }));
                        }}
                      >
                        {" "}
                        <MdEdit />
                      </span>
                      <span onClick={() => deleteModal(item.name)}>
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
      </div>
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
