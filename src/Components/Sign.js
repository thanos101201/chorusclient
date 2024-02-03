import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

function Sign() {
  const [ password, setPassword ] = useState("");
  const [ name, setName ] = useState("");

  const handleSign = () => {
    axios.post('http://localhost:3001/user', {
      email: localStorage.getItem('chem'),
      name: name,
      password: password
    }).then((response) => {
      if(response.data.message === 'User added'){
        window.open("http://localhost:3000/", "_self");
      }
      else{
        alert(response.data.message);
      }
    }).catch((eror) => {
      alert(eror.message);
    })
  }

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center mt-5'>
        <div className='col-10 col-md-2 d-flex align-items-center'></div>
        <div className='col-10 col-md-9 d-flex align-items-center'>
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle>
                <h3>Sign In</h3>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className='row d-flex justify-content-center'>
                <div className='col-12 col-md-10 d-flex align-items-center'>
                  <Form>
                    <FormGroup>
                      <div className='row d-flex justify-content-center'>
                        <div className='col-10 col-md-5 d-flex align-items-center'>
                          <Label>
                            <h5>Name : </h5>
                          </Label>
                        </div>
                        <div className='col-10 col-md-7 d-flex align-items-center'>
                          <Input placeholder='Enter your registered email' onChange={(e) => setName(e.target.value)} />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className='row d-flex justify-content-center'>
                        <div className='col-10 col-md-5 d-flex align-items-center'>
                          <Label>
                            <h5>Password : </h5>
                          </Label>
                        </div>
                        <div className='col-10 col-md-7 d-flex align-items-center'>
                          <Input placeholder='Enter your password' type='password' onChange={(e) => setPassword(e.target.value)} />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className='row d-flex justify-content-center'>
                        <div className='col-10 col-md-6 d-flex align-items-center'>
                          <Button className='btn btn-success m-1' onClick={() => {
                            handleSign();
                          }}>Sign In</Button>
                        </div>
                        <div className='col-10 col-md-6 d-flex align-items-center'>
                          <Button className='btn btn-danger m-1' onClick={() => {
                            window.open("http://localhost:3000/login", "_self");
                          }}>Login</Button>
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

export default Sign