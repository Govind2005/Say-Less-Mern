import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ItemRoutes from "./routes/items.route.js"
import cors from "cors";

const app = express();

// app.use(cors());
// this will allow all origins

app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
}))


dotenv.config();

const MONG_URI = process.env.MONG_URI || 200; 
const PORT = process.env.PORT || 5000;


mongoose.connect(MONG_URI)
    .then(()=> {
        app.listen(PORT,()=> {
            console.log("listeining on " + PORT);
        })
    })
    .catch((error)=>{
        console.log("here "+error);
    })

app.use(express.json());
app.use("/api/item",ItemRoutes);

app.get("/",(req,res)=>{
    res.json("hello");
})

app.post("/",(req,res)=> {
    res.send("post it is");
})