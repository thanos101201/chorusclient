import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle } from 'reactstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 

function User() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const [ user, setUser ] = useState({});
    useEffect(() => {
        if(queryParams.get('email') === undefined){
            window.open("https://chorusclient.vercel.app/", "_self");
        }
        axios.get('https://chorusserver.vercel.app/user', {
            headers: {
                email: queryParams.get('email')
            }
        }).then((response) => {
            if(response.data.message === 'User is here'){
                setUser(response.data.data[0]);
                console.log(user);
            }
            else{
                // { alertresponse.data.message);
            }
        }).catch((eror) => {
            // { alerteror.message);
        });
    }, []);

    const renderUser = () => {
        if( user === undefined || user === null || Object.keys(user) === null || Object.keys(user).length === 0){
            // console.log(Object.keys(user).length);
            return(
                <div></div>
            );
        }
        else{
            console.log(user);
            return(
                <Card className='col-12 col-md-6 shadow-lg'>
                    <CardHeader>
                        <CardTitle>
                            <h3>User data</h3>
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-10 col-md-4 d-flex align-items-center'>
                                <h5>Name : </h5>
                            </div>
                            <div className='col-10 col-md-8 d-flex align-items-center'>
                                <h5>{user.name}</h5>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-10 col-md-4 d-flex align-items-center'>
                                <h5>Email : </h5>
                            </div>
                            <div className='col-10 d-flex col-md-8 align-items-center'>
                                <h5>{user.email}</h5>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-10 col-md-4 d-flex align-items-center'>
                                <h5>Points : </h5>
                            </div>
                            <div className='col-10 col-md-8 d-flex align-items-center'>
                                <h5>{user.points}</h5>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-10 col-md-4 d-flex align-items-center'>
                                <Button className='btn btn-success m-1 shadow-lg' onClick={() => {
                                    window.open(`https://chorusclient.vercel.app/question?email=${queryParams.get('email')}`, "_self");
                                }}>
                                    Questions
                                </Button>
                            </div>
                            <div className='col-10 col-md-4 d-flex align-items-center m-1'>
                                <Button onClick={() => {
                                    // localStorage.setItem('chem', "undefined");
                                    window.open("https://chorusclient.vercel.app/", "_self");
                                }} className='btn btn-danger shadow-lg'>
                                    Log Out
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            );
        }
    }
  return (
    <div className='container'>
        <div className='row d-flex justify-content-center mt-5'>
            <div className='col-12 col-md-1 d-flex align-items-center'></div>
                {renderUser()}
        </div>
    </div>
  )
}

export default User