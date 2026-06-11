import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { use, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="h-0.5 border-none outline-none bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="h-0.5 border-none outline-none bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="h-0.5 border-none outline-none bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="h-0.5 border-none outline-none bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate("/myprofile")} className="hover:text-black cursor-pointer">My Profile</p>
                <p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">My Appointments</p>
                <p onClick={()=>{setToken(false)}} className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className=" bg-primary text-white  px-8 py-3 rounded-full font-semibold hidden md:block"
          >
            Create Account
          </button>
        )}
      </div> */}

      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative group flex items-center gap-2 cursor-pointer">
            {/* Profile */}
            <img
              className="w-9 h-9 rounded-full border border-gray-300 object-cover"
              src={assets.profile_pic}
              alt="Profile"
            />
            <img
              className="w-3 opacity-70 transition-transform group-hover:rotate-180"
              src={assets.dropdown_icon}
              alt=""
            />

            {/* Dropdown */}
            <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-20">
              <div
                className="min-w-48 bg-white border border-gray-200 rounded-xl
                        shadow-lg p-3 flex flex-col text-sm text-gray-700"
              >
                <p
                  onClick={() => navigate("/myprofile")}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 text-red-500 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block px-7 py-2.5 rounded-full
                 bg-primary text-white font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
