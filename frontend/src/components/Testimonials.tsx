import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Mrs. Grace Johnson",
    role: "Parent",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    message:
      "Wealthy Academy has been a blessing to my family. My child has grown academically and morally, and the teachers are truly dedicated to every student's success.",
    rating: 5,
  },
  {
    id: 2,
    name: "Mr. Daniel Okafor",
    role: "Parent",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    message:
      "The learning environment is excellent, and I love how the school balances academics with character development. I highly recommend Wealthy Academy.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mrs. Esther Williams",
    role: "Parent",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    message:
      "Since enrolling my daughter here, I have seen tremendous improvement in her confidence, discipline, and academic performance. Truly outstanding!",
    rating: 5,
  },
];

export default function ParentTestimonials() {
  return (
    <section className='w-full py-20 bg-gray-50 mt-32'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Heading */}
        <div className='text-center mb-14'>
          <h1 className='text-4xl md:text-5xl font-bold text-[#001F3F] mb-4'>
            What Parents Say
          </h1>

          <p className='max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed'>
            Hear from our parents about their experiences with Wealthy Academy
            and how we continue to shape excellence in every child.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className='bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300'
            >
              {/* Quote Icon */}
              <div className='mb-6'>
                <FaQuoteLeft className='text-3xl text-prcolor' />
              </div>

              {/* Message */}
              <p className='text-gray-600 leading-relaxed mb-8'>
                {testimonial.message}
              </p>

              {/* Rating */}
              <div className='flex items-center gap-1 mb-6'>
                {[...Array(testimonial.rating)].map((_, index) => (
                  <FaStar key={index} className='text-yellow-400 text-lg' />
                ))}
              </div>

              {/* Parent Info */}
              <div className='flex items-center gap-4'>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className='w-14 h-14 rounded-full object-cover'
                  loading='lazy'
                />

                <div>
                  <h3 className='font-bold text-[#001F3F] text-lg'>
                    {testimonial.name}
                  </h3>
                  <p className='text-gray-500 text-sm'>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
