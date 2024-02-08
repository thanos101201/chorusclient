import React, { useState, useEffect } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AccordionItem, AccordionBody, AccordionHeader, Accordion, Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { VscSend } from "react-icons/vsc";
import { AiOutlineLike, AiOutlineDislike, AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";

function Reply(props) {
  const [ replies, setReplies ] = useState([]);
  const [ id, setId ] = useState("");
  const [ open, setOpen ] = useState("");
  const [ reload, setReload ] = useState(false);
  const [ disabled, setDisabled ] = useState(false);
  const [ email, setEmail ] = useState("");
  const [ reply, setReply ] = useState("");
  const [ cond2, setCond2 ] = useState(true);
  const [ cond3, setCond3 ] = useState(true);
  const [cond1, setCond1 ] = useState(false);
  const [ cond4, setCond4 ] = useState(false);  

  const toggle = (e) => {
    if(e === open){
      setOpen("");
    }
    else{
      setOpen(e);
    }
  }

  
  const renderLikeButton = (condition, str, id) => {
    if(str === 'History'){
      return(
        <div></div>
      );
    }
    if(condition){
      return(
        <Button disabled={cond3} style={{backgroundColor:'white', border:'0px'}} onClick={() => {
          axios.post('http://localhost:3001/reply/like', {
            email: localStorage.getItem('chem'),
            replyId: id
          }).then((response) => {
            if(response.data.message === 'Reply liked'){
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

  const renderDislikeButton = (condition, str, id, txt) => {
    if(str === 'History' && cond4){
      return(
        <Button className='btn btn-success' onClick={() => {
          axios.post('http://localhost:3001/history', {
            email: localStorage.getItem('chem'),
            replyId: id,
            questionId: localStorage.getItem('chrepid'),
            replyText: txt
          }).then((response) => {
            if(response.data.message === 'History added'){
              setReload(!reload);
            }
          }).catch((eror) => {
            // alert(eror.message);
          })
        }} >Add to History</Button>
      );
    }
    if(condition){
      return(
        <Button disabled={cond3} style={{backgroundColor:'white', border:'0px'}} onClick={() => {
          axios.post('http://localhost:3001/reply/dislike', {
            email: localStorage.getItem('chem'),
            replyId: id
          }).then((response) => {
            if(response.data.message === 'Reply disliked'){
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

  const { state } = useLocation();

  useEffect(() => {
    
    let id = localStorage.getItem('chrepid');

    setEmail(localStorage.getItem('chem'));
    setId(id);
    axios.get('http://localhost:3001/reply', {
      headers: {
        id : id
      }
    }).then((response) => {
      if(response.data.message === 'Reply is here'){
        setReplies(response.data.data);
        if(response.data.data.length === 0 || response.status === 204){
          setCond1(true);
        }
      }
      else if(response.status === 204){
        setCond1(true);
      }
    }).catch((eror) => {
      // { alerteror.message);
    });
  }, [reload]);

  useEffect(() => {
    axios.get('http://localhost:3001/history', {
      headers: {
        questionId: id
      }
    }).then((response) => {
      if(response.data.message === 'Working history is here'){
        let history = response.data.data[0].users;
        if(history.indexOf(localStorage.getItem('chem')) !== -1){
          setDisabled(true);
        }
        else{
          setDisabled(false);
        }
      }
    }).catch((eror) => {
      // { alerteror.message);
    })
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3001/question', {
      headers: {
        id: localStorage.getItem('chrepid')
      }
    }).then((response) => {
      // console.log(response.data.data[0].replyUsers.indexOf(localStorage.getItem('chem')) !== -1);
      // console.log(response.data.data[0].historyUsers.indexOf(localStorage.getItem('chem')) === -1);
      if(response.data.message === 'The question is here'){
        console.log(response.data.data[0].replyUsers.indexOf(localStorage.getItem('chem')) !== -1);
        if(response.data.data[0].replyUsers.indexOf(localStorage.getItem('chem')) === -1 && response.data.data[0].historyUsers.indexOf(localStorage.getItem('chem')) === -1){
          setCond2(false);
        }
        if(response.data.data[0].replyUsers.indexOf(localStorage.getItem('chem')) !== -1 && response.data.data[0].historyUsers.indexOf(localStorage.getItem('chem')) === -1){
          setCond3(false);
        }
        if(response.data.data[0].replyUsers.indexOf(localStorage.getItem('chem')) === -1 && response.data.data[0].historyUsers.indexOf(localStorage.getItem('chem')) !== -1){
          setCond4(true);
        }
      }
      else{
        // { alertresponse.data.message);
      }
    }).catch((eror) => {
      // { alerteror.message);
    })
  }, [])
  const checkDisabled = (ar) => {
    if(ar.indexOf(localStorage.getItem('chem')) !== -1){
      return true;
    }
    return false;
  }


  const renderReplies = () => {
    
    if(replies.length === 0){
      return(
        <div className='row d-flex justify-content-center mt-5'>
          <div className='col-12 d-flex align-items-center'>
            <h4>No replies</h4>
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
                  <p>{e.text}</p>
                </div>
              </div>
              <div className='row d-flex justify-content-center'>
                <div className='col-4 d-flex align-items-center m-1'>
                  {/* <Button className='btn btn-success' disabled={disabled || checkDisabled(e.upVotes)} onClick={() => {
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
                  }}>Like</Button> */}
                  {renderLikeButton( e.upVotes.indexOf(localStorage.getItem("chem")) === -1, cond3 ? "History" :"", e._id, e.text)}
                </div>
                <div className='col-4 d-flex align-items-center m-1'>
                  {/* <Button className='btn btn-danger' disabled={disabled || checkDisabled(e.downVotes)} onClick={() => {
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
                  }}>Dislike</Button> */}
                  {renderDislikeButton( e.downVotes.indexOf(localStorage.getItem("chem")) === -1, cond3? "History": "", e._id, e.text)}
                </div>
              </div>
            </AccordionBody>
          </AccordionItem>
        );
      })
    }
  }

  const renderAddInput = () => {
    if(cond3){
      console.log(cond2);
      console.log(cond3);
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
                email: localStorage.getItem('chem'),
                questionId: localStorage.getItem('chrepid'),
                text: reply
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

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center mt-5'>
        <div className='col-12 d-flex align-items-center'>
          <h2>Replies</h2>
        </div>
      </div>
      <div className='row d-flex justify-content-left mt-5'>
        <div className='col-12 col-md-8 d-flex align-items-center'>
          <Button disabled={cond2} className='btn btn-success' onClick={() => {
            axios.post('http://localhost:3001/reply/join', {
              email: email,
              questionId: localStorage.getItem('chrepid')
            }).then((response) => {
              if(response.data.message === 'Reply joined'){
                setReload(!reload);
              }
              else{
                // { alertresponse.data.message);
              }
            }).catch((eror) => {
              // { alerteror.message);
            })
          }}>Join Reply</Button>
        </div>
      </div>
      {renderAddInput()}
        <Accordion className='row d-flex justify-content-center mt-3 mb-5' open={open} toggle={toggle}>
          {renderReplies()}
        </Accordion>
    </div>
  )
}

export default Reply