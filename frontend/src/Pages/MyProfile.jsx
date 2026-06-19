import { useState } from "react"
import { assets } from "../assets/assets_frontend/assets"
import { useContext } from "react"
import { AppContext } from "../Context/AppContext"
import { toast } from "react-toastify"
import axios from "axios"

const MyProfile = () => {

  const {userData,setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage]= useState(false)

  const updateUserProfileData = async()=>{
     try {
      const formData = new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('dob',userData.dob)
      formData.append('gender',userData.gender)

      image && formData.append('image',image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
      }else{
        toast.error(data.message)
      }

     } catch (error) {
      console.log(error)
      toast.error(error.message)
     }
  }

  return userData && (
    <div className="max-w-3xl mx-auto my-12 flex flex-col gap-5 text-sm bg-white/90 border border-lime-100 rounded-3xl shadow-xl shadow-lime-100/60 p-6 sm:p-10">
      {
        isEdit ?
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer group">
            <img className="w-36 h-36 object-cover rounded-3xl opacity-80 ring-4 ring-lime-100 shadow-lg transition group-hover:opacity-60" src={image ? URL.createObjectURL(image):userData.image} alt="" />
            <img className="w-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md" src={image ? '': assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>:
        <img className="w-36 h-36 object-cover rounded-3xl ring-4 ring-lime-100 shadow-lg" src={userData.image} alt="" />
      }
      

    {
      isEdit ? 
      <input className="bg-lime-50/70 border border-lime-200 rounded-xl px-4 py-2 text-3xl font-semibold max-w-80 mt-2 outline-none focus:ring-2 focus:ring-lime-300" type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))}/>:
      <p className="font-semibold text-4xl text-neutral-900 tracking-tight">{userData.name}</p>
    }

    <hr className="border-lime-100" />
    <div className="bg-lime-50/60 border border-lime-100 rounded-2xl p-5">
      <p className="text-lime-700 font-semibold uppercase tracking-wide">CONTACT INFORMATION</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-3 gap-x-5 mt-4 text-neutral-700">
        <p className="font-medium">Email id:</p>
        <p className="text-green-700 font-medium break-all">{userData.email}</p>
        <p className="font-medium">Phone:</p>
         {
      isEdit ? 
      <input className="bg-white border border-lime-200 rounded-lg px-3 py-2 max-w-56 outline-none focus:ring-2 focus:ring-lime-300" type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))}/>:
      <p className="text-neutral-600">{userData.phone}</p>
    }
    <p className="font-medium">Address:</p>
    {
      isEdit ? <p>
        <input className="bg-white border border-lime-200 rounded-lg px-3 py-2 mb-2 outline-none focus:ring-2 focus:ring-lime-300" onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} value={userData.address.line1} type="text" />
        <br />
        <input className="bg-white border border-lime-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-lime-300" onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} value={userData.address.line2} type="text" />
      </p>
      :<p className="text-neutral-600 leading-6">{userData.address.line1}
      <br />
      {userData.address.line2}
      </p>
    }
      </div>
    </div>
    <div className="bg-white border border-lime-100 rounded-2xl p-5 shadow-sm">
      <p className="text-lime-700 font-semibold uppercase tracking-wide">BASIC INFO</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-3 gap-x-5 mt-4 text-neutral-700">
        <p className="font-medium">Gender:</p>
        {
      isEdit ?
      <select className="max-w-28 bg-white border border-lime-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-lime-300" name="" id="" value={userData.gender} onChange={e => setUserData(prev => ({...prev, gender: e.target.value}))}>
        <option value="Not Selected">Not Selected</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select> 
      :<p className="text-neutral-600">{userData.gender}</p>
    }
    <p className="font-medium">Birth Date:</p>
    {
      isEdit ? <input className="max-w-40 bg-white border border-lime-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-lime-300" type= "date" onChange={e => setUserData(prev => ({...prev, dob: e.target.value}))} value={userData.dob}/>
      : <p className="text-neutral-600">{userData.dob}</p>
    }
      </div>
    </div>
    <div className="mt-2">
      {
        isEdit ? 
        <button className="bg-gradient-to-r from-lime-600 to-green-700 text-white px-10 py-3 rounded-full font-semibold shadow-lg shadow-lime-200 hover:scale-105 transition-all" onClick={updateUserProfileData}>Save</button>:
        <button className="bg-gradient-to-r from-lime-600 to-green-700 text-white px-10 py-3 rounded-full font-semibold shadow-lg shadow-lime-200 hover:scale-105 transition-all" onClick={() => setIsEdit(true)}>Edit</button>
      }
    </div>
    </div>
  )
}

export default MyProfile
