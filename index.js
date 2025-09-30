import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import enquiryInsert from './app1/controller/web/enquiryController.js';
import Adminrouter from './app1/routes/web/Adminroutes.js';
import DashRouter from './app1/routes/web/Dashroutes.js';
import Readrouter from './app1/routes/web/Enquiryreadrouter.js';
import Contentenquiryadd from './app1/routes/web/EnquiryContentadd.js';
import listrouter from './app1/routes/web/listcontentRouter.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Setup
const allowedOrigins = [
  "https://manojbhattarai7.com.np",
  "http://127.0.0.1:5500"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) {
      // Allow requests like Postman or mobile apps with no origin
      return callback(null, true);
    }
    if(allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Optional: Global error handler for CORS
app.use((err, req, res, next) => {
  if(err && err.message === 'Not allowed by CORS'){
    return res.status(403).json({ error: err.message });
  }
  next();
});

// Routes
app.use('/api/website/enquiry', enquiryInsert);
app.use('/api/website/read', Readrouter);
app.use('/api/website/admin', Adminrouter);
app.use('/api/admin/dashboard', DashRouter);
app.use('/api/website/content', Contentenquiryadd);
app.use('/api/website/content', listrouter);

// MongoDB Connection & Server Start
mongoose.connect(process.env.dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
    const port = process.env.port || 8050;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
})
.catch(err => console.error("MongoDB connection error:", err));
