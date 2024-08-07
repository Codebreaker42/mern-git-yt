import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import exploreRoute from './routes/explore.route.js';

dotenv.config()// middle ware used to enable the feature of read the content of .env file variables.
const app=express();

// Middleware
app.use(cors());
app.use(express.json()); //for using json response

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// middleware to create our routes to clean the file as possible
app.use("/api/users",userRoutes);
app.use("/api/explore",exploreRoute);

app.listen(5000,()=>{
    console.log("Server started on http://localhost:5000");
})