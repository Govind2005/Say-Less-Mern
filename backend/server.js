import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ItemRoutes from "./routes/items.route.js";
import ReviewRoutes from "./routes/review.route.js";
import OrderRoutes from "./routes/order.route.js";
import cors from "cors";
import twilio from "twilio";

import bodyParser from "body-parser";
import path from "path";
import Razorpay from "razorpay";
import fs from "fs";

const validateWebhookSignature = Razorpay.validateWebhookSignature;
export { validateWebhookSignature };
// const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");

const app = express();


import { fileURLToPath } from "url";


// Get the current file directory using import.meta.url
const __filename = new URL('', import.meta.url).pathname;
const __dirname = path.dirname(__filename);

console.log(__dirname);


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
const PORT = process.env.PORT || 4000;
const PAYMENT_PORT = process.env.PAYMENT_PORT || 5000;

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
app.use("/api/review",ReviewRoutes);
app.use("/api/order",OrderRoutes);

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});

const readData = () => {
    if (fs.existsSync("orders.json")) {
        const data = fs.readFileSync("orders.json", "utf8"); // Ensure encoding is set
        return JSON.parse(data);
    }
    return [];
};

const writeData = (data) => {
    fs.writeFileSync("orders.json", JSON.stringify(data, null, 2), "utf8"); // Add encoding
};

// Ensure "orders.json" exists before reading/writing
if (!fs.existsSync("orders.json")) {
    writeData([]); // Initialize with an empty array
}

app.post("/payment/create-order", async (req, res) => {
    try {
        const { amount, currency, receipt, notes } = req.body;

        const options = {
            amount: amount * 100, // Convert amount to paise
            currency,
            notes,
        };

        const order = await razorpay.orders.create(options);

        const orders = readData();
        orders.push({
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            status: "created",
        });
        writeData(orders);

        return res.json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error creating order");
    }
});

app.get("/payment-success", (req, res) => {
    res.send("Payment successful");
});

// Route to verify payment
app.post("/payment/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = razorpay.key_secret;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    try {
        const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
        if (isValidSignature) {
            const orders = readData();
            const order = orders.find((o) => o.order_id === razorpay_order_id);
            if (order) {
                order.status = "paid";
                order.payment_id = razorpay_payment_id;
                writeData(orders);
            }
            res.status(200).json({ status: "ok" });
            console.log("Payment verification successful");
        } else {
            res.status(400).json({ status: "verification_failed" });
            console.log("Payment verification failed");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Error verifying payment" });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:" + 5000);
});