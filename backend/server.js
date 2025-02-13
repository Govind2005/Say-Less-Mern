import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ItemRoutes from "./routes/items.route.js"
import cors from "cors";
import twilio from "twilio";

const app = express();

// app.use(cors());
// this will allow all origins

app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
}))


dotenv.config();

const accountSid = process.env.TWILIO_SID;  // Replace with your Twilio Account SID
const authToken = process.env.TWILIO_TOKEN; // Replace with your Twilio Auth Token

const MONG_URI = process.env.MONG_URI || 200; 
const PORT = process.env.PORT || 5000;

const client = new twilio(accountSid, authToken);


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

app.post("/send-whatsapp", (req,res)=>{
    res.json({ message: 'Message sent successfully:', success: true });
    console.log(req.body);

    //Below is the whatsapp backend. Please don't use this, since we're on trial version and have limited messages 
    
    // const num = req.body.phoneNumber;
    // console.log(num)
    // if (!num) {
    //     return res.status(400).json({ message: "Phone number is required", success: false });
    // }
    // const formattedNumber = `whatsapp:${num}`;  // Prefix the number with 'whatsapp:'

    // client.messages
    //     .create({
    //         body: req.body.message,
    //         from: 'whatsapp:+14155238886', // This is Twilio's WhatsApp sandbox number
    //         to: formattedNumber
    //     })
    //     .then((message) => {
    //         res.json({ message: `Message sent successfully: ${message.sid}`, success: true });
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //         res.status(500).json({ message: "Failed to send message", success: false });
    //     });
})

app.get("/",(req,res)=>{
    res.json("hello");
})

app.post("/",(req,res)=> {
    res.send("post it is");
})