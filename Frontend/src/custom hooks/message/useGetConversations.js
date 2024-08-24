import { useEffect,useState } from "react";
import toast from 'react-hot-toast'
import { useAuthContext } from "../../context/AuthContext";

const useGetConversations= ()=>{
    const {authUser}=useAuthContext();
    // console.log(authUser);
    const [loading,setLoading]=useState(false);
    const [conversations,setConversations]=useState([])

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users/allmsgusers");
                
                // Check if the response was redirected
                if (res.redirected) {
                    console.log("Redirected to:", res.url);
                    toast.error("You are not authenticated. Please log in.");
                    return;
                }
    
                // Check the response status
                if (!res.ok) {
                    throw new Error(error);
                }
    
                const data = await res.json();
                // console.log("data:", data);
    
                if (data.error) {
                    throw new Error(data.error);
                }
    
                setConversations(data);
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        getConversations();
    }, []);    
    return {loading,conversations}
}
export default useGetConversations;