import React, { useState, useEffect } from 'react';
import './Login.css'
import loginCredentials from './Login.json'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Button, Form } from 'reactstrap'

function Login() {
  const [credential, setCredential] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const handleGoBack = (e) => {
      e.preventDefault()
      navigate('/')
    }
    window.history.pushState(null, null, window.location.pathname)
    window.addEventListener('popstate', handleGoBack)
    return () => {
      window.removeEventListener('popstate', handleGoBack);
    };
  }, [navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault()
    let loggedInBy = loginCredentials.filter(lc => (lc.loginId === credential.loginId) && (lc.password === credential.password))
    if (loggedInBy.length === 0) {
      toast.error("Invalid Login")
    } else {
      sessionStorage.setItem("loggedIn", JSON.stringify(loggedInBy[0]))
      navigate('nav')
      toast.info("Successfully Logged in...")
    }
  }

  return (
    <div className='layout'>
      <div className="row1"></div>
      <div className="row2-col1"></div>
      <div className="row2-col2">
        <h1 style={{marginTop:'20px'}}>Login</h1>
        <h3>Sign In to your account</h3>

        <Form className="login">

          <Input type="text" placeholder='Login ID' name="username" id="username" onChange={e => setCredential({ ...credential, loginId: e.target.value })} required></Input>
          <Input type="password" placeholder='Password' name="password" id="password" onChange={e => setCredential({ ...credential, password: e.target.value })} required></Input>
          <Button type="submit" name="login" value="Login" color='dark' onClick={(e) => handleOnSubmit(e)}>Login</Button>

        </Form>

      </div>
      <div className="row2-col3">
      </div>
      <div className="row3"></div>
      <ToastContainer position="top-center" hideProgressBar={true} closeOnClick />
    </div>
  )
}

export default Login;