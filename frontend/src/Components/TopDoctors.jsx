// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AppContext } from "../Context/AppContext";

// const TopDoctors = () => {
//   const navigate = useNavigate();
//   const {doctors} = useContext(AppContext);

//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
//       <h1 className="text-3xl font-medium">Top Doctors to Book</h1>

//       <p className="sm:w-1/3 text-center text-sm">
//         Simply browse through our extensive list of trusted doctors
//       </p>

//       {/* Grid Section */}
//       <div className="w-full grid grid-cols-[var(--auto-grid)] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
//         {doctors.slice(0, 10).map((item, index) => (
//           <div
//             key={index}
//             onClick={() => navigate(`/appointment/${item._id}`)}
//             className="border border-lime-400 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
//           >
//             <img className="bg-lime-50" src={item.image} alt="" />
//             <div className="p-4">
//               <div className="flex items-center gap-2 text-sm text-green-500">
//                 <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                 <p>Available</p>
//               </div>

//               <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//               <p className="text-gray-600 text-sm">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* More Button */}
//       <button
//         onClick={() => {
//           navigate("/doctors");
//           scrollTo(0, 0);
//         }}
//         className="bg-lime-50 text-gray-600 px-12 py-3 rounded-full mt-10"
//       >
//         more
//       </button>
//     </div>
//   );
// };

// export default TopDoctors;






import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="my-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6 text-gray-900">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Top{" "}
            <span className="bg-gradient-to-r from-lime-600 to-green-700 bg-clip-text text-transparent">
              Doctors
            </span>{" "}
            to Book
          </h1>

          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-md mx-auto">
            Simply browse through our extensive list of trusted doctors
          </p>
        </div>

        {/* Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
          {doctors.slice(0, 8).map((item,index) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden
                         cursor-pointer shadow-md hover:shadow-2xl
                         hover:-translate-y-3 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative">
                <img
                  className="w-full h-52 object-cover bg-lime-50"
                  src={item.image}
                  alt={item.name}
                />

                <span className={`absolute top-4 left-4 ${item.available ? "bg-green-500/90" : "bg-red-500/90"}  text-white text-xs px-3 py-1 rounded-full flex items-center gap-1`}>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Available
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-gray-900 text-lg font-semibold group-hover:text-green-600 transition">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="mt-14 px-12 py-3 rounded-full text-sm font-semibold
                     bg-gradient-to-r from-lime-600 to-green-700 text-white
                     shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          View All Doctors
        </button>
      </div>
    </section>
  );
};

export default TopDoctors;

