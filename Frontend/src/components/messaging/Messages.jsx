import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useGetMessages from "../../custom hooks/message/useGetMessages";
import { useEffect, useRef } from "react";


const Messages = () => {
	const {messages,loading}=useGetMessages();
	const lastMessageRef=useRef();
	console.log("messages:",messages);

	useEffect(()=>{
		setTimeout(() => {
			lastMessageRef.current.scrollIntoView({behavior:"smooth"});
		}, 1000);
	},[messages]);

	return (

		<div className='px-4 flex-1 overflow-auto'>

			{!loading && messages.length>0 && 
			messages.map((message) => (
				<div key={message._id} ref={lastMessageRef}>
					<Message message={message} />
				</div>
			))}

			{loading && [...Array(5)].map((_,idx)=>(<MessageSkeleton key={idx}/>))}
			
			{!loading && messages.length === 0 && (
				<p className="text-center text-opacity-50 "> Send a Message to start the Conversation</p>
			)}
		</div>
	);
};
export default Messages;