// import Iphone from "../assets/images/iphone.png";
import Desktop from "../assets/icons/3ed90f4324e28c2129dbc027242ad6f7c5d9ed7c-591x333.webp"

import ApplestoreLogo from "../assets/icons/8dde3ede73ed109e81c9362474d3e3be3da1471c-132x44.svg";
import PlaystoreLogo from "../assets/icons/7e1d181be9ed50cbdb9e319b2abe6205f0420ec9-149x45 (1).svg";

const Android = () => {
  return (
    <div className="sm:w-4/5 mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row justify-between items-center">
      <div>
        <h1 className="text-3xl text-center font-bold mb-4 sm:text-left sm:w-[70%] leading-[1] sm:text-5xl">
          Available on web and mobile
        </h1>
        <p className="text-lg text-center sm:text-left md:text-lg text-gray-500 mb-8 md:mb-12 sm:w-4/5">
          Register to use our apps on web or click the links below to download
          the Wealth Home Academy mobile application.
        </p>
        <div className="flex items-center">
          <a href="#" className="mr-4">
            <img
              src={ApplestoreLogo}
              alt="App Store"
              className="w-[10rem] md:w-[12rem]"
            />
          </a>
          <a href="#">
            <img
              src={PlaystoreLogo}
              alt="Play Store"
              className="w-[11.5rem] md:w-[13rem]"
            />
          </a>
        </div>
      </div>
      <img src={Desktop} alt="iPhone" className="w-full mt-24 md:w-[50%] md:mt-0" />
      {/* <img src={Desktop} alt="iPhone" className="w-1/2 md:w-[20%] md:mt-0" /> */}
    </div>
  );
};

export default Android;
