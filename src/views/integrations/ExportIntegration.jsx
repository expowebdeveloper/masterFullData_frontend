import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup, Container, Form, Button, Row, Col, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { BiImport } from "react-icons/bi";
import { getAllExportList, AddExportConnection, RunExportConnection } from '../../store/slices/exportConnectionSlice';
import { toast } from 'react-toastify';
import makeAnimated from "react-select/animated";
import { getAllDimensionsList, getPropertyList } from '../../store/slices/dimensionsSlice';

import Select from "react-select";
import { getAllImportList, AddImportConnection, RunimportConnection } from '../../store/slices/importConnectionSlice';


const StyledContainer = styled(Container)`
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const animatedComponents = makeAnimated();
const ExportIntegration = ({ closeModal }) => {
  const connectionIdCurrent = window.location.pathname.split('/').pop();
  const dispatch = useDispatch();
  const { importConnections, loading, mainLoading, errorMessage } = useSelector((state) => state.importConnectionData);
  const { dimensionsList, smallLoader , listProperties} = useSelector((state) => state.dimensionData);

  useEffect(() => {
    dispatch(getAllImportList(connectionIdCurrent));
    if (dimensionsList.length === 0) {
      dispatch(getAllDimensionsList());
    }
    
  }, [dispatch, connectionIdCurrent]);

  const [filename, setFilename] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobName, setJobName] = useState('');
  const [loadingButton, setLoadingButton] = useState(null); // Track the loading button
  const [refreshJobName, setRefreshJobName] = useState('');
  const [selectedDimension, setSelectedDimension] = useState('');
  
  const [dropdownSelectedFields, setDropdownSelectedFields] = useState([]);
  let labelValueList = listProperties.map((item) => {
    return { label: item.name, value: item.name };
  })


  useEffect(() => {
    
  }, []);

  useEffect(() =>{
    if (selectedDimension){
      dispatch(getPropertyList(selectedDimension));
    }
  }, [selectedDimension])


  const handleDimensionChange = (e) => {
    setSelectedDimension(e.target.value)
  };

  const handleBlur = useCallback(() => {
    if (!filename.endsWith('.zip')) {
      setFilename((prev) => prev + '.zip');
    }
  }, []);

  const handleChange = useCallback((e) => {
    const value = e.target.value.replace(/\./g, ''); // Remove periods
    setFilename(value);
  }, []);

  const handleFocus = useCallback(() => {
    if (filename.endsWith('.zip')) {
      setFilename((prev) => prev.slice(0, -4));
    }
  }, [filename]);

  const handleJobTypeChange = useCallback((e) => {
    setJobType(e.target.value);
  }, []);

  const handleJobNameChange = useCallback((e) => {
    setJobName(e.target.value);
  }, []);

  const onSaveClick = () => {
    if (!jobName || !filename || !selectedDimension || !refreshJobName )  {
      toast('All fields are required.');
      return;
    }

    const data = {
      "jobType": jobType,
      "jobName": jobName,
      "Filename": filename,
      "connection_id": connectionIdCurrent,
      "dimension" : selectedDimension,
      "properties": dropdownSelectedFields.map((item) => item.value),
      "delimiter": ",",
      "output_format": "CSV",
      "refreshJobName": refreshJobName,
      "refreshJobType": 'CUBE_REFRESH',

    };
    console.log("data", data)
    dispatch(AddImportConnection(data, mainLoading));
  };

  const onRunClick = useCallback((item) => {
    if (item.Status === 'Completed') {
      toast('This item has already been exported.');
      return;
    }
    setLoadingButton(item._is); // Set the loading button
    dispatch(RunimportConnection(item, mainLoading)).finally(() => {
      setLoadingButton(null); // Reset the loading button
    });
  }, [dispatch, mainLoading]);
 
  if(errorMessage){
    toast("Something went wrong Please check credentials")
  }
  const ImportTooltip = (e) => (
    <Tooltip id="ImportTooltip">{e}</Tooltip>
  )
  console.log("importConnections", importConnections)
  return (
    <section className='main-wrapper dimensions-wrapper'>
      <h3 className='page-name mb-4'>Import Data</h3>
      <StyledContainer fluid>
        <div className="inner-main-wrapper">
          <div className="dimensionTable">
            <h4 className="inner-card-heading mb-3">New Import</h4>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Type</Form.Label>
                    <Form.Control type="text" value="IMPORT_METADATA" disabled onChange={handleJobTypeChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Job Name</Form.Label>
                    <Form.Control type="text" value={jobName} onChange={handleJobNameChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Filename</Form.Label>
                    <Form.Control
                      type="text"
                      name="Filename"
                      value={filename}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Dimension</Form.Label>
                      <Form.Control as="select" value={selectedDimension || ''} onChange={handleDimensionChange}>
                        <option value="" disabled>
                          Select a dimension
                        </option>
                        {dimensionsList.map((dimension) => (
                          <option key={dimension} value={dimension}>
                            {dimension}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
              </Row>
              <Row>
              
                <Col md={12}>
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
              </Row>

              <Row>
                {/* <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cube Refresh Job Type</Form.Label>
                    <Form.Control type="text" value={refreshJobType} onChange={(e) => setRefreshJobType(e.target.value)} />
                  </Form.Group>
                </Col> */}
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cube Refresh Job Name</Form.Label>
                    <Form.Control type="text" value={refreshJobName} onChange={(e) => setRefreshJobName(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <ButtonGroup className="mb-3 d-block text-center">
                <StyledButton variant="primary" className='w-auto d-inline-block' type="button" onClick={onSaveClick} disabled={loading}>
                  {loading ? (
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  ) : 'Save Import'}
                </StyledButton>
              </ButtonGroup>

            </Form>
          </div>
          {mainLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className='dimensionTable mt-3'>
              <h4 className="inner-card-heading mb-3">Listing of Import Connection</h4>
              <Row>
                {importConnections.map((item, index) => (
                  <Col lg={4} key={index}>
                    <div className='property_details mb-2 position-relative'>
                      <div className="heading">
                        <h6 className='mb-0'>Job ID: {item.jobId}</h6>
                      </div>
                      <ul>
                        <li><span>Job Name: </span><b>{item.jobName}</b></li>
                        <li><span>Job Type: </span><b>{item.jobType}</b></li>
                        <li><span>Filename: </span><b>{item.Filename}</b></li>
                        <li><span>Status: </span><b>{item.Status}</b></li>
                      </ul>
                      <OverlayTrigger placement='bottom' overlay={ImportTooltip(item.Status == "Completed" ? 'Already Import' : 'Run Import')}>
                        <ButtonGroup className="export-btn-group">
                          <StyledButton variant="primary" type="button" className='export-btn' onClick={() => onRunClick(item)} disabled={loadingButton === item._id}>
                            {loadingButton === item._id ? (
                              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            ) : <BiImport />}
                          </StyledButton>
                        </ButtonGroup>
                      </OverlayTrigger>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </StyledContainer>
    </section>
  );
};

export default ExportIntegration;
