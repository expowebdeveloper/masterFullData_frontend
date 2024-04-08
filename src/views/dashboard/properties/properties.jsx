import { Container, Col, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import SmallSpinner from "../../../components/common/atomic/SmallSpinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import eye from '../../../assets/img/eye.png';
import { getAllPropertyList, getPropertyDetails } from "../../../store/slices/propertySlice";
import { useEffect, useState } from "react";
import AddPropertyModal from "../../../components/singleDimensions/AddPropertyModal";



const Spinner = () => (
  <div style={{
    border: "4px solid rgba(0, 0, 0, .1)",
    width: "23px",
    height: "23px",
    borderRadius: "50%",
    borderLeftColor: "blue",
    animation: "spin 1s linear infinite",
  }}></div>
);


const Properties = () => {

  const [createPropertyModal, setCreatePropertyModal] = useState(false);
  const [editRowIndex, seteditRowIndex] = useState(null);
  const [isEditProperty, setisEditProperty] = useState({});

  const { propertiesList, propertyDetails, loading, editBtnloading } = useSelector((state) => state.propertyData);
  const navigate=useNavigate() 
  const dispatch = useDispatch()


  const editPrpperty = (item, index) => {
    seteditRowIndex(index)
    console.log(item)
    
    dispatch(getPropertyDetails(item.property_name, (data) =>{
      console.log(propertyDetails,'7777777777777777777777777')
      
      setisEditProperty(
        {
          isEdit: true,
          name: {...data}
        }
      )
    }))
  }

  useEffect(() => {
    if (isEditProperty.isEdit) {
      console.log(isEditProperty,'================================================================')
      setCreatePropertyModal(true)
    }
  }, [isEditProperty]);

  const assignProperty = (property_name) => {
    navigate(`/properties/assign-properties/${property_name}`)
  }

  useEffect(() =>{
    dispatch(getAllPropertyList(true))
  },[])


  const handlepropClose = () =>{
    setCreatePropertyModal(false)
  }


  return (
    <>
      <section className='main-wrapper dimensions-wrapper'>
        <h3 className='page-name mb-4'>Properties</h3>
        <Container fluid>
          <div className='inner-main-wrapper'>
            <div className="dimensionTable">
              <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">All Properties</h4>
                  <button className="add-property-btn" onClick={() => setCreatePropertyModal(true)}>Create Property</button>
              </div>
              {loading ?
                <div className="text-center"><SmallSpinner /></div>
                : <Table hover>
                  <thead>
                    <tr>
                      <th>Property Name</th>
                      <th>Assign Dimension</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertiesList.length > 0 && propertiesList?.map((item, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{item.property_name}</td>
                            <td>
                              {item.dimensions && item.dimensions.length > 0 ? (
                                item.dimensions.map((property, index) => (
                                  <span key={index+5} className="badge badge-success assign-dimension">{property}</span>
                                ))
                              ) : (
                                <span key={index+2} className="badge badge-secondary no-dimension">Not Assigned</span>
                              )}
                            </td>
                            <td className='d-flex'>
                              <span>
                                <div className='property-action-span edit me-4' onClick={() => editPrpperty(item, index)}>
                                  {editBtnloading && editRowIndex === index ? <Spinner /> : 'Edit'}
                                </div>
                              </span>
                              <span>
                                <div className='property-action-span assign' onClick={() => assignProperty(item.property_name)} >Assign</div>
                              </span>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    {propertiesList.length == 0 && (
                      <p>No</p>
                    )}
                  </tbody>
                </Table>}
            </div>
          </div>
        </Container>
      </section>

      <AddPropertyModal
      propshow={createPropertyModal}
      handlepropClose={handlepropClose}
      isEditProperty={isEditProperty}
      addPropertyOnly={true}
      />
    </>
  );
};

export default Properties;
