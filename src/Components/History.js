import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AccordionItem, AccordionBody, AccordionHeader, Accordion, Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import { VscSend } from "react-icons/vsc";
import axios from 'axios';
import { AiOutlineLike, AiOutlineDislike, AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";

function History() {
  const [ replies, setReplies ] = useState([]);
  const [ id, setId ] = useState("");
  const [ open, setOpen ] = useState("");
  const [ reload, setReload ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ disabled, setDisabled ] = useState(false);
  const [ reply, setReply ] = useState("");
  const [ viewInput, setViewInput ] = useState(false);
  const [ cond1, setCond1 ] = useState(false);
  const [ cond2, setCond2 ] = useState(true);
  const [ cond3, setCond3 ] = useState(true);

  
  useEffect(() => {
    axios.get('https://chorusserver.vercel.app/question', {
      headers:{
        id: localStorage.getItem('chrepid')
      }
    }).then((response) => {
      console.log(response);
      if(response.data.message === 'The question is here'){
        if(response.data.data[0].replyUsers.indexOf(localStorage.getItem('chem')) === -1 && response.data.data[0].historyUsers.indexOf(localStorage.getItem('chem')) === -1){
          setCond2(false);
        }
        if(response.data.data[0].replyUsers.indexOf(localStorage.getItem('chem')) === -1 && response.data.data[0].historyUsers.indexOf(localStorage.getItem('chem')) !== -1){
          setCond3(false);
        }
      }
      else{
        // { alertresponse.data.message);
      }
    }).catch((eror) => {
      // { alerteror.message);
    })
  }, [reload]);

  const toggle = (e) => {
    if(e === open){
      setOpen("");
    }
    else{
      setOpen(e);
    }
  }
  
  const renderLikeButton = (condition, email, id) => {
    if(cond3){
      return(
        <div></div>
      );
    }
    if(condition){
      return(
        <Button disabled={cond3} style={{backgroundColor:'white', border:'0px'}} onClick={() => {
          axios.post('https://chorusserver.vercel.app/history/like', {
            email: email,
            id: id
          }).then((response) => {
            if(response.data.message === 'liked'){
              setReload(!reload)
            }
            else{
              // { alertresponse.data.message);
            }
          }).catch((eror) => {
            // { alerteror.message);
          })
        }}>
          <AiOutlineLike style={{color:'black'}} />
        </Button>
      );
    }
    else{
      return(
        <Button disabled={cond3} style={{backgroundColor:'white', border:'0px'}}>
          <AiTwotoneLike  style={{color:'black'}}/>
        </Button>
      );
    }
  }

  const renderDislikeButton = (condition, email, id) => {
    if(cond3){
      return(
        <div></div>
        )
    }
    if(condition){
      return(
        <Button disabled={cond3} style={{backgroundColor:'white', border:'0px'}} onClick={() => {
          axios.post('https://chorusserver.vercel.app/history/dislike', {
            email: email,
            id: id
          }).then((response) => {
            if(response.data.message === 'disliked'){
              setReload(!reload);
            }
            else{
              // { alertresponse.data.message);
            }
          }).catch((eror) => {
            // { alerteror.message);
          })
        }}>
          <AiOutlineDislike style={{color:'black'}} />
        </Button>
      );
    }
    else{
      return(
        <Button disabled={cond3} style={{backgroundColor:'white', border:'0px'}}>
          <AiTwotoneDislike  style={{color:'black'}}/>
        </Button>
      );
    }
  }

  const renderAddInput = () => {
    if(cond3){
      return(
        <div></div>
      );
    }
    if(!disabled){
      return(
        <div className='row d-flex justify-content-center mt-2'>
          <div className='col-10 col-md-10 d-flex align-items-center'>
            <Input placeholder='Reply' onChange={(e) => setReply(e.target.value)} />
          </div>
          <div className='col-10 col-md-2 d-flex align-items-center'>
            <Button onClick={() => {
              axios.post('https://chorusserver.vercel.app/history/add', {
                questionId: localStorage.getItem('chrepid'),
                email: localStorage.getItem('chem'),
                replyText: reply
              }).then((response) => {
                if(response.data.message === 'Reply added'){
                  setReload(!reload);
                }
                else{
                  // { alertresponse.data.message);
                }
              }).catch((eror) => {
                // { alerteror.message);
              })
            }} style={{backgroundColor:'white', border:'0px'}}>
              <VscSend style={{color:'black'}} />
            </Button>
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
    let id = localStorage.getItem('chrepid');
    setEmail(localStorage.getItem('chem'));
    setId(id);
    axios.get('https://chorusserver.vercel.app/history', {
      headers: {
        id : id
      }
    }).then((response) => {
      console.log(response);
      if(response.data.message === 'Working history is here'){
        setReplies(response.data.data);
      }
    }).catch((eror) => {
      // { alerteror.message);
    });
  }, [reload]);

  useEffect(() => {
    axios.get('https://chorusserver.vercel.app/reply', {
      headers: {
        id: id
      }
    }).then((response) => {
      if(response.data.message === 'Reply is here'){
        if(response.data.data.length === 0){
          setCond1(true);
        }
      }
      else{
        // { alertresponse.data.message);
      }
    }).catch((eror) => {
      // { alerteror.message);
    })
  }, []);

  const checkDisabled = (ar) => {
    if(ar.indexOf(localStorage.get('chem')) !== -1){
      return true;
    }
    return false;
  }
  
  const renderReplies = () => {
    if(replies.length === 0){
        return(
        <div className='row d-flex justify-content-center mt-5'>
          <div className='col-12 d-flex align-items-center'>
            <h4>No added history</h4>
          </div>
        </div>
      );
    }
    else
    {
      let i = 0;
      console.log(replies.length);
      return replies.map((e, key) => {
        i = i + 1;
        return(
          <AccordionItem className='col-12' key={key}>
            <AccordionHeader targetId={i}>{e.email}</AccordionHeader>
            <AccordionBody accordionId={i}>
              <div className='row d-flex justify-content-center'>
                <div className='col-12 d-flex align-items-center'>
                  <p>{e.replyText}</p>
                </div>
              </div>
              <div className='row d-flex justify-content-center'>
                <div className='col-4 d-flex align-items-center m-1'>
                  {renderLikeButton( e.upVotes.indexOf(localStorage.getItem("chem")) === -1, localStorage.getItem("chem"), e._id)  }
                </div>
                <div className='col-4 d-flex align-items-center m-1'>
                  {renderDislikeButton( e.downVotes.indexOf(localStorage.getItem("chem")) === -1, localStorage.getItem("chem"), e._id)}
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
      <div className='row d-flex justify-content-center mt-5'>
        <div className='col-12 d-flex align-items-center'>
          <h2>Working History</h2>
        </div>
      </div>
      <div className='row d-flex justify-content-left mt-5'>
        <div className='col-12 col-md-8 d-flex align-items-center'>
          <Button disabled={cond2} className='btn btn-danger' onClick={() => {
            axios.post('https://chorusserver.vercel.app/history/join', {
              email: email,
              questionId: localStorage.getItem('chrepid')
            }).then((response) => {
              if(response.data.message === 'history joined'){
                setReload(!reload);
              }
            }).catch((eror) => {
              // { alerteror.message);
            })
          }}>Join History</Button>
        </div>
      </div>
      {renderAddInput()}
      <Accordion className='row d-flex justify-content-center mt-3 mb-3' open={open} toggle={toggle}>
        {renderReplies()}
      </Accordion>
    </div>
  )
}

export default History