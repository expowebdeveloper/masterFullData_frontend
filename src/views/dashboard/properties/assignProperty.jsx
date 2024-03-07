import React, { useState } from 'react'
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import MdButton from '../../../components/common/atomic/MdButton';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from 'react-redux';



const animatedComponents = makeAnimated();

const AssignProperty = () => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({});


  const [dropdownSelectedFields, setDropdownSelectedFields] = useState([]);

  const { listProperties, smallLoader } =
    useSelector((state) => state.dimensionData);

  let labelValueList = listProperties.map((item) => {
    return { label: item.name, value: item.name };
  });

  const onSubmit = (data) => {

  };


  return (
    <>
      <section className='main-wrapper dimensions-wrapper'>
        <h3 className='page-name mb-4'>Properties</h3>
        <Container fluid>
          <div className='inner-main-wrapper'>
            <Row className="justify-content-center">
              <Col xxl={10} xl={11}>
                <div className="create-dimension-card mb-4">
                  <h4 className="dimension-head">Assign Property</h4>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Row className="mb-4">
                      <Col lg={6}>
                        <div>
                          <label className="label-form">Property Name</label>
                          <input
                            type="text"
                            className="common-field"
                            name="name"
                            {...register("name", {
                              required: {
                                value: true,
                                message: "Name is required",
                              },
                            })}
                          />
                          <p className="error-message">{errors.name?.message}</p>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div>
                          <label className="label-form">Select Dimensions</label>
                          <Select
                            className="select-dimensions"
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={labelValueList}dropdownSelectedFields
                            value={dropdownSelectedFields}
                            onChange={(selectedOption, action) => {
                              setDropdownSelectedFields(selectedOption);
                            }}
                          />
                          <p className="error-message">{errors.top_node?.message}</p>
                        </div>
                      </Col>
                    </Row>
                    <div className="text-center">
                      <MdButton text="Assign Property" isLoading={false} />
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  )
}

export default AssignProperty