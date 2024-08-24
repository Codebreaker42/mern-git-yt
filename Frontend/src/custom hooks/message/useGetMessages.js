import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"


const useGetMessages= ()=>{
    const [loading,setLoading]= useState(false)
    const {messages,setMessages,selectedConversation,setSelectedConversation}= useConversation() //a gloabal hooks which gives the info about current coversation

    useEffect(()=>{
        const getMessages= async()=> {
        setLoading(true);
            try{
                const res= await fetch(`api/message/${selectedConversation._id}`);
                // console.log(res);
                const data=await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setMessages(data);
            }
            catch(error){
                // console.log("error",error.message)
                toast.error(error.message)
            }
            finally{
                setLoading(false);
            }
        }   
        if(selectedConversation?._id){
            getMessages()
        } 
    },[selectedConversation._id,setMessages]);

    return {messages,loading}
}

export default useGetMessages;