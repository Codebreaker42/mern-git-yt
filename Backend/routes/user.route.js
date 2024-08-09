import express from 'express';
import { getUserProfileAndRepos } from '../controllers/user.controller.js';
import {ensureAuthenticated} from "../middleware/ensureAuthenticated.js"
import { likeProfile,getLikes } from '../controllers/user.controller.js';

const router=express.Router();

//profile info
router.get("/profile/:username",getUserProfileAndRepos);

// TODO => GET like(who liked our profile)
router.get("/likes",ensureAuthenticated,getLikes);
// TODO =>POST like a profile
router.post("/like/:username",ensureAuthenticated,likeProfile);
export default router;