export const getUserProfileAndRepos= async (req,res)=>{
    const {username}= req.params;
    try {
      // api gives 60 requests per hr, 500 requested per hour to authenticated request 
      // url for getting github user information 
      const userRes=await fetch(`https://api.github.com/users/${username}`,{
        headers:{
            authorization:`token ${process.env.VITE_GITHUB_API_KEY}`
        }
      }); 
      const userProfile=await userRes.json();
      
      setUserProfile(userProfile);  // setting the userProfile
      const repoRes= await fetch(userProfile.repos_url); //https://api.github.com/users/{username}/repos
      const repos=await repoRes.json();
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}