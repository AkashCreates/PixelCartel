import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req, res) => {
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "Availability changed successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API for doctor login
const loginDoctor = async(req,res)=>{
    try {
        const {email,password}=req.body
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false, message:'Doctor not found'})
        }

        const isMatch = await bcrypt.compare(password,doctor.password)
        if(isMatch){
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
            res.json({success:true, message:'Doctor logged in successfully',token})
        }else{
            res.json({success:false, message:'Invalid credentials'})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get doctor appointments for doctor panel
const appointmentsDoctor = async(req,res)=>{
    try {
        
        const docId = req.docId
        const appointments = await appointmentModel.find({docId})
        res.json({success:true,appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to mark appointment as completed for doctor panel
const appointmentCompleted = async(req,res)=>{
    try {
        const docId = req.docId
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

       if (appointmentData && appointmentData.docId.toString() === docId) {

        await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
        res.json({success:true, message:'Appointment marked as completed successfully'})
       }else{
        res.json({success:false, message:'Invalid appointment id'}) 
       }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to cancel appointment for doctor panel
const appointmentCancelled = async(req,res)=>{
    try {
        const docId = req.docId
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

       if (appointmentData && appointmentData.docId.toString() === docId) {

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
        res.json({success:true, message:'Appointment cancelled successfully'})
       }else{
        res.json({success:false, message:'Cancellation failed'}) 
       }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get dashboard data for doctor panel
const doctorDashboard = async(req,res)=>{
    try {
        const docId = req.docId

        const appointments = await appointmentModel.find({docId})

        let earnings = 0 

        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        })

        let patients =[]

        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId) 
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,5),
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get doctor profile to Doc Panel
const doctorProfile = async(req,res)=>{
    try {
        const docId = req.docId
        const docData = await doctorModel.findById(docId).select('-password')
        res.json({success:true, docData})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
//API to update doctor profile to Doc Panel
const updateDoctorProfile = async(req,res)=>{
    try {
        const docId = req.docId
        const {fees,address,available} = req.body

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
        res.json({success:true, message:'Profile updated successfully'})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export { changeAvailability, doctorList,loginDoctor,appointmentsDoctor,appointmentCompleted,appointmentCancelled,doctorDashboard,doctorProfile,updateDoctorProfile }
