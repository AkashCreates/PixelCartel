import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useEffect, useState, useContext, useCallback } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    userData,
    getDoctorsData,
  } = useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (!doctors || !docId) return;
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info || null);
  }, [doctors, docId]);

  const getAvailableSlots = useCallback(() => {
    if (!docInfo) return;

    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        const mins = currentDate.getMinutes();
        if (mins < 30) {
          currentDate.setMinutes(30, 0, 0);
        } else {
          currentDate.setHours(currentDate.getHours() + 1, 0, 0, 0);
        }
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];

      while (currentDate < endTime) {
        // Build slotDate and slotTime to check against booked slots
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;

        const slotTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Only add slot if it's not already booked
        const isSlotAvailable =
          !docInfo.slots_booked[slotDate] ||
          !docInfo.slots_booked[slotDate].includes(slotTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: slotTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  }, [docInfo]);

  const bookAppointment = async () => {
    if (!docInfo.available) {
      toast.error("Doctor is currently unavailable");
      return;
    }

    if (!token) {
      toast.error("Please login to book an appointment");
      navigate("/login");
      return;
    }

    const isProfileIncomplete =
      !userData ||
      !userData.phone ||
      userData.phone === "0000000000" ||
      !userData.address ||
      !userData.address.line1 ||
      !userData.address.line2 ||
      !userData.gender ||
      userData.gender === "Not Selected" ||
      !userData.dob ||
      userData.dob === "Not Selected";

    if (isProfileIncomplete) {
      toast.error("Please complete your profile before booking an appointment");
      navigate("/my-profile");
      return;
    }

    if (!selectedSlot) {
      return toast.error("Please select a slot");
    }

    try {
      const date = selectedSlot.datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;
      const slotTime = selectedSlot.time;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo, getAvailableSlots]);

  const selectedDay = selectedSlot
    ? daysOfWeek[selectedSlot.datetime.getDay()]
    : null;

  const selectedDate = selectedSlot
    ? selectedSlot.datetime.getDate()
    : null;

  if (!docInfo) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Doctor Info */}
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md p-6">
        <div className="flex-shrink-0">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="w-56 h-56 object-cover rounded-lg bg-gray-100"
          />
        </div>

        <div className="flex-1 space-y-4">
          <p className="text-2xl font-semibold flex items-center gap-2">
            {docInfo.name}
            <img src={assets.verified_icon} alt="Verified" className="w-5" />
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <p className="text-gray-600">
              {docInfo.degree} • {docInfo.speciality}
            </p>
            <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
              {docInfo.experience}
            </span>
            <span className={`px-3 py-1 text-sm rounded-full font-medium ${
              docInfo.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {docInfo.available ? "Available" : "Unavailable"}
            </span>
          </div>

          <div className="space-y-1">
            <p className="font-medium flex items-center gap-1">
              About
              <img src={assets.info_icon} alt="" className="w-4" />
            </p>
            <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
          </div>

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

        {/* Days */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index);
                setSelectedSlot(null);
              }}
              className={`min-w-[90px] text-center p-3 rounded-xl cursor-pointer transition-all ${
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

        {/* Time Slots */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {docSlots[slotIndex]?.map((item, index) => {
            const isSelected =
              selectedSlot &&
              selectedSlot.datetime.getTime() === item.datetime.getTime();

            return (
              <div
                key={index}
                onClick={() => setSelectedSlot(item)}
                className={`min-w-[90px] text-center px-4 py-2 rounded-full text-sm cursor-pointer transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-lime-600 to-green-700 text-white shadow-md scale-105"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.time.toLowerCase()}
              </div>
            );
          })}
        </div>

        {selectedSlot && (
          <p className="text-sm text-gray-600">
            Selected slot:
            <span className="ml-2 font-medium text-green-700">
              {selectedDay}, {selectedDate} • {selectedSlot.time.toLowerCase()}
            </span>
          </p>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={bookAppointment}
            disabled={!selectedSlot || !docInfo.available}
            className={`px-10 py-3 rounded-full font-semibold transition-all ${
              selectedSlot && docInfo.available
                ? "bg-gradient-to-r from-lime-600 to-green-700 text-white hover:opacity-90 hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {docInfo.available ? "Book Appointment" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;