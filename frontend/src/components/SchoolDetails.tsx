import { FaPhone, FaEnvelope, FaHome } from "react-icons/fa";

const SchoolDetails = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start sm:items-center md:items-start w-full md:w-[1400px] mx-auto bg-darkerGreen p-6 md:p-10 mt-10 md:mt-12 gap-4 md:gap-0 sm:relative sm:top-[20px] sm:rounded-xl">
      <div className="flex items-center">
        <FaPhone className="text-white text-3xl mr-4" />
        <div>
          <p className="text-white font-semibold">Give us a Call</p>
          <a
            href="tel:+2348035388627"
            className="text-white font-semibold text-[1rem] hover:text-yellow-300">
            +234-803-538-8627
          </a>
        </div>
      </div>
      <div className="hidden md:block h-12 w-[2px] bg-white mx-8"></div>
      <div className="flex items-center">
        <FaEnvelope className="text-white text-3xl mr-4" />
        <div>
          <p className="text-white font-semibold">Send us a message</p>
          <a
            href="mailto:wealthyhomesacademy@gmail.com"
            className="text-white font-semibold text-[1rem] hover:text-yellow-300">
            wealthyhomesacademy@gmail.com
          </a>
        </div>
      </div>
      <div className="hidden md:block h-12 w-[2px] bg-white mx-8"></div>
      <div className="flex items-center">
        <FaHome className="text-white text-3xl mr-4" />
        <div>
          <p className="text-white font-semibold">Visit our location</p>
          <a
            href="#"
            className="text-white font-semibold  text-[1rem] hover:text-yellow-300">
            #39 Ojo Barracks Street Lagos Mainland
          </a>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetails;
