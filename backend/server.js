// const express = require("express");  
// const cors = require("cors");  //cors is used to allow the frontend to access the backend//
// const app = express();   //.get ,put,post,delete,put means updating,post means creating,delete means deleting, get means getting data from the server.//
// app.use(cors)                 
// app.get("/", (req, res)=>{
//     res.send("Backend is working ");
// }) 

// app.get("/api/events", (req, res)=>{

//     res.send("Events API is working");
// })

// app.listen(5000, ()=>{
//     console.log("Server is running on port 5000");   //this is used to run the backend like loading the backed in localhost 5000 //
// })


require("dotenv").config();  // This is used to load the environment variables from the .env file into the process.env object. It allows you to access the variables defined in the .env file throughout your application.

const express=require("express");               // To including the express 
const cors = require("cors");
const mongoose = require("mongoose");           // To including the mongoose
const app = express();                           // This is everything the express is called API also passed through it
const dns = require("dns");
const Event = require("./models/Event");  


app.use(cors());
app.use(express.json());
dns.setServers(['8.8.8.8']);


mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.log("Error connecting to MongoDB:", error);
});

app.get ("/", (req, res )=>{
    res.send("Backend is working");            // this is the api route We work on arrow function in backened json and mongodb are same so we use mango in this

}) 

app.get("/api/events", async (req,res)=>{
    try {
      const events = await Event.find().sort({ createdAt: -1 });
      res.json(events);
    } catch (error) {
      console.error("Error loading events:", error);
      res.status(500).json({ message: "Unable to load events" });
    }
})

app.delete("/api/events/:id", async (req,res)=>{
    try {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      if (!deletedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(400).json({ message: "Invalid event id" });
    }
})

app.post("/api/events", async (req, res)=>{
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json({
      message: "Event added successfully",
      event: newEvent
    });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(400).json({ message: "Unable to add event" });
  }
});

app.put("/api/events/:id", async (req, res)=>{
  const updatedEvent = await Event.findByIdAndUpdate(
       req.params.id, 
      req.body, 
      { new: true }
  );

  if (!updatedEvent) {
    return res.status(404).json({ message: "Event not found" });
  }

    res.json({
      message: "Event updated successfully",
      event: updatedEvent
    });
  
});

const port = process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`server is running on port ${port}`); // without these the server will not start 
})