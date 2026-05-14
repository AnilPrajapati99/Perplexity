import React from 'react'
import { Riple } from 'react-loading-indicators'

const Loading = () => {
  return (
    <div className='flex h-screen justify-center items-center bg-[#182337]'>
      <Riple color="#32cd32" size="medium" text="" textColor="" />
    </div>
  )
}

export default Loading
