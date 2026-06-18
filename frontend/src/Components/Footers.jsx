import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white mt-20 px-6 md:px-10 lg:px-20">
      {/* Main content */}
      <div className="max-w-7xl mx-auto py-16 grid sm:grid-cols-[3fr_1fr_1fr] gap-14 text-gray-700">
        
        {/* Left section */}
        <div className="space-y-4">
          <img
            onClick={() => navigate("/")}
            className="mb-5 w-44 cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />

          <p className="leading-6 text-gray-600">
            From finding the right doctor to booking appointments effortlessly,
            our platform ensures a smooth and stress-free healthcare experience.
            Trusted doctors, transparent services, and convenience — all at your
            fingertips.
          </p>
        </div>

        {/* Company links */}
        <div className="space-y-3">
          <p className="text-xl font-semibold mb-5">COMPANY</p>

          <ul className="flex flex-col gap-3">
            <li
              className="hover:text-green-600 cursor-pointer transition-colors"
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className="hover:text-green-600 cursor-pointer transition-colors"
              onClick={() => navigate("/about")}
            >
              About us
            </li>

            <li
              className="hover:text-green-600 cursor-pointer transition-colors"
              onClick={() => navigate("/contact")}
            >
              Contact us
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-3">
          <p className="text-xl font-semibold mb-5">GET IN TOUCH</p>

          <ul className="flex flex-col gap-3">
            <li className="hover:text-green-600 cursor-pointer transition-colors">
              +91 98765 43210
            </li>

            <li className="hover:text-green-600 cursor-pointer transition-colors">
              support@healthbridge.com
            </li>
          </ul>
        </div>
      </div>

      {/* Decorative Bottom */}
      <div className="relative border-t border-gray-200">
        <div className="absolute top-0 left-0 w-20 h-0.5 bg-lime-500"></div>
        <div className="absolute top-0 right-0 w-20 h-0.5 bg-lime-500"></div>

        <p className="text-center text-sm py-4 text-gray-500">
          &copy; 2026 HealthBridge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;