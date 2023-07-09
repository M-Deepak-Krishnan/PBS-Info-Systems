import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, NavItem, NavLink, Row, Button, Col } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Main from '../Main/Main';
import './NavPage.css'
import {CapsFirstLetter} from '../utils/customUtils'

function NavPage(props) {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState("dashboard")
  const LoggedInDetails = JSON.parse(sessionStorage.getItem("loggedIn"))

  const handleLogout = (e) => {
    navigate('/')
    sessionStorage.removeItem("loggedIn")
  }

  return (
    <React.Fragment>
      <Row>
        <Col md="6"  sm="12" xs="12">
          <Nav tabs className='navigation-Tabs'>
            <NavItem>
              <NavLink
                active={activePage === 'dashboard'}
                onClick={() => setActivePage('dashboard')}
              >
                <span>Dashboard</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={activePage === 'main'}
                onClick={() => setActivePage('main')}
              >
                <span>Main</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col  md="6" sm="12" xs="12">
          <Button size='sm' style={{ margin: "2px", float: 'right' }} color='primary' onClick={(e) => handleLogout()}>
            Logout
          </Button>
          <h6 style={{ margin: "6px", float: 'right' }}>{CapsFirstLetter(LoggedInDetails.loginId)} - {CapsFirstLetter(LoggedInDetails.type)} </h6>
        </Col>
      </Row>
      <hr style={{margin:"3px"}}/>
      <React.Fragment>
        {(activePage === 'dashboard') && <Dashboard />}
        {(activePage === 'main') && <Main />}
      </React.Fragment>
    </React.Fragment>
  );
}

export default NavPage;