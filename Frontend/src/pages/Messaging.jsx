import React from 'react'
import MessagingSidebar from '../components/messaging/MessagingSidebar';
import MessagingContainer from '../components/messaging/MessagingContainer';
const Messaging = () => {
    return (
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-glassMorphismEffect'>
			<MessagingSidebar />
			<MessagingContainer/>
		</div>
	);
}

export default Messaging