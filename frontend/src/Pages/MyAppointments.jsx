import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)
  const appointmentDate = '25 June 2026'
  const appointmentTime = '8:30 PM'

  return (
    <div className='min-h-[70vh] py-10 text-sm'>
      <div className='mb-8 flex flex-col gap-2 border-b pb-5'>
        <p className='text-2xl font-semibold text-gray-800'>My appointments</p>
        <p className='max-w-xl text-gray-500'>Manage your upcoming doctor visits, payments, and appointment changes from one place.</p>
      </div>

      <div className='flex flex-col gap-5'>
        {doctors.slice(0, 2).map((item) => (
          <div className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5' key={item._id}>
            <div className='grid gap-5 md:grid-cols-[144px_1fr_auto] md:items-center'>
              <div className='h-36 w-36 overflow-hidden rounded-xl bg-lime-50'>
                <img className='h-full w-full object-cover object-top' src={item.image} alt={item.name} />
              </div>

              <div className='min-w-0 space-y-3 text-gray-600'>
                <div>
                  <div className='mb-2 flex flex-wrap items-center gap-2'>
                    <p className='text-lg font-semibold text-gray-900'>{item.name}</p>
                    <span className='rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700'>Confirmed</span>
                  </div>
                  <p>{item.speciality}</p>
                </div>

                <div>
                  <p className='font-medium text-gray-800'>Address</p>
                  <p>{item.address.line1}</p>
                  <p>{item.address.line2}</p>
                </div>

                <div className='flex flex-wrap gap-3'>
                  <span className='rounded-full border border-gray-200 px-4 py-2 text-gray-700'>{appointmentDate}</span>
                  <span className='rounded-full border border-gray-200 px-4 py-2 text-gray-700'>{appointmentTime}</span>
                </div>
              </div>

              <div className='flex flex-col gap-3 md:min-w-48'>
                <button className='rounded-lg bg-primary px-6 py-3 font-medium text-white transition-all duration-300 hover:opacity-90'>Pay Online</button>
                <button className='rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-600 transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600'>Cancel appointment</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
