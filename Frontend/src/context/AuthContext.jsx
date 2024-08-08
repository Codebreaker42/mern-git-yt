import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';

export const AuthContext=createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider=({children})=>{
    const [authUser,setAuthUser]= useState(null);
    // const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const checkUserLoggedIn=async()=>{
            try {
                const res=await fetch("http://localhost:5000/api/auth/check",{
                    credentials:"include",
                });
                const data=await res.json();
                console.log(data);
                setAuthUser(data.user);
            } catch (error) {
                toast.error(error.message);
            }
        }
        checkUserLoggedIn();
    },[])
    return(
        <AuthContext.Provider value={{authUser,setAuthUser}}>
            {children}
        </AuthContext.Provider>
    )
}