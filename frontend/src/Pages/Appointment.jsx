import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useEffect, useState, useContext } from "react";
import { assets } from "../assets/assets_frontend/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch doctor info
  const fetchDocInfo = () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  // Generate available slots
  const getAvailableSlots = () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() + 1);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  //  Hooks at top level
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log("Available Slots:", docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Doctor Info */}
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md p-6">
          <div className="flex-shrink-0">
            <img
              src={docInfo.image}
              alt=""
              className="w-56 h-56 object-cover rounded-lg bg-gray-100"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            {/* Name */}
            <p className="text-2xl font-semibold flex items-center gap-2">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" className="w-5" />
            </p>

            {/* Degree & Experience */}
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-gray-600">
                {docInfo.degree} • {docInfo.speciality}
              </p>
              <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
                {docInfo.experience}
              </span>
            </div>

            {/* About */}
            <div className="space-y-1">
              <p className="font-medium flex items-center gap-1">
                About
                <img src={assets.info_icon} alt="" className="w-4" />
              </p>
              <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
            </div>

            {/* Fee */}
            <p className="text-lg font-medium">
              Appointment Fee:
              <span className="ml-2 text-green-700 font-semibold">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <p className="text-xl font-semibold text-gray-900">Booking Slots</p>

          {/* Days Scroll */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
                  }}
                  className={`min-w-[90px] text-center p-3 rounded-xl cursor-pointer transition-all
                  ${
                    slotIndex === index
                      ? "bg-gradient-to-r from-lime-600 to-green-700 text-white shadow-md scale-105"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <p className="text-sm font-medium">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-lg font-semibold">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          {/* Time Slots Scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`min-w-[90px] text-center px-4 py-2 rounded-full text-sm cursor-pointer transition-all
                  ${
                    slotTime === item.time
                      ? "bg-gradient-to-r from-lime-600 to-green-700 text-white shadow-md scale-105"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.time.toLowerCase()}
                </div>
              ))}
          </div>

          {/* Selected Slot */}
          {slotTime && (
            <p className="text-sm text-gray-600">
              Selected slot:
              <span className="ml-2 font-medium text-green-700">
                {daysOfWeek[docSlots[slotIndex][0].datetime.getDay()]},{" "}
                {docSlots[slotIndex][0].datetime.getDate()} •{" "}
                {slotTime.toLowerCase()}
              </span>
            </p>
          )}

          {/* CTA */}
          <div className="flex justify-end pt-4">
            <button
              disabled={!slotTime}
              className={`px-10 py-3 rounded-full font-semibold transition-all
              ${
                slotTime
                  ? "bg-gradient-to-r from-lime-600 to-green-700 text-white hover:opacity-90 hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    )
  );

  // return (
  //   docInfo && (
  //     <div>
  //       {/* Render doctor information or appointment form here */}
  //       <div>
  //         <div>
  //           <img src={docInfo.image} alt="" />
  //         </div>

  //         <div>
  //           {/* doc info  */}
  //           <p>
  //             {docInfo.name} <img src={assets.verified_icon} alt="" />
  //           </p>
  //           <div>
  //             <p>
  //               {docInfo.degree} - {docInfo.speciality}
  //             </p>
  //             <button>{docInfo.experience}</button>
  //           </div>

  //           {/* about  */}

  //           <div>
  //             <p>
  //               About <img src={assets.info_icon} alt="" />
  //             </p>
  //             <p>{docInfo.about}</p>
  //           </div>

  //           <p>
  //             Appointment fee{" "}
  //             <span>
  //               {currencySymbol}
  //               {docInfo.fees}
  //             </span>
  //           </p>
  //         </div>
  //       </div>

  //       {/* slots */}
  //       <div>
  //         <p>Booking Slots</p>
  //         <div>
  //           {docSlots.length &&
  //             docSlots.map((item, index) => (
  //               <div key={index}>
  //                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
  //                 <p>{item[0] && item[0].datetime.getDate()}</p>
  //               </div>
  //             ))}
  //         </div>

  //         <div>{docSlots.length && docSlots[slotIndex].map((item,index)=>(<p key={index}> {item.time.toLowerCase()}</p>))}</div>
  //       </div>
  //     </div>
  //   )
  // );
};

export default Appointment;
