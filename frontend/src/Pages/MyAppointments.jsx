import { useContext, useState, useEffect, } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])
  const months = [' '+'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const navigate = useNavigate()

  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " +dateArray[2]
  }
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        console.log(data.appointments) // 🔍 TEMP: check console for "cancelled" field type/value on each item
        setAppointments(data.appointments.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order)=>{

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
         console.log(response);

         try {
          
          const{data} = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, {headers:{token}})
          if(data.success){
            toast.success(data.message)
            getUserAppointments()
            navigate('/my-appointments')
          }else{
            toast.error(data.message)
          }

         } catch (error) {
          console.log(error);
          toast.error(error.message)
         }

      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async(appointmentId)=>{
    try {
      const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay', {appointmentId}, {headers:{token}})
      if(data.success){
        initPay(data.order)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <div className='mb-8 flex flex-col gap-2 border-b pb-5'>
        <p className='text-2xl font-semibold text-gray-800'>My appointments</p>
      </div>
      <div className='flex flex-col gap-4'>
        {appointments.map((item, index) => (
          <div className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5' key={item._id}>
            <div className='flex flex-col gap-4 sm:flex-row sm:items-start'>

              {/* Doctor Image */}
              <div className='h-36 w-36 shrink-0 overflow-hidden rounded-xl bg-lime-50'>
                <img className='h-full w-full object-cover object-top' src={item.docData.image} alt={item.docData.name} />
              </div>

              {/* Doctor Info */}
              <div className='flex flex-1 flex-col gap-1 text-sm text-gray-600'>
                <p className='text-base font-semibold text-gray-900'>{item.docData.name}</p>
                <p className='text-primary font-medium'>{item.docData.speciality}</p>
                <p className='mt-2 font-medium text-gray-700'>Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
                <p className='mt-2'>
                  <span className='font-medium text-gray-700'>Date & Time: </span>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Actions */}
              <div className='flex shrink-0 flex-col gap-2 sm:items-end'>
                {!item.cancelled && item.payment && <button className='sm:min-w-48 py-2 border rounded border-green-50 text-stone-500' >Paid</button>}
                {item.cancelled !== true && !item.payment && <button onClick={()=>appointmentRazorpay(item._id)} className='w-40 rounded-full border border-primary py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white'>
                  Pay Online
                </button>}
                {item.cancelled !== true && <button onClick={()=>cancelAppointment(item._id)} className='w-40 rounded-full border border-red-400 py-2 text-sm font-medium text-red-400 transition hover:bg-red-400 hover:text-white'>
                  Cancel Appointment
                </button>}
                {item.cancelled === true && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments