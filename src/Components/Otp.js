import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

function Otp() {
  const [ email, setEmail ] = useState("");
  const [ text, setText ] = useState("Get OTP");
  const [ otp, setOtp ] = useState("");
  
  const renderOtp = () => {
    if(text === 'Verify OTP'){
      return(
        <div className='row d-flex justify-content-center'>
          <div className='col-10 col-md-3 d-flex align-items-center'>
            <Label>
              <h4>Otp : </h4>
            </Label>
          </div>
          <div className='col-10 col-md-9 d-flex align-items-center'>
            <Input placeholder='Enter the otp sent at your mail' onChange={(e) => setOtp(e.target.value)} />
          </div>
        </div>
      );
    }
    else{
      return(
        <div></div>
      );
    }
  }

  const sendOtp = () => {
    if(text === 'Get OTP'){
      axios.post('http://localhost:3001/otp', {
        email: email
      }).then((response) => {
        if(response.data.message === 'Otp is send'){
          setText("Verify Otp");
        }
        else{
          alert(response.data.message);
        }
      }).catch((eror) => {
        alert(eror.message);
      });
    }
    else{
      axios.post('http://localhost:3001/otp/verify', {
        email: email,
        otpNum: otp
      }).then((response) => {
        if(response.data.message === 'Otp Verified'){
          localStorage.setItem('chem', email);
          window.open("http://localhost:3000/", "_self");
        }
        else{
          alert('Invalid otp');
        }
      }).catch((eror) => {
        alert(eror.message);
      })
    }
  }
  return (
    <div className='container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-10 col-md-6 d-flex align-items-center'>
          <Card>
            <CardHeader>
              <CardTitle>
                <h3>OTP</h3>
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
                      {renderOtp()}
                    </FormGroup>
                    <FormGroup>
                      <div className='row d-flex justify-content-center'>
                        <div className='col-10 col-md-6 d-flex align-items-center'>
                          <Button onClick={() => {
                            sendOtp();
                          }}>{text}</Button>
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

export default Otp