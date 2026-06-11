// import { useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets_frontend/assets";

// const Banner = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-16 my-20 md:mx-10 items-center">
//       {/* Left */}
//       <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-20">
//         <div className="text-white space-y-2">
//           <p className="text-3xl sm:text-4xl font-bold">Book Appointment</p>
//           <p className="text-xl sm:text-2xl font-medium">
//             With 100+ Trusted Doctors
//           </p>
//         </div>

//         <button
//           onClick={() => {
//             navigate("./login");
//             scrollTo(0, 0);
//           }}
//           className="mt-6 bg-white text-primary font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
//         >
//           Create Account
//         </button>
//       </div>

//       {/* Right Image */}
//       <div className="hidden md:flex justify-end md:w-1/2 lg:w-[370px]">
//         <img
//           className="w-full max-w-md object-contain"
//           src={assets.appointment_img}
//           alt="banner"
//         />
//       </div>
//     </div>
//   );
// };

// export default Banner;

import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col md:flex-row bg-gradient-to-r from-lime-600 to-green-700 rounded-2xl px-6 sm:px-10 md:px-14 lg:px-16 my-20 md:mx-10 overflow-hidden shadow-lg">
      {/* Left Content */}
      <div className="flex-1 py-10 md:py-16 lg:py-20">
        <div className="text-white space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug">
            Book Appointment
          </h2>
          <p className="text-xl sm:text-2xl font-medium">
            With 100+ Trusted Doctors
          </p>
        </div>

        <button
          onClick={() => {
            navigate("./login");
            scrollTo(0, 0);
          }}
          className="mt-6 inline-flex items-center justify-center bg-white text-green-600 font-semibold px-8 py-3 rounded-full shadow-lg 
                     hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          Create Account
        </button>
      </div>

      {/* Right Image */}
      <div className="hidden md:flex justify-end md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full max-w-md object-contain animate-float transition-transform duration-500"
          src={assets.appointment_img}
          alt="banner"
        />

        {/* Optional Decorative Circle */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Banner;
