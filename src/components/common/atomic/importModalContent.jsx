import React, { useState } from 'react'
import { Col, Form, Row, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import * as Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import MdButton from './MdButton';
import { addImportData, getHierarchy } from '../../../store/slices/dimensionsSlice';


const ImportModalContent = ({currentDimension,importExportClickClose}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty, isValid, isSubmitting },
      } = useForm({});
      const dispatch = useDispatch();
      const {smallLoader}=useSelector(state=>state.dimensionData)

    //   const [csvData,setCsvData]=useState([])

    //   const handleFile = (event) => {
    //     console.log(event,"kkk")
    //     const file = event.target.files[0];
    
    //     if (file) {
    //       // Read the file as text
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         const csvData = reader.result;
    
    //         // Parse CSV data
    //         parseCSV(csvData);
    //       };
    
    //       reader.readAsText(file);
    //     }
    //   };

    //  const parseCSV = (csvData) => {
    //     // Use Papaparse for CSV parsing
    //     Papa.parse(csvData, {
    //       header: true,
    //       dynamicTyping: true,
    //       complete: (results) => {
    //         // Display only the first two rows of parsed data
    //         console.log(results,"resi")
    //         setCsvData(results.data)
    //       },
    //     });
    //   };

    const onSubmit=(data)=>{ 
       let newData= {
            "header_row": data.header_row,
            "replace": data.replace,
            "mapping": data.mapping,
            "file": data.file[0],
            "dimension":currentDimension,
            "delimiter":','

        }
        const formData =new FormData()
        
        for(const key in newData){
            formData.append(key,newData[key])
        }
     dispatch(addImportData(formData,()=>{
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
                    <Form.Label>Header Row</Form.Label>
                    <select className="common-field" 
                    {...register("header_row", { required: true,message: "Type is required"})}
                    >
                    <option disabled>Select Header Row</option>
                    <option>True</option>
                    <option>False</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Label>Do you want to replace previous node?</Form.Label>
                    <select className="common-field" 
                    {...register("replace", { required: true,message: "Type is required"})}
                    >
                    <option disabled>Select Replace Value</option>
                    <option>True</option>
                    <option>False</option>
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
               
                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label>Please Enter Value with comma seperator</Form.Label>
                    <input
                      type="text"
                      className="common-field"
                      placeholder='mapping'
                      name="mapping"
                      {...register("mapping", {
                      })}
                    />
                  </Form.Group>
                  
                </Col>

                <Col md>
                  <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label>File</Form.Label>
                    <input
                      type="file"
                      className="common-field"
                    //   onChange={handleFile}
                      name="file"
                      {...register("file", {
                      })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Label className='warning-upload-csv'>Note: Please enter the CSV column sequence with comma separation, and both 'Child' and 'Parent' should be in title case. Additionally, ensure that property names match the dimension property names to avoid errors.</Form.Label>

              <div className='text-center'>
              <MdButton text="Import" isLoading={smallLoader} />
              </div>
            </form>
    </>
  )
}

export default ImportModalContent