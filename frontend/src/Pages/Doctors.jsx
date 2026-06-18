import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const SPECIALITIES = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    if (doctors?.length) {
      applyFilter();
    }
  }, [doctors, speciality]);

  const handleSpecialityClick = (item) => {
    if (speciality === item) {
      navigate("/doctors");
    } else {
      navigate(`/doctors/${item}`);
    }
    setShowFilter(false); // close panel on mobile after selecting
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Find Your Specialist Doctor
          </h1>
          <p className="text-gray-600 mt-3">
            Browse experienced doctors and book appointments instantly
          </p>
        </div>

        {/* Filter toggle button — mobile only */}
        <div className="flex md:hidden mb-4">
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
              border transition-all duration-300
              ${
                showFilter
                  ? "bg-gradient-to-r from-lime-600 to-green-700 text-white border-transparent shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-700"
              }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2" />
            </svg>
            {showFilter ? "Hide Filters" : "Show Filters"}
            {speciality && (
              <span className="ml-1 bg-white text-green-700 rounded-full px-2 py-0.5 text-xs font-bold">
                1
              </span>
            )}
          </button>

          {/* Clear filter chip — shown when a filter is active */}
          {speciality && (
            <button
              onClick={() => navigate("/doctors")}
              className="ml-3 flex items-center gap-1 px-4 py-2 rounded-full text-sm
                         bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition"
            >
              {speciality}
              <span className="text-base leading-none">&times;</span>
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-10">

          {/* Speciality Filter Panel */}
          <div
            className={`md:w-1/4 transition-all duration-300 overflow-hidden
              ${showFilter ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 md:max-h-none md:opacity-100"}`}
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg">
              <h3 className="font-semibold mb-4 text-gray-800">Specialities</h3>

              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-1">
                {SPECIALITIES.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSpecialityClick(item)}
                    className={`whitespace-nowrap text-sm px-4 py-2 rounded-xl transition-all duration-300
                      ${
                        speciality === item
                          ? "bg-gradient-to-r from-lime-600 to-green-700 text-white shadow-md scale-105"
                          : "bg-white text-gray-600 border border-gray-200 hover:bg-lime-50"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterDoc.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden
                           shadow-lg hover:shadow-2xl hover:-translate-y-3
                           transition-all duration-500 cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />
                  <span className={`absolute top-4 left-4 ${item.available ? "bg-green-500" : "bg-red-500"} text-white text-xs px-3 py-1 rounded-full flex items-center gap-1`}>
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-semibold group-hover:text-green-700">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">{item.speciality}</p>

                  <button
                    disabled={!item.available}
                    className={`mt-4 w-full py-2 rounded-xl text-sm font-medium text-white ${
                      item.available
                        ? "bg-gradient-to-r from-lime-600 to-green-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {item.available ? "Book Appointment" : "Unavailable"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filterDoc.length === 0 && (
          <p className="text-center text-gray-500 mt-20">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
