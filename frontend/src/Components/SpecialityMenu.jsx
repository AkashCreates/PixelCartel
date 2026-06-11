// import { Link } from "react-router-dom";
// import { specialityData } from "../assets/assets_frontend/assets";

// const SpecialityMenu = () => {
//   return (
//     <div
//       className="flex flex-col items-center gap-4 py-16 text-gray-800"
//       id="speciality"
//     >
//       <h1 className="text-3xl font-medium">Find by Speciality</h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Browse through our extensive list of trusted doctors, schedule your
//         appointment hustle-free
//       </p>
//       <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll ">
//         {specialityData.map((item, index) => (
//           <Link onClick={() => window.scrollTo(0, 0)}
//             className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
//             key={index}
//             to={`/doctors/${item.speciality}`}
//           >
//             <img className="w-16 sm:w-24 mb-2 " src={item.image} alt="" />
//             <p>{item.speciality}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpecialityMenu;




import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="relative py-24 bg-gradient-to-b from-white to-lime-50"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6 text-gray-800">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Find by{" "}
            <span className="bg-gradient-to-r from-lime-600 to-green-700 bg-clip-text text-transparent">
              Speciality
            </span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-md mx-auto">
            Browse through our extensive list of trusted doctors, schedule your
            appointment hustle-free
          </p>
        </div>

        {/* Speciality List */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex flex-col items-center gap-3
                         border border-gray-200 rounded-xl p-4
                         hover:border-green-500 hover:shadow-sm
                         transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.speciality}
                className="w-12 sm:w-14"
              />
              <p className="text-xs sm:text-sm font-medium text-gray-700
                            group-hover:text-green-600">
                {item.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Decorative blur */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-lime-300/30 rounded-full blur-3xl"></div>
    </section>
  );
};

export default SpecialityMenu;

