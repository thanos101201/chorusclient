import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function Question(props) {

  const [ question, setQuestion ] = useState([]);
  const [ id, setId ] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/question/all').then((response) => {
      if(response.data.message === 'Questions are here'){
        setQuestion(response.data.data);
      }
      else{
        alert(response.data.message);
      }
    }).catch((eror) => {
      alert(eror.message);
    });
  }, []);

  const handlePush = () => {
    props.history.push({
      pathname: '/reply',
      state: {
        id: id
      }
    });
  }
  const renderQuestion = () => {
    if(question.length === 0){
      return(
        <div></div>
      );
    }
    else{
      return question.map((e, key) => {
        return(
          <div className='row d-flex justify-content-center'>
            <div className='col-10 col-md-8 d-flex align-items-center'>
              <h5>{e.title}</h5>
            </div>
            <div className='col-10 col-md-8 d-flex align-items-center'>
              <Button onClick={() => {
                setId(e._id);
                handlePush();
              }}>Check</Button>
            </div>
          </div>
        );
      })
    }
  }
  return (
    <div className='container'>
      {renderQuestion()}
    </div>
  )
}

export default Question