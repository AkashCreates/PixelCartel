import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment,listAppointments,cancelAppointment,paymentRazorpay, verifyRazorpay } from '../controller/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser) 

userRouter.get('/get-profile',authUser,getProfile)
userRouter.get('/appointments',authUser,listAppointments)
userRouter.post('/update-profile',authUser,upload.single('image'),updateProfile)  // ✅ post, authUser before upload
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
export default userRouter