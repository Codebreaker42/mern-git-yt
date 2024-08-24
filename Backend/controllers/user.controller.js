import User from "../models/user.model.js";

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

export const likeProfile= async(req,res)=>{
  try {
      const {username}=req.params; //username => which profile logged in user to like
      const user=await User.findById(req.user._id.toString()); //logged in username
      console.log("auth user",user);
      const userToLike=await User.findOne({username:username});
      // if user is not found
      if(!userToLike){
        return res.status(404).json({error:"User is Not a Member"});
      }
      // if user is already liked by logged in user 
      if(user.likedProfiles.includes(userToLike.username)){
        return res.status(400).json({error:"User already liked"});
      }
      userToLike.likedBy.push({
        username:user.username,
        avatarUrl:user.avatarURL,
        likedDate:Date.now(),
      });
      user.likedProfiles.push(userToLike.username);
      // await userToLike.save();
      // await user.save();
      await Promise.all([userToLike.save(),user.save()]); //to push both info in database simenteniously
      return res.status(500).json({message:"User liked"});
  }
  catch (error) {
      return res.status(500).json({error:error.message});
  }
}

export const getLikes= async(req,res)=>{
  try {
    const user =await User.findById(req.user._id.toString());
    console.log(user);
    return res.status(200).json({likedBy:user.likedBy});
  } 
  catch (error) {
    return res.status(500).json({error:error.message});
  }
}
export const getUsersforSidebar= async(req,res)=>{
  // console.log("hello")
  try {
    const loggedInUserId=req.user._id;
    console.log("id:",loggedInUserId);
    const filteredUsers=await User.find({_id: {$ne: loggedInUserId} }).select("-password");
    res.status(200).json(filteredUsers);
  }
  catch (error) {
    console.error("Error in getUsersForSidebar: ",error.message);
    res.status(500).json({error:"Internal Server error"});
  }
}