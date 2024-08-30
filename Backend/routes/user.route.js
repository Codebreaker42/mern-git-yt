import express from 'express';
import { getUserProfileAndRepos, getUsersforSidebar } from '../controllers/user.controller.js';
import {ensureAuthenticated} from "../middleware/ensureAuthenticated.js"
import { likeProfile,getLikes } from '../controllers/user.controller.js';

const router=express.Router();

//profile info
router.get("/profile/:username",getUserProfileAndRepos);

// TODO => GET like(who liked our profile)
router.get("/likes",ensureAuthenticated,getLikes);
// TODO =>POST like a profile
router.post("/like/:username",ensureAuthenticated,likeProfile);

// fetching all the users for messages sidebar
router.get("/allmsgusers",ensureAuthenticated,getUsersforSidebar);
export default router;