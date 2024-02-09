import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';

function Otp() {
  const [ email, setEmail ] = useState("");
  const [ text, setText ] = useState("Get OTP");
  const [ otp, setOtp ] = useState("");
  const [ reload, setReload ] = useState(false);
  
  const renderOtp = () => {
    if(text === 'Verify Otp'){
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

  useEffect(() => {
  }, [text]);
  const sendOtp = () => {
    if(text === 'Get OTP'){
      axios.get('https://chorusserver.vercel.app/otp', {
        headers: {
          email: email
        }
      }).then((response) => {
        if(response.data.message === 'Otp is send'){
          setText("Verify Otp");
        }
        else{
          // { // { alert(response.data.message);
        }
      }).catch((eror) => {
        // { // { alert(eror.message);
      });
    }
    else{
      axios.post('https://chorusserver.vercel.app/otp', {
        email: email,
        otp: otp
      }).then((response) => {
        if(response.data.message === 'Otp Verified'){
          // localStorage.setItem('chem', email);
          window.open(`https://chorusclient.vercel.app/sign?email=${email}`, "_self");
        }
        else{
          // { // { // { alert('Invalid otp');
        }
      }).catch((eror) => {
        // { // { alert(eror.message);
      })
    }
  }
  return (
    <div className='container mt-5'>
      <div className='row d-flex justify-content-center mt-5'>
        <div className='col-10 col-md-2 d-flex align-items-center'></div>
        <div className='col-10 col-md-9 d-flex align-items-center'>
          <Card className='shadow-lg'>
            <CardHeader>
              <CardTitle>
                <h3>OTP</h3>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className='row d-flex justify-content-center'>
                <div className='col-12 d-flex align-items-center'>
                  <Form>
                    <FormGroup>
                      <div className='row d-flex justify-content-center'>
                        <div className='col-10 col-md-4 d-flex align-items-center'>
                          <Label>
                            <h5>Email : </h5>
                          </Label>
                        </div>
                        <div className='col-10 col-md-8 d-flex align-items-center'>
                          <Input placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      {renderOtp()}
                    </FormGroup>
                    <FormGroup>
                      <div className='row d-flex justify-content-center'>
                        <div className='col-10 col-md-6 d-flex align-items-center'>
                          <Button className='btn btn-success' onClick={() => {
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