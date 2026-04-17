import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { ReactTyped, Typed } from "react-typed";

const Hero = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [typed, setTyped] = useState<Typed | undefined>();

  return (
    <main className='img min-h-[70vh] sm:min-h-[90vh] relative flex items-center'>
      <section className='w-full md:w-[80%] lg:w-[50%] flex flex-col mx-auto justify-center text-center pt-20 md:pt-6 px-4 md:px-0'>
        <h1 className='text-5xl md:text-5xl lg:text-[5rem] font-[700] tracking-tighter leading-tight md:leading-none mb-6 md:mb-9 mt-6 md:mt-9 text-white drop-shadow-2xl'>
          We turn your{" "}
          <span className='font-[800] relative inline-block'>
            {/* Shimmer + Typed Words */}
            <ReactTyped
              typedRef={setTyped}
              strings={["child", "kid", "ward"]}
              typeSpeed={100}
              backSpeed={50}
              loop
              className='bg-gradient-to-r from-amber-300 via-pink-500 to-blue-400 bg-clip-text text-transparent animate-shimmer'
            />
            {/* Optional glow behind text */}
            <span className='absolute inset-0 blur-xl opacity-30 bg-gradient-to-r from-amber-300 via-pink-500 to-blue-400 rounded-lg'></span>
          </span>{" "}
          into <span className='text-blcolor'>world</span> beaters!
        </h1>

        <p className='text-white font-[400] mb-8 md:mb-[2rem] text-base md:text-lg drop-shadow-md'>
          We take your wards from rookies to world class with our unique
          teaching facilities and competent teachers who make learning fun.
        </p>

        <div className='flex items-center justify-center space-x-2'>
          <Link
            to='/register'
            className='flex items-center text-white bg-gradient-to-br from-prcolor to-blcolor font-[600] hover:bg-purplecolor hover:text-white text-base py-3 px-6 md:py-6 md:px-10 md:text-[20px] rounded-full transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl'
          >
            Enrol your child
            <FaArrowRight className='ml-5 text-white' />
          </Link>
        </div>

        {/* Optional Controls for Demo */}
        {/* <div className='flex justify-center gap-2 mt-6'>
          <button
            onClick={() => typed?.start()}
            className='px-4 py-2 rounded bg-white text-black font-semibold'
          >
            Start
          </button>
          <button
            onClick={() => typed?.stop()}
            className='px-4 py-2 rounded bg-white text-black font-semibold'
          >
            Stop
          </button>
          <button
            onClick={() => typed?.reset()}
            className='px-4 py-2 rounded bg-white text-black font-semibold'
          >
            Reset
          </button>
        </div> */}
      </section>

      {/* Tailwind Shimmer Animation */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .animate-shimmer {
            background-size: 200% auto;
            animation: shimmer 3s linear infinite;
          }
        `}
      </style>
    </main>
  );
};

export default Hero;
