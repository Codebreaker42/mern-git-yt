import React from 'react'
import Search from '../components/Search'
import SortRepos from '../components/SortRepos'
import ProfileInfo from '../components/ProfileInfo'
import Repos from '../components/Repos'
import { useState,useEffect,useCallback } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'
ProfileInfo
const HomePage = () => {
  const [userProfile,setUserProfile]=useState(null);
  const [repos,setRepos]=useState([]);
  const [loading,setLoading]=useState(false);
  const [sortType,setSortType]=useState("forks");

  const getUserProfileAndRepos=useCallback(async()=>{
    setLoading(true);
    try{
      // url for getting github user information 
      const userRes=await fetch('https://api.github.com/users/CodeBreaker42') //https://api.github.com/users/{username}
      const userProfile=await userRes.json();
      
      setUserProfile(userProfile);  // setting the userProfile
      const repoRes= await fetch(userProfile.repos_url); //https://api.github.com/users/{username}/repos
      const repos=await repoRes.json();
      setRepos(repos);
      setLoading(false);
      console.log("userProfile:",userProfile);
      // console.log("repos:",repos);
    }
    catch(error){
      toast.error(error.message);
    }
    finally{
      setLoading(false);
    }
  },[]);


  useEffect(()=>{
    getUserProfileAndRepos();
  },[getUserProfileAndRepos]);
  return (
    <div className='m-4'>
      <Search />
      <SortRepos />
      <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} loading={loading}/>}
        {repos.length>0 && !loading && <Repos />}
        {loading && <Spinner/>}
      </div>
    </div>
  )
}

export default HomePage