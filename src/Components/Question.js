import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import User from './User';
import { useLocation } from 'react-router-dom';

function Question(props) {

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [ question, setQuestion ] = useState([]);
  const [ id, setId ] = useState("");
  const [ renderAdd, setRenderAdd ] = useState(false);
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ reload, setReload ] = useState(false);
  const [ queId, setQueId ] = useState("");
  const [ replyDescription, setReplyDescription ] = useState("");
  const [ reload2, setReload2 ] = useState(false);

  const toggle = (e) => {
    if(e === queId){
      setReplyDescription("");
      setQueId("");
    }
    else{
      setReplyDescription("");
      setQueId(e);
    }
  }

  useEffect(() => {
    if(queryParams.get('email') === undefined){
      console.log(typeof(queryParams.get('email')));
      window.open("https://chorusclient.vercel.app/", "_self");
    }
    axios.get('https://chorusserver.vercel.app/question/all').then((response) => {
      if(response.data.message === 'Questions are here'){
        setQuestion(response.data.data);
        console.log('fetched');
      }
      else{
        // { alert(response.data.message);
      }
    }).catch((eror) => {
      if(eror.response.status !== 404){

      }
      // { alert(eror.message);
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
    if(email !== queryParams.get('email')){
      return(
        <Button className='btn btn-success' onClick={() => {
          setId(id);
          // localStorage.setItem('chrepid', id);
          window.open(`https://chorusclient.vercel.app/home?email=${email}&repid=${id}`, "_self");
        }}>Reply</Button>
      );
    }
    else{
      return(
        <Button className='btn btn-danger' onClick={() => {
          axios.post('https://chorusserver.vercel.app/question/aggreement', {
            questionId: id
          }).then((response) => {
            if(response.data.message === 'Agreement acheived'){
              console.log(response.data.data);
              setReplyDescription(response.data.data.text);
              setReload2(!reload);
            }
            else{
              // { alert(response.data.message);
            }
          }).catch((eror) => {
            // { alert(eror.message);
          });
        }}>
          Check Reply
        </Button>
      );
    }
  }

  useEffect(() => {
  }, [reload2]);

  const renderReplyDescription = () => {
    if(replyDescription !== ""){
      return(
        <h6>{replyDescription}</h6>
      );
    }
    else{
      return(
        <h6></h6>
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
          <AccordionItem className='row d-flex justify-content-center' key={key}>
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
                  {renderReplyDescription()}
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
    axios.post('https://chorusserver.vercel.app/question', {
      email: queryParams.get('email'),
      title: title,
      description: description
    }).then((response) => {
      if(response.data.message === 'Question added'){
        setRenderAdd(!renderAdd);
        setReload(!reload);
      }
      else{
        // { alert(response.data.message);
      }
    }).catch((eror) => {
      // { alert(eror.message);
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
      <Accordion className='row d-flex justify-content-center mt-2' toggle={toggle} open={queId}>
        {renderQuestion()}
      </Accordion>
    </div>
  )
}

export default Question