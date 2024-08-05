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

  const getUserProfileAndRepos=useCallback(async(username="Codebreaker42")=>{
    setLoading(true);
    try{
      // api gives 60 requests per hr, 500 requested per hour to authenticated request 
      // url for getting github user information 
      const userRes=await fetch(`https://api.github.com/users/${username}`,{ //https://api.github.com/users/{username}
        headers:{
          // authorization: `token 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`, //token is used to hit the api 5000/hr
        }
      });
      const userProfile=await userRes.json();
      
      setUserProfile(userProfile);  // setting the userProfile
      const repoRes= await fetch(userProfile.repos_url); //https://api.github.com/users/{username}/repos
      const repos=await repoRes.json();
      setRepos(repos);
      setLoading(false);
      // console.log("userProfile:",userProfile);
      // console.log("repos:",repos);
      return {userProfile,repos};
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

  //active when user search github profile in search box
  const onSearch= async(e,username)=>{
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    const {userProfile,repos}=await getUserProfileAndRepos(username);
    setUserProfile(userProfile);
    setRepos(repos);
    setLoading(false);
  }

  const onSort=(sortType)=>{
    if(sortType==="recent"){
      repos.sort((a,b)=>new Date(b.created_at)- new Date(a.created_at));//sort in decending
    }
    else if(sortType==="stars"){
      repos.sort((a,b)=>b.stargazers_count - a.stargazers_count);//decending most stars
    }
    else if(sortType==="forks"){
      repos.sort((a,b)=> b.forks_count-a.forks_count); //decending most forks first
    }
    setSortType(sortType);
    setRepos([...repos]);

  }
  return (
    <div className='m-4'>
      <Search onSearch={onSearch}/>
      {repos.length>0 && <SortRepos onSort={onSort} sortType={sortType}/>}
      <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
        {  !loading && <ProfileInfo userProfile={userProfile} loading={loading}/>}
        {repos.length>0 && !loading && <Repos repos={repos}/>}
        {loading && <Spinner/>}
      </div>
    </div>
  )
}

export default HomePage