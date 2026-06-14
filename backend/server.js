import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import {v2 as cloudinary} from 'cloudinary'

//Debug logs
// console.log("Cloud Name:", process.env.CLOUDINARY_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY);
// console.log("API Secret Exists:", !!process.env.CLOUDINARY_API_SECRET);

//app config

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use('/api/admin',adminRouter)
//localhost:4000/api/admin/add-doctor
app.get('/',(req,res)=>{
    res.send('API WORKING')
})
app.listen(port,()=>console.log('listening on localhost:'+port))
//test api for cloudinary connection
app.get("/test-cloudinary", async (req, res) => {
  try {
    const result = await cloudinary.api.ping();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
//tesing 4 upload 
// app.get("/upload-test", async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(
//       "./uploads/1781359458270-doc8.png"
//     );

//     res.json(result);
//   } catch (error) {
//     console.log("UPLOAD TEST ERROR:", error);
//     res.json(error);
//   }
// });
//cloudinary config test
app.get('/cloudinary-config', (req,res)=>{
    res.json(cloudinary.config())
})

// app.get('/upload-test', async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(
//       'https://res.cloudinary.com/demo/image/upload/sample.jpg'
//     );

//     res.json(result);
//   } catch (error) {
//     console.log(error);
//     res.json(error);
//   }
// });
// app.get('/upload-test', async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png'
//     );

//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });
app.get('/upload-test', async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_dog.jpg'
    );

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});