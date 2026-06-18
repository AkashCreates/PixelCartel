import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
  const {dToken,profileData,setProfileData,getProfileData,backendUrl} = useContext(DoctorContext)

  const {currency,} = useContext(AppContext)
  const [isEdit,setIsEdit] = useState(false)

  const updateProfile = async()=>{
    try {

      const updateData = {
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available 
      }

      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])

  return profileData && (
    <div className='m-5'>
      <div className='flex flex-col gap-6 sm:flex-row max-w-4xl'>

        <div className='shrink-0'>
          <img className='bg-primary/80 w-full sm:w-64 rounded-lg' src={profileData.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='text-3xl font-medium text-gray-700'>{profileData.name}</p>

          <div className='flex items-center gap-2 mt-2 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          <div className='mt-4'>
            <p className='text-sm font-medium text-neutral-800'>About :</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1 leading-relaxed'>{profileData.about}</p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment Fees: <span className='text-gray-800'>{currency} {isEdit ? <input type="number" onChange={(e)=>setProfileData(prev =>({...prev,fees: e.target.value}))} value={profileData.fees} /> : profileData.fees}</span>
          </p>

          <div className='flex gap-2 py-3 text-sm text-gray-600'>
            <p className='font-medium text-gray-800'>Address :</p>
            <div>
              <p>{isEdit ? <input type="text" onChange={(e)=>setProfileData(prev =>({...prev,address:{...prev.address,line1: e.target.value}}))} value={profileData.address.line1} /> : profileData.address.line1}</p>
              <p>{isEdit ? <input type="text" onChange={(e)=>setProfileData(prev =>({...prev,address:{...prev.address,line2: e.target.value}}))} value={profileData.address.line2} /> : profileData.address.line2}</p>
            </div>
          </div>

          <div className='flex items-center gap-2 pt-2'>
            <input onChange={()=> isEdit && setProfileData(prev => ({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" readOnly />
            <label className='text-sm text-gray-600' htmlFor="">Available</label>
          </div>

          {
            isEdit ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button> : 
            <button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          }

          
          
        </div>

      </div>
    </div>
  )
}

export default Profile