import { useState } from "react";
import { Link } from "react-router-dom";
// Assuming you updated the data file and interface as shown above
import { teachersData, TeacherData } from "../data/teachersData";
import { FaTwitter, FaFacebook, FaLinkedinIn, FaPlus } from "react-icons/fa";

// Interface for internal state tracking showIcons
interface Teacher extends TeacherData {
  showIcons: boolean;
}

export default function Teachers() {
  // 1. Initialize State: Map data and set showIcons to false for all
  const [teachers, setTeachers] = useState<Teacher[]>(
    teachersData.map((teacher) => ({ ...teacher, showIcons: false })),
  );

  const toggleIcons = (id: number) => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === id
          ? { ...teacher, showIcons: !teacher.showIcons }
          : teacher,
      ),
    );
  };

  return (
    <div className='container mx-auto py-16 text-center mt-32'>
      <h2 className='text-3xl md:text-4xl font-extrabold text-black mb-4'>
        Meet our Teachers
      </h2>
      <p className='text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-12'>
        Our dedicated teachers are passionate educators committed to nurturing
        excellence, building confidence, and guiding every student toward
        academic success and strong character development.
      </p>
      {/* 2. GRID CONTAINER (using grid instead of flex for rigid structure) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 justify-center max-w-7xl mx-auto px-6'>
        {teachers
          .map((teacher) => {
            const {
              id,
              img,
              names,
              title,
              socials: { facebook, twitter, linkedin },
              showIcons,
            } = teacher;

            return (
              <section className='flex flex-col items-center' key={id}>
                {/* IMAGE CONTAINER */}
                <div className='relative w-full aspect-[1/1] overflow-visible mb-6'>
                  <img
                    src={img}
                    alt={names}
                    // Matches the rounded corner and slight overlay effect in image
                    className='w-full h-full object-cover rounded-md shadow-sm brightness-90'
                    loading='lazy'
                  />

                  {/* --- 3. THE DARK OVERLAY (Conditionally Rendered) --- */}
                  {/* inset-0 makes it fill the container; bg-black/60 adds the color/transparency */}
                  {showIcons && (
                    <div
                      className='absolute inset-0 bg-prcolor/60 rounded-md transition-opacity duration-300 z-10'
                      aria-hidden='true' // Hide from screen readers
                    />
                  )}

                  {/* --- 4. ICON CLUSTER CONTAINER (Exact Placement) --- */}
                  {/* Positioned in bottom-left, items aligned horizontally. z-20 puts it above the overlay */}
                  <div className='absolute -bottom-5 left-4 flex items-center gap-2 z-20'>
                    {/* The PLUS Button (Pink/Magenta Gradient) */}
                    <button
                      type='button'
                      title='Toggle social media links'
                      onClick={() => toggleIcons(id)}
                      className={`p-4 rounded-full shadow-lg transition-all duration-300 transform flex items-center justify-center
                       bg-gradient-to-br from-pink-400 to-red-500
                       ${showIcons ? "rotate-45" : "rotate-0"}`}
                    >
                      <FaPlus className='text-white text-xl' />
                    </button>

                    {/* 5. Social Icons - Conditional rendering with Fade-in */}
                    {showIcons && (
                      <div className='flex items-center gap-2 transition-opacity duration-300 animate-fadeIn'>
                        {/* Facebook - Green circle */}
                        <Link
                          to={facebook.link}
                          target='_blank'
                          rel='noreferrer'
                          aria-label='Facebook Profile'
                          className={`${facebook.color} p-3 rounded-full shadow-md text-white hover:scale-110 transition-transform flex items-center justify-center`}
                        >
                          <FaFacebook className='text-xl' />
                        </Link>
                        {/* Twitter - Orange circle */}
                        <Link
                          to={twitter.link}
                          target='_blank'
                          rel='noreferrer'
                          aria-label='Twitter Profile'
                          className={`${twitter.color} p-3 rounded-full shadow-md text-white hover:scale-110 transition-transform flex items-center justify-center`}
                        >
                          <FaTwitter className='text-xl' />
                        </Link>
                        {/* LinkedIn - Teal circle (used instead of WhatsApp to match 'in' logo) */}
                        <Link
                          to={linkedin.link}
                          target='_blank'
                          rel='noreferrer'
                          aria-label='LinkedIn Profile'
                          className={`${linkedin.color} p-3 rounded-full shadow-md text-white hover:scale-110 transition-transform flex items-center justify-center`}
                        >
                          <FaLinkedinIn className='text-xl' />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* 6. TEXT AREA (Bold Name & Job Title) */}
                <div className='text-center mt-3'>
                  {/* Bold, Navy text */}
                  <h2 className='font-extrabold text-[#001F3F] text-2xl tracking-tight leading-tight'>
                    {names}
                  </h2>
                  {/* Gray title */}
                  <p className='text-gray-500 font-normal text-base mt-1.5'>
                    {title}
                  </p>
                </div>
              </section>
            );
          })
          .slice(0, 4)}
      </div>

      <div className='flex justify-center mt-10'>
        <Link
          to='/all-teachers'
          className='font-medium bg-purplecolor text-white py-4 px-12 hover:bg-prcolor transition-all rounded-full shadow-lg'
        >
          See all Teachers
        </Link>
      </div>
    </div>
  );
}
