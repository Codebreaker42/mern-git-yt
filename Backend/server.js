import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import passport from 'passport'
import session from 'express-session';

import './passport/github.auth.js';

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js';
import exploreRoute from './routes/explore.route.js';
import connectMongoDB from './db/connectMongoDB.js';

dotenv.config()// middle ware used to enable the feature of read the content of .env file variables.
const app=express();

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

// Middleware
// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // replace with your frontend's URL
  credentials: true // allow sending cookies with requests
}));
app.use(express.json()); //for using json response

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// middleware to create our routes to clean the file as possible
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoute);

app.listen(5000,()=>{
    console.log("Server started on http://localhost:5000");
    connectMongoDB(); //connect mongodb with backend
})