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
      
      const repoRes= await fetch(userProfile.repos_url,{ //https://api.github.com/users/{username}/repos
        headers:{
            authorization:`token ${process.env.VITE_GITHUB_API_KEY}`
        }
      });
      const repos=await repoRes.json();
      return res.status(200).json({userProfile,repos});
    } catch (error) {
        console.log("error");
        return res.status(500).json({error:error.message});
    }
}