import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/navbar';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(...registerables);
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75, 192, 192, 0.4)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointRadius: 5,
      pointHitRadius: 10,
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: 'rgba(255, 255, 255, 1)',
      pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
const MdDashboard = () => {
  
  return (
    <>
      <section className='main-wrapper dashboard-wrapper'>
        <Container fluid>
          <div className='inner-main-wrapper pt-3'>
            <h3 className='welcome-text mb-4'>Welcome Back, <span className='name-login'>{localStorage.getItem("user")}</span></h3>
            <Row className='mb-5'>
              <Col lg={4}>
                <div className='dashboard-card'>
                    <p className='total-dimensions'>15</p>
                    <p className='mb-0'>Dimensions</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card property-card'>
                    <p className='total-dimensions'>15</p>
                    <p className='mb-0'>Properties</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card integration-card'>
                    <p className='total-dimensions'>15</p>
                    <p className='mb-0'>Integrations</p>
                </div>
              </Col>
            </Row>
            <div>
              <Row>
                  <Col md={6}>
                    <h3 className='inner-card-heading mb-4'>Analysis</h3>
                    <Line data={data} options={options} />
                  </Col>
                  <Col md={6}>
                    <h3 className='inner-card-heading mb-4'>Recent Activity</h3>
                    <div className='table-responsive activity-table-responsive'>
                        <table className='table activity-table-user'>
                          <thead>
                            <tr>
                              <th className='activity-tablehead'>Recent Activity</th>
                              <th className='activity-tablehead'>Activity Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Create new dimension named “Test  1”</span></td>
                              <td><span className='dash-activity-text create-text'>1 minute ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text update-text'>Updated Property 1</span></td>
                              <td><span className='dash-activity-text update-text'>5 minutes ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text delete-text'>Deleted Account Node from Test 2 Dimension</span></td>
                              <td><span className='dash-activity-text delete-text'>10 minutes ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created new node in Test 3 Dimension</span></td>
                              <td><span className='dash-activity-text create-text'>1 hour ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text update-text'>Assigned Property 3 to Test 3 & Test 4 Dimensions</span></td>
                              <td><span className='dash-activity-text update-text'>1 hour ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 4”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                            <tr>
                              <td><span className='dash-activity-text create-text'>Created Dimension named “Test 3”</span></td>
                              <td><span className='dash-activity-text create-text'>2 hours ago</span></td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                  </Col>
              </Row>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

export default MdDashboard