import React from 'react'
import Reply from './Reply'
import History from './History'
import User from './User'
function Home() {
  return (
    <div className='container'>
      <User />
      <div className='row d-flex justify-content-center'>
        <div className='col-12 col-md-6 d-flex align-items-center'>
          <Reply className='shadow-lg' />
        </div>
        <div className='col-12 col-md-6 d-flex align-items-center'>
          <History />
        </div>
      </div>
    </div>
  )
}

export default Home