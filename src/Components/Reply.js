import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AccordionItem, AccordionBody, AccordionHeader, Accordion, Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import { useLocation } from 'react-router-dom';

function Reply(props) {
  const [ replies, setReplies ] = useState([]);
  const [ id, setId ] = useState("");
  const [ open, setOpen ] = useState("");
  const [ reload, setReload ] = useState(false);
  const toggle = (e) => {
    if(e === open){
      setOpen("");
    }
    else{
      setOpen(e);
    }
  }

  const { state } = useLocation();

  useEffect(() => {
    let id = state.id
    setId(id);
    axios.get('http://localhost:3001/reply', {
      headers: {
        questionId : id
      }
    }).then((response) => {
      if(response.data.message === 'Replies are here'){
        setReplies(response.data.data);
      }
    }).catch((eror) => {
      alert(eror.message);
    });
  }, [reload]);

  const renderReplies = () => {
    if(replies.length === 0){
      return(
        <div></div>
      );
    }
    else
    {
      let i = 0;
      return replies.map((e, key) => {
        i = i + 1;
        return(
          <AccordionItem key={key}>
            <AccordionHeader targetId={i}>{e.email}</AccordionHeader>
            <AccordionBody accordionId={i}>
              <div className='row d-flex justify-content-center'>
                <div className='col-12 d-flex align-items-center'>
                  <p>{e.description}</p>
                </div>
              </div>
              <div className='row d-flex justify-content-center'>
                <div className='col-12 col-md-6 d-flex align-items-center'>
                  <Button onClick={() => {
                    axios.post('http://localhost:3001/reply/like', {
                      email: localStorage.getItem('chem'),
                      replyId : e._id
                    }).then((response) => {
                      if(response.data.message === 'Reply liked'){
                        setReload(!reload);
                      }
                      else{
                        alert(response.data.message);
                      }
                    }).catch((eror) => {
                      alert(eror.message);
                    })
                  }}>Like</Button>
                </div>
                <div className='col-12 col-md-6 d-flex align-items-center'>
                  <Button onClick={() => {
                    axios.post('http://localhost:3001/reply/dislike', {
                      email: localStorage.getItem('chem'),
                      replyId : e._id
                    }).then((response) => {
                      if(response.data.message === 'Reply disliked'){
                      }
                      else{
                        alert(response.data.message);
                      }
                    }).catch((eror) => {
                      alert(eror.message);
                    })
                  }}>Dislike</Button>
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>
        );
      })
    }
  }

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-12 col-md-8 d-flex align-items-center'>
          <Button onClick={() => {
            axios.post('http://localhost:3001/reply/join', {
              email: email
            }).then((response) => {
              if(response.data.message === 'Reply joined'){
                setReload(!reload);
              }
              else{
                alert(response.data.message);
              }
            }).catch((eror) => {
              alert(eror.message);
            })
          }}>Join</Button>
        </div>
      </div>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 d-flex align-items-center'>
            <Accordion open={open} toggle={toggle}>
              {renderReplies()}
            </Accordion>
          </div>
        </div>
    </div>
  )
}

export default Reply