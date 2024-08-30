import express from 'express';
import {app,io,server} from './socket/socket.js'
import dotenv from "dotenv";
import cors from 'cors';
import passport from 'passport'
import session from 'express-session';
import path from 'path';

import './passport/github.auth.js';

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js';
import exploreRoute from './routes/explore.route.js';
import messageRoute from './routes/message.route.js'
import connectMongoDB from './db/connectMongoDB.js';

dotenv.config()// middleware used to enable the feature of read the content of .env file variables.
const PORT=process.env.PORT||5000
// const app=express();

// logic to call front end backend server simenteniously
const __dirname=path.resolve();
console.log("dirname",__dirname);

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// Middleware
// CORS configuration
app.use(cors());
app.use(express.json()); //for using json response

// middleware to create our routes to clean the file as possible
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoute);
app.use("/api/message",messageRoute);

// logic to call front end backend server simenteniously
app.use(express.static(path.join(__dirname,"/Frontend/dist")));
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"Frontend","dist","index.html"));
})

server.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`);
    connectMongoDB(); //connect mongodb with backend
})