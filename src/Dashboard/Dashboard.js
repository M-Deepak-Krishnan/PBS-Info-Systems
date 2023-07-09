import React from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import clerkChart from './clerkChart.json'
import { Chart, registerables } from 'chart.js';
import { Card, Row, Col, CardBody } from 'reactstrap'
import './Dashboard.css'

function Dashboard() {

  const label = []
  const credit = []
  const debit = []
  clerkChart.forEach(data => {
    label.push(data.name)
    credit.push(data.credit)
    debit.push(data.debit)
  })

  Chart.register(...registerables);

  const BarAndLineChart = {
    labels: label,
    datasets: [
      {
        label: 'Credit',
        backgroundColor: '#20a8d8',
        borderColor: '#1985ac',
        borderWidth: 1,
        fill: false,
        hoverBackgroundColor: '#1985ac',
        data: credit,
      },
      {
        label: 'Debit',
        backgroundColor: '#F86C6B',
        borderColor: '#f64846',
        borderWidth: 1,
        fill: false,
        hoverBackgroundColor: '#f64846',
        data: debit,
      }
    ]
  }

  const PieAndDoughnut = {
    labels: ["Credit", "Debit"],
    datasets: [
      {
        data: [
          credit.reduce((a, b) => a + b, 0),
          debit.reduce((a, b) => a + b, 0)
        ],
        backgroundColor: [
          '#20a8d8',
          '#f86c6b'
        ],
        hoverBackgroundColor: [
          '#1985ac',
          '#f64846'
        ],
      }
    ]
  }

  return (
    <React.Fragment>
      <Row style={{ margin: "10px" }}>
        <Col md="3" className='column-spacing'>
          <Card>
            <CardBody>
              <Bar
                data={BarAndLineChart}
              />
            </CardBody>
          </Card>
        </Col>

        <Col md="3" className='column-spacing'>
          <Card>
            <CardBody>
              <Line
                data={BarAndLineChart}
              />
            </CardBody>
          </Card>
        </Col>

        <Col md="3" className='column-spacing'>
          <Card>
            <CardBody>
              <Pie
                data={PieAndDoughnut}
              />
            </CardBody>
          </Card>
        </Col>

        <Col md="3" className='column-spacing'>
          <Card>
            <CardBody>
              <Doughnut
                data={PieAndDoughnut}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment >
  );
}
export default Dashboard;