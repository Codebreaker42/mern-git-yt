import express from 'express'
import passport from 'passport';

const router = express.Router();

//we don't use the post method because there is no form 
//signin and signup functionality implementation
router.get("/github", passport.authenticate('github', { scope: ['user:email'] }),);
router.get("/github/callback", passport.authenticate("github", { failureRedirect: process.env.CLIENT_BASE_URL + "/login" }),
    function (req, res) {
        res.redirect(process.env.CLIENT_BASE_URL);//homepage 
    }
);


// check if user is authenticated or not
router.get("/check",(req,res)=>{
    if(req.isAuthenticated()){
        res.send({user:req.user});
    }
    else{
        res.send({user:null});
    }
})

//logout functionality implementation
router.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        res.status(200).json({message:"Logged out"});
    });
});

export default router;