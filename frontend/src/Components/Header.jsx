import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-lime-600 to-green-700 rounded-lg px-6 md:px-10 1g:px-20">
      {/* left side content */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md: py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With trusted doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Explore trusted medical specialists and schedule{" "}
            <br className="hidden sm:block  " /> appointments with ease—anytime,
            anywhere.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2   bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* right side content */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-1g"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
