import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
function Login() {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleLogin = () => {
    axios.post('http://localhost:3001/user/login', {
      email: email,
      password: password
    }).then((response) => {
      if(response.data.message === 'User can proceed'){
        localStorage.setItem('chem', email);
        window.open("http://localhost:3000/", "_self");
      }
    }).catch((eror) => {
      alert(eror.message);
    })
  }

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-10 col-md-6 d-flex align-items-center'>
          <Card>
            <CardHeader>
              <CardTitle>
                <h3>Login</h3>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className='row d-flex justify-content-center'>
                <div className='col-12 col-md-8 d-flex align-items-center'>
                  <Form>
                    <FormGroup>
                      <div className='row d-flex justify-content-center'>
                        <div className='col-10 col-md-3 d-flex align-items-center'>
                          <Label>
                            <h4>Email : </h4>
                          </Label>
                        </div>
                        <div className='col-10 col-md-9 d-flex align-items-center'>
                          <Input placeholder='Enter your registered email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className='row d-flex justify-content-center'>
                        <div className='col-10 col-md-3 d-flex align-items-center'>
                          <Label>
                            <h4>Password : </h4>
                          </Label>
                        </div>
                        <div className='col-10 col-md-9 d-flex align-items-center'>
                          <Input placeholder='Enter your password' type='password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className='row d-flex justify-content-center'>
                        <div className='col-10 col-md-6 d-flex align-items-center'>
                          <Button onClick={() => {
                            handleLogin();
                          }}>Login</Button>
                        </div>
                        <div className='col-10 col-md-6 d-flex align-items-center'>
                          <Button onClick={() => {
                            window.open("http://localhost:3000/otp", "_self");
                          }}>Sign In</Button>
                        </div>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login