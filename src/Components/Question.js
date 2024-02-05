import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import User from './User';

function Question(props) {

  const [ question, setQuestion ] = useState([]);
  const [ id, setId ] = useState("");
  const [ renderAdd, setRenderAdd ] = useState(false);
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ reload, setReload ] = useState(false);
  const [ queId, setQueId ] = useState("");

  const toggle = (e) => {
    if(e === queId){
      setQueId("");
    }
    else{
      setQueId(e);
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3001/question/all').then((response) => {
      if(response.data.message === 'Questions are here'){
        setQuestion(response.data.data);
        console.log('fetched');
      }
      else{
        alert(response.data.message);
      }
    }).catch((eror) => {
      if(eror.response.status !== 404)
      alert(eror.message);
    });
  }, [reload]);

  const handlePush = () => {
    props.history.push({
      pathname: '/reply',
      state: {
        id: id
      }
    });
  }

  const renderCheckButton = (email, id) => {
    if(email !== localStorage.getItem('chem')){
      return(
        <Button className='btn btn-success' onClick={() => {
          setId(id);
          localStorage.setItem('chrepid', id);
          window.open("http://localhost:3000", "_self");
        }}>Reply</Button>
      );
    }
    else{
      return(
        <Button className='btn btn-danger' onClick={() => {
          axios.post('http://localhost:3001/question/aggreement', {
            questionId: id
          }).then((response) => {
            if(response.data.message === 'Reply is here'){
              setReload(!reload);
            }
            else{
              alert(response.data.message);
            }
          }).catch((eror) => {
            alert(eror.message);
          });
        }}>
          Check Reply
        </Button>
      );
    }
  }

  const renderQuestion = () => {
    if(question.length === 0){
      return(
        <div className='row d-flex justify-content-center mt-5'>
          <div className='col-12 d-flex align-items-center'>
            <h3>No Questions right now</h3>
          </div>
        </div>
      );
    }
    else{
      let i = 0;
      return question.map((e, key) => {
        i = i + 1;
        return(
          <AccordionItem className='col-12' key={key}>
            <AccordionHeader targetId={`${i}`}>
              <h4>{e.title}</h4>
            </AccordionHeader>
            <AccordionBody accordionId={`${i}`}>
              <div className='row d-flex justify-content-center'>
                <div className='col-10 col-md-5 d-flex align-items-center'>
                  <h6>Email :</h6>
                </div>
                <div className='col-10 col-md-7 d-flex align-items-center'>
                  <h6>{e.email}</h6>
                </div>
              </div>
              <div className='row d-flex justify-content-center'>
                <div className='col-10 col-md-5 d-flex align-items-center'>
                  <h6>Description :</h6>
                </div>
                <div className='col-10 col-md-7 d-flex align-items-center'>
                  <h6>{e.description}</h6>
                </div>
              </div>
              <div className='row d-flex justify-content-center'>
                <div className='col-10 col-md-5 d-flex align-items-center'>
                  <h6>Reply :</h6>
                </div>
                <div className='col-10 col-md-7 d-flex align-items-center'>
                  <h6>{e.description}</h6>
                </div>
              </div>
              <div className='row d-flex justify-content-center'>
                <div className='col-10 col-md-5 d-flex align-items-center'>
                  {renderCheckButton(e.email, e._id)}
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>
        );
      })
    }
  }

  const handleAddQuesion = () => {
    axios.post('http://localhost:3001/question', {
      email: localStorage.getItem('chem'),
      title: title,
      description: description
    }).then((response) => {
      if(response.data.message === 'Question added'){
        setRenderAdd(!renderAdd);
        setReload(!reload);
      }
      else{
        alert(response.data.message);
      }
    }).catch((eror) => {
      alert(eror.message);
    });
  }

  const renderAddQuestion = () => {
    if(renderAdd){
      return(
        <div className='row d-flex justify-content-center mt-5'>
          <div className='col-10 col-md-4 d-flex align-items-center'></div>
          <div className='col-10 d-flex align-items-center'>
            <Card className='shadow-lg'>
              <CardHeader>
                <CardTitle>
                  <h4>Add Question</h4>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className='row d-flex justify-content-center'>
                  <div className='col-12 d-flex align-items-center'>
                    <Form>
                      <FormGroup>
                        <div className='row d-flex justify-content-center'>
                          <div className='col-10 col-md-5 d-flex align-items-center'>
                            <Label>
                              <h5>Title : </h5>
                            </Label>
                          </div>
                          <div className='col-10 col-md-7 d-flex align-items-center'>
                            <Input placeholder='Enter your email' onChange={(e) => setTitle(e.target.value)} />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <div className='row d-flex justify-content-center'>
                          <div className='col-10 col-md-5 d-flex align-items-center'>
                            <Label>
                              <h5>Description : </h5>
                            </Label>
                          </div>
                          <div className='col-10 col-md-7 d-flex align-items-center'>
                            <Input placeholder='Enter your password' onChange={(e) => setDescription(e.target.value)} />
                          </div>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <div className='row d-flex justify-content-center'>
                          <div className='col-10 col-md-6 d-flex align-items-center g-3'>
                            <Button className='m-1 btn btn-danger' onClick={() => {
                              handleAddQuesion();
                            }}>Add Question</Button>
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
      );
    }
    else{
      return(
        <div className='row d-flex justify-content-center'>
          <div className='col-12 d-flex align-items-center'></div>
        </div>
      );
    }
  }

  useEffect(() => {
  }, [renderAdd]);
  return (
    <div className='container'>
      <User />
      <div className='row d-flex justify-content-center mt-5'>
        <div className='col-10 col-md-8 d-flex align-items-center'></div>
        <div className='col-10 col-md-4 d-flex align-items-center'>
          <Button className='btn btn-success shadow-lg' onClick={() => {
            setRenderAdd(!renderAdd);
          }}>Add Question</Button>
        </div>
      </div>
      {renderAddQuestion()}
      <div className='row d-flex justify-content-right mt-5'>
        <div className='col-10 col-md-4 d-flex align-items-center'></div>
        <div className='col-10 col-md-4 d-flex align-items-center'>
          <h2>Questions</h2>
        </div>
        <div className='col-10 col-md-4 d-flex align-items-center'></div>
      </div>
      <div className='row d-flex justify-content-center mt-2'>
          <Accordion className='col-12 d-flex align-items-center' toggle={toggle} open={queId}>
            {renderQuestion()}
          </Accordion>
      </div>
    </div>
  )
}

export default Question