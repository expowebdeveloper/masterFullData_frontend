import { Container, Col, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import SmallSpinner from "../../../components/common/atomic/SmallSpinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import eye from '../../../assets/img/eye.png';


const Properties = () => {
  const { propertiesList, loading } = useSelector((state) => state.propertyData);
  const navigate=useNavigate() 


  const editDimension = (item) => {

  }

  const assignProperty = (item) => {
    navigate('/properties/assign-properties/823372dda127ws1226gde6e2')
  }


  return (
    <>
      <section className='main-wrapper dimensions-wrapper'>
        <h3 className='page-name mb-4'>Properties</h3>
        <Container fluid>
          <div className='inner-main-wrapper'>
            <div className="dimensionTable">
              <div className="d-flex justify-content-between align-items-center">
                  <h4 className="">All Properties</h4>
                  <button className="add-property-btn">Create Property</button>
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
                    {propertiesList?.map((item, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.name}</td>
                            <td className='d-flex'>
                              <span>
                                <div className='property-action-span edit me-4' onClick={() => editDimension(item)}>Edit</div>
                              </span>
                              <span>
                                <div className='property-action-span assign' onClick={() => assignProperty()} >Assign</div>
                              </span>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    {propertiesList.length == 0 && (
                      <hi>No</hi>
                    )}
                  </tbody>
                </Table>}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Properties;
