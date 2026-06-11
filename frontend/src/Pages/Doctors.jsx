import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

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

  // 🔥 TOGGLE SPECIALITY
  const handleSpecialityClick = (item) => {
    if (speciality === item) {
      navigate("/doctors"); // unselect
    } else {
      navigate(`/doctors/${item}`); // select
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Find Your Specialist Doctor
          </h1>
          <p className="text-gray-600 mt-3">
            Browse experienced doctors and book appointments instantly
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Speciality Filter */}
          <div className="md:w-1/4">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg">
              <h3 className="font-semibold mb-4">Specialities</h3>

              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
                {[
                  "General physician",
                  "Gynecologist",
                  "Dermatologist",
                  "Pediatricians",
                  "Neurologist",
                  "Gastroenterologist",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (speciality === item) {
                        navigate("/doctors");
                      } else {
                        navigate(`/doctors/${item}`);
                      }
                    }}
                    className={`text-sm px-4 py-2 rounded-xl transition-all duration-300
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
                  <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Available
                  </span>
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-semibold group-hover:text-green-700">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">{item.speciality}</p>

                  <button
                    className="mt-4 w-full py-2 rounded-xl text-sm font-medium
                                     bg-gradient-to-r from-lime-600 to-green-700 text-white"
                  >
                    Book Appointment
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
