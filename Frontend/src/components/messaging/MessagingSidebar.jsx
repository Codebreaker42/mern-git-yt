import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
const MessagingSidebar = () => {
  return (
    <div className='border-r w-1/3 border-slate-500 p-4 flex flex-col'>
      <SearchInput />
      <div className='divider px-3'></div>
      <Conversations/>
    </div>
  )
}

export default MessagingSidebar