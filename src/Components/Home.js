import React from 'react'
import Reply from './Reply'
import History from './History'

function Home() {
  return (
    <div className='container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-12 col-md-6 d-flex align-items-center'>
          <Reply />
        </div>
        <div className='col-12 col-md-6 d-flex align-items-center'>
          <History />
        </div>
      </div>
    </div>
  )
}

export default Home