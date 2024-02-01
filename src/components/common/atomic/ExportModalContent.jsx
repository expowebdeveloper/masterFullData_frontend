import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import MdButton from './MdButton';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { addExportData, getHierarchy } from '../../../store/slices/dimensionsSlice';

const animatedComponents = makeAnimated();

const ExportModalContent = ({currentDimension,importExportClickClose}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty, isValid, isSubmitting },
      } = useForm({});
      const dispatch = useDispatch();
      const [dropdownSelectedFields, setDropdownSelectedFields] = useState([]);
      const {listProperties, smallLoader } =
      useSelector((state) => state.dimensionData);

      let labelValueList = listProperties.map((item) => {
        return { label: item.name, value: item.name };
      });
    console.log(dropdownSelectedFields,"dropdownSelectedFields")

      const onSubmit=(data)=>{
        let newArr=dropdownSelectedFields.map((item)=>{ return item.label})
       let newData= {
          "dimension":currentDimension,
          "properties": newArr,
          "delimiter": ",",
          "output_format":data.output_format
        }

        dispatch(addExportData(newData,()=>{
          importExportClickClose()
          dispatch(getHierarchy(currentDimension))
  
       }))
      }

  return (
    <>
     <form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Row>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label>Properties</Form.Label>
                    <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={labelValueList}
              value={dropdownSelectedFields}
              onChange={(selectedOption, action) => {
                setDropdownSelectedFields(selectedOption);
              }}
            />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Label>Type of output Format</Form.Label>
                    <select className="common-field" 
                    {...register("output_format", { required: true,message: "Type is required"})}
                    >
                    <option disabled>Select Type</option>
                    <option>JSON</option>
                    <option>CSV</option>
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
              </Row>
             
              <div className='text-center'>
              <MdButton text="Export" isLoading={smallLoader} />
              </div>
            </form>
    </>
  )
}

export default ExportModalContent