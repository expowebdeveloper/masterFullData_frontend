import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from '../../../components/Sidebar'
import Navbar from '../../../components/navbar';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getDashboardHomeDetails } from '../../../store/slices/adminDashboardSlice';
import { useDispatch, useSelector } from "react-redux";
import SmallSpinner from '../../../components/common/atomic/SmallSpinner';

Chart.register(...registerables);

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
  const dispatch = useDispatch()
  const { DashboardHome } = useSelector(state => state.adminDashboardData)
  const [chartData, setChartData] = useState({ labels: [], datasets: [] })



  useEffect(() => {
    dispatch(getDashboardHomeDetails())

  }, [])

  useEffect(() => {
    if (DashboardHome && DashboardHome.graphlogs && DashboardHome.graphlogs.length > 0) {
      graphData();
    }
  }, [DashboardHome]);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const graphData = () => {
    let minDate = formatDate(DashboardHome.graphlogs[0].date);
    let maxDate = formatDate(DashboardHome.graphlogs[0].date);

    const usageCounts = DashboardHome.graphlogs.reduce((acc, record) => {
      const date = formatDate(record.date);
      const method = record.request_type;

      // Update min and max dates
      if (date < minDate) minDate = date;
      if (date > maxDate) maxDate = date;

      if (!acc[method]) {
        acc[method] = {};
      }
      if (!acc[method][date]) {
        acc[method][date] = 0;
      }
      acc[method][date]++;

      return acc;
    }, {});

    const startDate = new Date(minDate);
    const endDate = new Date(maxDate);
    const dateLabels = [];

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      dateLabels.push(formatDate(date.toISOString()));
    }

    const datasets = {
      POST: {
        label: 'POST Requests',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',  // Blue
        backgroundColor: 'rgba(54, 162, 235, 0.4)',  // Light blue
        fill: true,
      },
      PUT: {
        label: 'PUT Requests',
        data: [],
        borderColor: 'rgba(255, 206, 86, 1)',  // Yellow
        backgroundColor: 'rgba(255, 206, 86, 0.4)',  // Light yellow
        fill: true,
      },
      DELETE: {
        label: 'DELETE Requests',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',  // Red
        backgroundColor: 'rgba(255, 99, 132, 0.4)',  // Light red
        fill: true,
      }
    };


    dateLabels.forEach(date => {
      datasets.POST.data.push(usageCounts.POST && usageCounts.POST[date] ? usageCounts.POST[date] : 0);
      datasets.PUT.data.push(usageCounts.PUT && usageCounts.PUT[date] ? usageCounts.PUT[date] : 0);
      datasets.DELETE.data.push(usageCounts.DELETE && usageCounts.DELETE[date] ? usageCounts.DELETE[date] : 0);
    });

    let chartDataSet = {
      labels: dateLabels,
      datasets: Object.values(datasets)
    }

    console.log(chartDataSet)

    setChartData(chartDataSet)
  }


  function getTimeDifference(DateTime) {
    const serverDateTime = new Date(DateTime);
    const now = new Date();
    const differenceInSeconds = (now - serverDateTime) / 1000;
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const thresholds = [
      { limit: 60, div: 1, unit: 'second' },
      { limit: 3600, div: 60, unit: 'minute' },
      { limit: 86400, div: 3600, unit: 'hour' },
      { limit: 2592000, div: 86400, unit: 'day' },
      { limit: 31536000, div: 2592000, unit: 'month' },
      { div: 31536000, unit: 'year' },
    ];

    for (const t of thresholds) {
      if (!t.limit || Math.abs(differenceInSeconds) < t.limit) {
        console.log(rtf.format(Math.round(differenceInSeconds / t.div), t.unit))
        let formattedTime = rtf.format(Math.round(differenceInSeconds / t.div), t.unit) + " ago";
        formattedTime = formattedTime.replace(/^in\s+/, "");
        return formattedTime
      }
    }
  }

  const activityString = (item) => {
    if (item.action === "create_dimension") {
      return `Create new dimension named “${item.data?.name}”`
    } else if (item.action === "delete_dimension") {
      return `Deleted “${item.data?.dimension_name}” Dimension`
    }
    else if (item.action === "assign_dimensions") {
      return `Assign “${item.data?.property_name}” Prpperty with “${item.data?.dimension}” dimension`
    }
    else if (item.action === "delete_node") {
      return `Deleted “${item.data?.name}” Node from Test “${item.data?.dimension}”`
    } else if (item.action === "assign_property_value") {
      return `Assign Property on “${item.data?.dimension}” dimension`
    } else if (item.action === "assign_all_properties_to_new_node") {
      return `Assign Properties on “${item.data?.child}” new created dimension`
    } else if (item.action === "add_node") {
      return `Create New “${item.data?.child}” node under “${item.data?.parent}” Parent`
    } else if (item.action === "define_property") {
      return `New “${item.data?.name}” property created on “${item.data?.dimensions[0]}” dimensions`
    } else if (item.action.includes("delete_property")) {
      const queryString = item.action.split('?')[1];
      const params = new URLSearchParams(queryString);
      const propertyName = params.get('property_name');
      const dimension = params.get('dimension');
      return `“${propertyName}” property deleted from “${dimension}” dimensions`
    }
  }




  return (
    <>
      <section className='main-wrapper dashboard-wrapper'>
        <Container fluid>
          <div className='inner-main-wrapper pt-3'>
            <h3 className='welcome-text mb-4'>Welcome Back, <span className='name-login'>{localStorage.getItem("user")}</span></h3>
            <Row className='bottom-space'>
              <Col lg={4}>
                <div className='dashboard-card'>
                  <p className='total-dimensions'>{DashboardHome.dimension}</p>
                  <p className='mb-0'>Dimensions</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card property-card'>
                  <p className='total-dimensions'>{DashboardHome.properties}</p>
                  <p className='mb-0'>Properties</p>
                </div>
              </Col>
              <Col lg={4}>
                <div className='dashboard-card integration-card'>
                  <p className='total-dimensions'>{DashboardHome.integration}</p>
                  <p className='mb-0'>Integrations</p>
                </div>
              </Col>
            </Row>
            <div>
              <Row>
                <Col md={6}>
                  <h3 className='inner-card-heading mb-4'>Analysis</h3>
                  {chartData.datasets.length > 0 ? (
                  <Line data={chartData} options={options} />

                  ):(
                    <div className="text-center"><SmallSpinner /></div>
                  )}
                </Col>
                <Col md={6}>
                  <h3 className='inner-card-heading mb-4'>Recent Activity</h3>
                  <div className='table-responsive activity-table-responsive'>
                    <table className='table activity-table-user'>
                      <thead>
                        <tr>
                          <th className='activity-tablehead'>User</th>
                          <th className='activity-tablehead'>Recent Activity</th>
                          <th className='activity-tablehead'>Activity Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DashboardHome?.logs?.map((item, index) => (
                          <tr key={index}>
                            <td><span className="user-name-text">{item.user_email}</span></td>
                            <td className="px-0"><span className={`dash-activity-text inner-activity-text ${item.request_type === "POST" ? "create-text" : item.request_type === "PUT" ? "update-text" : item.request_type === "DELETE" ? "delete-text" : ""}`}>{activityString(item)}</span>
                            </td>
                            <td><span className={`dash-activity-text inner-activity-text create-text ${item.request_type === "POST" ? "create-text" : item.request_type === "PUT" ? "update-text" : item.request_type === "DELETE" ? "delete-text" : ""}`}>{getTimeDifference(item.date)}</span></td>
                          </tr>
                        ))}

                        {DashboardHome?.logs?.length === 0 && (
                          <div className="text-center"><SmallSpinner /></div>
                        )}
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