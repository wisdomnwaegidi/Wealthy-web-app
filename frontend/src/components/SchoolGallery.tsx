import { useState } from "react";
import { Link } from "react-router-dom";

const galleryItems = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
    category: "PAINTING",
    className: "row-span-2",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    category: "PAINTING",
    className: "col-span-2",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
    category: "STUDY",
    className: "row-span-2",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    category: "PHOTOGRAPHY",
    className: "",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=80",
    category: "WRITING",
    className: "row-span-2",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    category: "WRITING",
    className: "",
  },
];

const categories = [
  { label: "Show All", value: "ALL", color: "text-[#f4b400]" },
  { label: "Painting", value: "PAINTING", color: "text-[#d35454]" },
  { label: "Study", value: "STUDY", color: "text-[#8e44ad]" },
  { label: "Photography", value: "PHOTOGRAPHY", color: "text-[#c0398c]" },
  { label: "Writing", value: "WRITING", color: "text-[#3498db]" },
];

export default function SchoolGallery() {
  const [active, setActive] = useState("ALL");

  const filtered =
    active === "ALL"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active);

  return (
    <section className='w-full  py-20 mt-32'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Heading */}
        <div className='text-center mb-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-[#062B4B] mb-4'>
            Our School Gallery
          </h1>
          <p className='text-gray-500 text-sm max-w-xl mx-auto leading-relaxed'>
            A glimpse into student life — from creative arts and photography to
            study sessions and school events.
          </p>
        </div>

        {/* Categories */}
        <div className='flex flex-wrap justify-center gap-6 mb-12 text-xs font-semibold uppercase tracking-wide'>
          {categories.map(({ label, value, color }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`${color} transition-all pb-0.5 ${
                active === value
                  ? "border-b-2 border-current opacity-100"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Gallery Layout */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-0 max-w-5xl mx-auto'>
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`overflow-hidden group relative cursor-pointer ${
                active === "ALL" ? item.className : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.category}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                loading='lazy'
              />
              {/* Hover overlay with category label */}
              <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                <span className='text-white text-xs font-bold uppercase tracking-widest'>
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className='flex justify-center mt-10'>
          <Link
            to='/gallery'
            className='bg-[#4CD964] text-white text-xs font-bold uppercase px-8 py-3 shadow-md hover:scale-105 transition-all duration-300'
          >
            View All Photos
          </Link>
        </div>
      </div>
    </section>
  );
}
