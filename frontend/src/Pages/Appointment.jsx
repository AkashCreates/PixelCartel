import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useEffect, useState, useContext, useCallback } from "react";
import { assets } from "../assets/assets_frontend/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  // Store selected slot as { time, datetime } instead of raw string to avoid locale mismatch
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Inline into useEffect to avoid stale closure issues
  useEffect(() => {
    if (!doctors || !docId) return;
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info || null);
  }, [doctors, docId]);

  // Generate available slots — runs whenever docInfo changes
  const getAvailableSlots = useCallback(() => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        // Start from the next half-hour boundary
        const mins = currentDate.getMinutes();
        if (mins < 30) {
          currentDate.setMinutes(30, 0, 0);
        } else {
          // Past :30 — jump to the next full hour
          currentDate.setHours(currentDate.getHours() + 1, 0, 0, 0);
        }
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];

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

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  }, []);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo, getAvailableSlots]);

  // Derived display values — safe because we guard with selectedSlot
  const selectedDay =
    selectedSlot
      ? daysOfWeek[selectedSlot.datetime.getDay()]
      : null;

  const selectedDate =
    selectedSlot ? selectedSlot.datetime.getDate() : null;

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

        {/* Days Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index);
                setSelectedSlot(null); // clear selected time when day changes
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
          {docSlots[slotIndex]?.map((item, index) => {
            // Compare by datetime timestamp for reliability (not string)
            const isSelected =
              selectedSlot &&
              selectedSlot.datetime.getTime() === item.datetime.getTime();

            return (
              <div
                key={index}
                onClick={() => setSelectedSlot(item)}
                className={`min-w-[90px] text-center px-4 py-2 rounded-full text-sm cursor-pointer transition-all
                ${
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

        {/* Selected Slot */}
        {selectedSlot && (
          <p className="text-sm text-gray-600">
            Selected slot:
            <span className="ml-2 font-medium text-green-700">
              {selectedDay}, {selectedDate} • {selectedSlot.time.toLowerCase()}
            </span>
          </p>
        )}

        {/* CTA */}
        <div className="flex justify-end pt-4">
          <button
            disabled={!selectedSlot}
            className={`px-10 py-3 rounded-full font-semibold transition-all
            ${
              selectedSlot
                ? "bg-gradient-to-r from-lime-600 to-green-700 text-white hover:opacity-90 hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;