import express from 'express'
import { doctorList, loginDoctor, appointmentsDoctor,appointmentCancelled,appointmentCompleted,doctorDashboard,doctorProfile,updateDoctorProfile } from '../controller/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList);
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);
doctorRouter.get('/profile', authDoctor, doctorProfile);
doctorRouter.post('/login', loginDoctor);
doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancelled);
doctorRouter.post('/complete-appointment',authDoctor,appointmentCompleted);
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile);

export default doctorRouter