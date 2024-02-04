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
    axios.get('http://localhost:3001/question', {
      id: localStorage.getItem('chem')
    }).then((response) => {
      if(response.data.message === 'The question is here'){
        if(response.data.data[0].replyUsers.indexOf(localStorage.getItem('chem')) !== -1){
          setCond2(false);
        }
        if(response.data.data[0].historyUsers.indexOf(localStorage.getItem('chem')) === -1){
          setCond3(false);
        }
      }
      else{
        alert(response.data.message);
      }
    }).catch((eror) => {
      alert(eror.message);
    })
  }, []);

  const toggle = (e) => {
    if(e === open){
      setOpen("");
    }
    else{
      setOpen(e);
    }
  }
  
  const renderLikeButton = (condition) => {
    if(condition){
      return(
        <Button disabled={cond2} style={{backgroundColor:'white', border:'0px'}} onClick={() => {
          axios.post('http://localhost:3001/reply/like', {

          }).then((response) => {
            if(response.data.message === 'liked'){
            }
            else{
              alert(response.data.message);
            }
          }).catch((eror) => {
            alert(eror.message);
          })
        }}>
          <AiOutlineLike style={{color:'black'}} />
        </Button>
      );
    }
    else{
      return(
        <Button disabled={cond2} style={{backgroundColor:'white', border:'0px'}}>
          <AiTwotoneLike  style={{color:'black'}}/>
        </Button>
      );
    }
  }

  const renderDislikeButton = (condition, str) => {
    if(str === 'History'){
      return(
        <Button className='btn btn-success'>Add to History</Button>
      );
    }
    if(condition){
      return(
        <Button disabled={!cond2 || !cond3} style={{backgroundColor:'white', border:'0px'}} onClick={() => {
          axios.post('http://localhost:3001/reply/dislike', {
          }).then((response) => {
            if(response.data.message === 'disliked'){
            }
            else{
              alert(response.data.message);
            }
          }).catch((eror) => {
            alert(eror.message);
          })
        }}>
          <AiOutlineDislike style={{color:'black'}} />
        </Button>
      );
    }
    else{
      return(
        <Button disabled={!cond2 || !cond3} style={{backgroundColor:'white', border:'0px'}}>
          <AiTwotoneDislike  style={{color:'black'}}/>
        </Button>
      );
    }
  }

  const renderAddInput = () => {
    if(!cond1){
      return(
        <div></div>
      );
    }
    if(cond2 || cond3){
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
              axios.post('http://localhost:3001/reply', {
              }).then((response) => {
                if(response.data.message === 'Reply added'){
                  setReload(!reload);
                }
                else{
                  alert(response.data.message);
                }
              }).catch((eror) => {
                alert(eror.message);
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
    axios.get('http://localhost:3001/history', {
      headers: {
        questionId : id
      }
    }).then((response) => {
      if(response.data.message === 'Working history is here'){
        setReplies(response.data.data);
      }
    }).catch((eror) => {
      alert(eror.message);
    });
  }, [reload]);

  useEffect(() => {
    axios.get('http://localhost:3001/reply', {
      headers: {
        id: id
      }
    }).then((response) => {
      if(response.data.message === 'Reply is here'){
        if(response.data.data.length === 0){
          setCond1(false);
        }
      }
      else{
        alert(response.data.message);
      }
    }).catch((eror) => {
      alert(eror.message);
    })
  }, []);

  const checkDisabled = (ar) => {
    if(ar.indexOf(localStorage.get('chem')) !== -1){
      return true;
    }
    return false;
  }
  
  const renderReplies = () => {
    if(replies.length === 0 || !cond1){
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
      return replies.map((e, key) => {
        i = i + 1;
        return(
          <AccordionItem className='col-12' key={key}>
            <AccordionHeader targetId={i}>{e.email}</AccordionHeader>
            <AccordionBody accordionId={i}>
              <div className='row d-flex justify-content-center'>
                <div className='col-12 d-flex align-items-center'>
                  <p>{e.description}</p>
                </div>
              </div>
              <div className='row d-flex justify-content-center'>
                <div className='col-12 col-md-6 d-flex align-items-center'>
                  {/* <Button disabled={disabled || checkDisabled(e.upVotes)} onClick={() => {
                    axios.post('http://localhost:3001/history/like', {
                      email: localStorage.getItem('chem'),
                      id : id,
                      index: i-1
                    }).then((response) => {
                      if(response.data.message === 'liked'){
                        setReload(!reload);
                      }
                      else{
                        alert(response.data.message);
                      }
                    }).catch((eror) => {
                      alert(eror.message);
                    })
                  }}>Like</Button> */}
                  {renderLikeButton( e.upVotes.indexOf(localStorage.getItem("chem")) === -1, "")  }
                </div>
                <div className='col-12 col-md-6 d-flex align-items-center'>
                  {/* <Button disabled={disabled || checkDisabled(e.downVotes)} onClick={() => {
                    axios.post('http://localhost:3001/history/dislike', {
                      email: localStorage.getItem('chem'),
                      id: id,
                      index : i-1
                    }).then((response) => {
                      if(response.data.message === 'disliked'){
                        setReload(!reload);
                      }
                      else{
                        alert(response.data.message);
                      }
                    }).catch((eror) => {
                      alert(eror.message);
                    })
                  }}>Dislike</Button> */}
                  {renderDislikeButton( e.downVotes.indexOf(localStorage.getItem("chem")) === -1,"")}
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
          <Button disabled={!cond2 || !cond3} className='btn btn-danger' onClick={() => {
            axios.post('http://localhost:3001/reply/join', {
              email: email
            }).then((response) => {
              if(response.data.message === 'history joined'){
                setReload(!reload);
              }
            }).catch((eror) => {
              alert(eror.message);
            })
          }}>Join History</Button>
        </div>
      </div>
      {renderAddInput()}
      <div className='row d-flex justify-content-center'>
        <Accordion className='col-12 d-flex align-items-center mb-3' open={open} toggle={toggle}>
          {renderReplies()}
        </Accordion>
        </div>
    </div>
  )
}

export default History