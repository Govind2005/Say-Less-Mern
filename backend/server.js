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

import { fileURLToPath } from "url";

const validateWebhookSignature = Razorpay.validateWebhookSignature;
export { validateWebhookSignature };

const app = express();

// Get the current file directory using import.meta.url
const __filename = new URL('', import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// console.log(__dirname);

app.use(cors());
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
// const PAYMENT_PORT = process.env.PAYMENT_PORT || 5000;

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

    const num = '+919119682899';
    console.log(num)
    if (!num) {
        return res.status(400).json({ message: "Phone number is required", success: false });
    }
    const formattedNumber = `whatsapp:${num}`;  // Prefix the number with 'whatsapp:'

    try {
        const response_D = client.messages.create({
                body: req.body.message,
                from: 'whatsapp:+14155238886', // This is Twilio's WhatsApp sandbox number
                to: formattedNumber
        })
        return res.status(200).json({message: "Whatsapp Create successfully"})
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: err})
    }
    
    
})

app.get("/",(req,res)=>{
    return res.json("hello");
})

app.post("/",(req,res)=> {
    return res.send("post it is");
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
            console.log("Payment verification successful");
            return res.status(200).json({ status: "ok" });
        } else {
            console.log("Payment verification failed");
            return res.status(400).json({ status: "verification_failed" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", message: "Error verifying payment" });
    }
});

const otpStore = new Map(); // Temporary in-memory store for OTPs
// Sending OTP
app.post("/send-otp", async (req, res) => {
    // const { phone } = req.body;
    const phone  = "+91XXXXXXXXXX";
    if (!phone) {
        console.log(phone);
      return res.status(400).json({ message: "Phone number is required" });
    }
  
    // Generate a 6-digit OTP
    // const otp = Math.floor(100000 + Math.random() * 900000);
    const otp = 456789;
    // Store OTP with expiration (e.g., 5 minutes)
    
    otpStore.set(phone, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
  
    try {
      await client.messages.create({
        body: `Your OTP is: ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone, // Use user-provided phone number
      });
      console.log(otp);
      return res.json({ success:true,message: "OTP sent successfully" });
    } catch (error) {
      console.error("Twilio Error:", error);
      return res.status(500).json({ message: "Error sending OTP", error });
    }
  });

// Verify OTP
app.post("/verify-otp", (req, res) => {
    // const { phone, otp } = req.body;
    const { otp } = req.body;
    const phone = "+91XXXXXXXXXX";
    console.log(otp);
    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP are required" });
    }
    console.log('nigger2',phone);
    const storedOtp = otpStore.get(phone);
  
    if (!storedOtp) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }
  
    if (Date.now() > storedOtp.expiresAt) {
      otpStore.delete(phone);
      return res.status(400).json({ message: "OTP expired" });
    }
  
    if (parseInt(otp) !== storedOtp.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  
    otpStore.delete(phone); // Remove OTP after successful verification
    return res.json({ message: "OTP verified successfully" });
});

// Cloudinary SetUp
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));