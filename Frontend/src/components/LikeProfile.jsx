import React from 'react'
import { FaHeart } from 'react-icons/fa'
import {useAuthContext} from '../context/AuthContext';
import toast from 'react-hot-toast';

// using bg-glassMorphismEffect class as a component where we want to use 
export const LikeProfile = ({userProfile}) => {
  // console.log("userprofile is:",userProfile);
  const {authUser}= useAuthContext();

  // Ensure that authUser and userProfile are available before performing the comparison
  if (!authUser || !userProfile) return null;
  // console.log(userProfile.login);
  const isOwnProfile=authUser?.username===userProfile.login;//dont show the button if profile is our
  // console.log(isOwnProfile);
  const handleLikeProfile= async() =>{
    // send request to our endpoint
    try {
      const res=await fetch(`/api/users/like/${userProfile.login}`,{
        method:"POST",
        credentials:"include",
      })
      const data= await res.json();
      if(data.error) throw new Error(data.error);
      toast.success(data.message);
    }
    catch (error) {
      toast.error(error.message);  
    }
    
  }

  if(!authUser || isOwnProfile) return null;
  return (
    <button className='p-2 text-xs w-full font-medium rounded-md 
    bg-glassMorphismEffect border border-blue-400 flex
     items-center gap-2'
     onClick={handleLikeProfile}>
        <FaHeart size={16}/>Like Profile
    </button>
  )
}