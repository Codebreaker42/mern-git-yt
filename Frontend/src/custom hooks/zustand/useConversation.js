import { create } from "zustand";

const useConversation= create((set)=>({
    selectedConversation:null, //a state
    setSelectedConversation:(selectedConversation)=> set({selectedConversation}), //function to update the state
    messages:[], //a state
    setMessages:(messages) => set({messages}) //function to update the state
}))

export default useConversation;