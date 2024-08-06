import express from 'express';
import userRoutes from './routes/user.route.js'
const app=express();

// Middleware
app.use(express.json()); //for using json response

// Define a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// middleware to create our routes to clean the file as possible
app.use("/api/users",userRoutes);

app.listen(5000,()=>{
    console.log("Server started on http://localhost:5000");
})