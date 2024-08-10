import React from 'react'
import Search from '../components/Search'
import SortRepos from '../components/SortRepos'
import ProfileInfo from '../components/ProfileInfo'
import Repos from '../components/Repos'
import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'
import { useAuthContext } from '../context/AuthContext'

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");
  const { authUser } = useAuthContext();

  // Show toast only once when user is not logged in
  useEffect(() => {
    if (!authUser) {
      toast.error("Log in and Signup First");
    }
  }, [authUser]);

  // Ensure this function is not called if authUser is null
  const getUserProfileAndRepos = useCallback(async (username = authUser?.username) => {
    if (!username) return; // Exit if no username is provided

    setLoading(true);
    try {
      const userRes = await fetch(`/api/users/profile/${username}`);
      const { userProfile, repos } = await userRes.json();
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // descending, recent first
      setUserProfile(userProfile);  // setting the userProfile
      setRepos(repos);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      getUserProfileAndRepos();
    }
  }, [authUser, getUserProfileAndRepos]);

  // Triggered when user searches for a GitHub profile in the search box
  const onSearch = async (e, username) => {
    e.preventDefault();
    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    await getUserProfileAndRepos(username);
    setSortType("recent");
    setLoading(false);
  }

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // sort in descending order
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count); // descending, most stars
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count); // descending, most forks first
    }
    setSortType(sortType);
    setRepos([...repos]);
  }

  return (
    <div className='m-4'>
      <Search onSearch={onSearch} />
      {<SortRepos onSort={onSort} sortType={sortType} />}
      <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
        {!loading && <ProfileInfo userProfile={userProfile} loading={loading} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  )
}

export default HomePage;
