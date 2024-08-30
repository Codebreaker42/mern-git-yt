export const explorePopularRepos= async (req,res)=>{
    const {language} =req.params;
    try {
        // api gives 60 requests per hr, 500 requested per hour to authenticated request 
      // url for getting github user information 
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}
            &sort=stars&order=desc&per_page=20`,{
                headers:{
                    authorization: `token ${process.env.VITE_GITHUB_API_KEY}`
                },
            });
        const data=await response.json();
        // console.log(data);
        return res.status(200).json({repos:data.items});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message});
    }
}