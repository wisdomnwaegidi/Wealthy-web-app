"use client";

import { useState } from "react";
import Learn from "../assets/images/feat-icon-1.png";
import Parent from "../assets/images/feat-icon-2.png";
import Expert from "../assets/images/feat-icon-3.png";
import Music from "../assets/images/feat-icon-4.png";
import Video from "../assets/videos/class-details-video.mp4";
import About from "../assets/images/about_1_.jpg";
import { FaPlay, FaTimes } from "react-icons/fa";

export default function Welcome() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className='sm:w-4/5 mx-auto px-4 md:px-8 py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
          {/* LEFT */}
          <div>
            <div className='mb-12'>
              <h1 className='text-3xl sm:text-5xl font-bold mb-4 leading-tight'>
                Welcome to Wealthy Homes Academy
              </h1>
              <p className='text-lg text-gray-600'>
                Here is what you can expect from us
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
              {[
                {
                  img: Learn,
                  title: "Trust",
                  color: "text-green-500",
                  desc: "We create a positive and productive learning environment.",
                },
                {
                  img: Parent,
                  title: "Integrity",
                  color: "text-blue-500",
                  desc: "We uphold strong moral and ethical principles.",
                },
                {
                  img: Expert,
                  title: "Transparency",
                  color: "text-orange-500",
                  desc: "Parents clearly see how we build their children.",
                },
                {
                  img: Music,
                  title: "Collaboration",
                  color: "text-pink-500",
                  desc: "We work together to give the best education.",
                },
              ].map((item, i) => (
                <div key={i} className='flex items-start group'>
                  <img
                    src={item.img}
                    alt='icon'
                    className='mr-4 w-10 transition-transform duration-300 group-hover:scale-110'
                  />
                  <div>
                    <p className={`font-bold text-lg ${item.color}`}>
                      {item.title}
                    </p>
                    {/* <div className='w-16 h-1 bg-gray-300 my-2 group-hover:bg-black transition-all'></div> */}
                    <p className='text-gray-600 text-sm'>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className='relative w-full h-[400px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl group'>
            {/* Image with zoom */}
            <img
              src={About}
              alt='child'
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
            />

            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-tr from-black/70 via-purple-800/60 to-indigo-900/70'></div>

            {/* Content */}
            <div className='absolute inset-0 flex flex-col justify-between p-8'>
              {/* Text */}
              <div>
                <h2 className='text-white text-2xl font-bold'>
                  The future of learning is here
                </h2>
                <p className='text-gray-200 text-sm mt-2'>
                  Discover how we build world-class students
                </p>
              </div>

              {/* Play Button */}
              <button
                type='button'
                onClick={() => setOpen(true)}
                className='inline-flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 w-fit group'
              >
                <div className='bg-white p-3 rounded-full shadow-lg group-hover:scale-110 transition'>
                  <FaPlay className='text-purple-600 text-sm' />
                </div>
                <span className='text-white font-semibold group-hover:text-black'>
                  Watch Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🎬 VIDEO MODAL */}
      {open && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md'>
          {/* Close Button */}
          <button
            title='video'
            onClick={() => setOpen(false)}
            className='absolute top-6 right-6 text-white text-2xl hover:scale-110 transition'
          >
            <FaTimes />
          </button>

          {/* Video */}
          <div className='w-[90%] md:w-[700px] rounded-xl overflow-hidden shadow-2xl'>
            <video src={Video} controls autoPlay className='w-full h-full' />
          </div>
        </div>
      )}
    </>
  );
}
