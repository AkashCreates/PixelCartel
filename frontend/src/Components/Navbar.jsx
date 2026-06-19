import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const adminUrl = import.meta.env.VITE_ADMIN_URL || "https://health-bridgeadmin-git-main-adi-builds-projects.vercel.app";

  const logout = () =>{
    setToken(false)
    localStorage.removeItem('token')
  }

  const openAdminLogin = () => {
    window.location.href = adminUrl;
  }

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

        <button onClick={openAdminLogin} className="py-1 cursor-pointer">
          ADMIN
        </button>
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative group flex items-center gap-2 cursor-pointer z-10">
            {/* Profile */}
            <img
              className="w-9 h-9 rounded-full border border-gray-300 object-cover"
              src={userData.image}
              alt="Profile"
            />
            <img
              className="w-3 opacity-70 transition-transform group-hover:rotate-180"
              src={assets.dropdown_icon}
              alt=""
            />

            {/* Dropdown */}
            <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-20">
              <div className="min-w-48 bg-white border border-gray-200 rounded-xl shadow-lg p-3 flex flex-col text-sm text-gray-700">
                <p
                  onClick={() => navigate("/my-profile")}
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
                  onClick={logout}
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
            className="hidden md:block px-7 py-2.5 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />

        {/* Mobile menu — Bug 2 fixed: correct template literal with backtick */}
        <div
          className={`fixed top-0 right-0 bottom-0 bg-white overflow-hidden transition-all duration-300 md:hidden z-50 ${showMenu ? "w-full" : "w-0"}`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>

          {/* Bug 3 fixed: NavLink (capital L), not Navlink */}
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink  to="/" onClick={() => setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
            <NavLink  to="/doctors" onClick={() => setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
            <NavLink  to="/about" onClick={() => setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
            <NavLink  to="/contact" onClick={() => setShowMenu(false)}><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
            <button onClick={() => { setShowMenu(false); openAdminLogin(); }} className='px-4 py-2 rounded inline-block'>Admin</button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
