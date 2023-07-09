import React, { useEffect, useState } from 'react';
import loginCredentials from '../Login/Login.json'
import { Card, Row, Col, Input, Button } from 'reactstrap'
import './Main.css'
import { CapsFirstLetter } from '../utils/customUtils'
import { toast, ToastContainer } from 'react-toastify';

function Main() {
  const [customerDetails, setCustomerDetails] = useState([]);

  useEffect(() => {
    let tempCustomerDetails = loginCredentials.filter(customer => customer.type === "customer")
    setCustomerDetails([...tempCustomerDetails])
  }, [])

  const handleOnInputChange = (e, index) => {
    Object.assign(customerDetails[index], { "volatileRupees": parseFloat(e.target.value) })
    setCustomerDetails([...customerDetails])
  }

  const handleOnCredit = index => {
    let currentcustomerDetails = customerDetails[index]
    Object.assign(customerDetails[index], { "holdings": currentcustomerDetails.holdings + (currentcustomerDetails.volatileRupees || 0), "volatileRupees": "" })
    setCustomerDetails([...customerDetails])
  }

  const handleOnDebit = index => {
    let currentcustomerDetails = customerDetails[index]
    if (validateRupees(currentcustomerDetails)) {
      Object.assign(customerDetails[index], { "holdings": currentcustomerDetails.holdings - (currentcustomerDetails.volatileRupees || 0), "volatileRupees": "" })
      setCustomerDetails([...customerDetails])
    } else {
      toast.error("Amount Exceeded")
    }
  }

  function validateRupees(currentcustomerDetails) {
    if (currentcustomerDetails.holdings < currentcustomerDetails.volatileRupees) {
      return false
    } else {
      return true
    }
  }

  return (
    <React.Fragment>
      {customerDetails && customerDetails.map((customer, index) =>
        <Card className='customer-cards' key={customer.loginId + customer.password}>
          <Row>
            <Col md='3' sm='12' xs='12'>
              <h6>{CapsFirstLetter(customer.loginId)}</h6>
            </Col>
            <Col md='3' sm='12' xs='12'>
              <h6>Rs {customer.holdings}</h6>
            </Col>
            <Col md='3' sm='12' xs='12'>
              <Input type='number' name='volatileRupees' value={customerDetails[index].volatileRupees} placeholder='Enter in Rupees' className="m-0" onChange={(e) => handleOnInputChange(e, index)}>
              </Input>
            </Col>
            <Col md='3' sm='12' xs='12'>
              <Button color='success' className='py-0 m-2'
                onClick={e => handleOnCredit(index)}
              >
                Credit
              </Button>
              <Button color='danger' className='py-0 m-2'
                onClick={e => handleOnDebit(index)}
              >
                Debit
              </Button>
            </Col>
          </Row>
        </Card>
      )}
      <ToastContainer position="top-center" hideProgressBar={true} closeOnClick />
    </React.Fragment>
  );
}

export default Main;