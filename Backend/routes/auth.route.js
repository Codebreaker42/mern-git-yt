import express from 'express'

const router=express.Router();
router.get("/login",(req,res)=>{
    return res.send("login page");
})

export default router;