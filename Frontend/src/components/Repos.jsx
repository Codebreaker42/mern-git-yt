import React from 'react'
import Repo from './Repo'

const Repos = () => {
  return (
    <div className='lg:w-2/3 w-full bg-glassMorphismEffect rounded-lg px-8 py-6'>
      <ol className='relative border-s bordergr200 '></ol>
        <Repo/>
        <Repo/>
        <Repo/>
        <Repo/>
        <Repo/>
    </div>
  )
}

export default Repos;