import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../custom hooks/zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {
  // check if the message gonna sender or reciever 
  console.log(message)
  const {authUser}= useAuthContext();  //give the authenticated user details
  // console.log(authUser);
  const {selectedConversation}= useConversation(); //give the current conversation person details
  const fromMe = message.senderId === authUser._id;
  const formattedTime=extractTime(message.createdAt);
  console.log(fromMe);
  const chatClassName= fromMe? 'chat-end': 'chat-start';
  const profilePic=fromMe? authUser.avatarURL: selectedConversation.profileURL;
  const bubbleBgColor= fromMe? 'bg-blue-500': "";


  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img alt="TailwindCSS chat with bubble component"
                src={profilePic}
                />
            </div>
        </div>
        <div className={` chat-bubble ${bubbleBgColor} text-white pb-2`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message