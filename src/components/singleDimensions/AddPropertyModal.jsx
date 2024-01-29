import React from "react";
import { Modal,Form,Row,Col,Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProperty } from "../../store/slices/dimensionsSlice";


const AddPropertyModal = ({propshow,handlepropClose,currentDimension}) => {
    const dispatch =useDispatch()
    const {register,handleSubmit, formState: { errors ,isDirty,isValid,isSubmitting}}=useForm({});

    const onSubmit=(data)=>{
        console.log(data)
        let propertyData={
            "name": data.name,
            "type": data.type,
            "dimensions": [currentDimension],
            "default_value": data.defaultValues,
            "inherits": true,
            "data_type": data.dataType
          }
          dispatch(addProperty(propertyData))
      }
  return (
    <>
      <Modal show={propshow} className="addProperty" onHide={handlepropClose}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <Modal.Header closeButton>
          <Modal.Title>Add Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mt-4">
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicFName">
                  <Form.Label>Name</Form.Label>
                  <input type="text" className="common-field" name="name"
                   {...register("name",{
                     required:{
                         value:true,
                         message:"Name is required"
                     }
                   })}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicLName">
                  <Form.Label>Type</Form.Label>
                  <input type="text" className="common-field" name="type" 
                    {...register("type",{
                        required:{
                            value:true,
                            message:"Type is required"
                        }
                      })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicFName">
                  <Form.Label>Data Type</Form.Label>
                  <input type="text" className="common-field" name="dataType"
                    {...register("dataType",{
                        required:{
                            value:true,
                            message:"Data Type is required"
                        }
                      })}
                  />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicLName">
                  <Form.Label>Default Values</Form.Label>
                  <input type="text" className="common-field" name="defaultValues"
                    {...register("defaultValues",{
                        required:{
                            value:true,
                            message:"Default Values is required"
                        }
                      })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Add Property
          </Button>
        </Modal.Footer>
        </form>
       
      </Modal>
    </>
  );
};

export default AddPropertyModal;
