export default function Announcement() {
  const announcements = [
    {
      title: "School Resumption Notice",
      date: "April 15, 2026",
      category: "Important",
      description:
        "All students are expected to resume for the new academic term on April 15th. Ensure all fees are cleared before resumption.",
    },
    {
      title: "Mid-Term Examination",
      date: "May 10, 2026",
      category: "Academic",
      description:
        "Mid-term exams will begin on May 10th. Students should prepare accordingly and check the timetable.",
    },
    {
      title: "Inter-House Sports",
      date: "June 2, 2026",
      category: "Event",
      description:
        "Our annual inter-house sports competition will take place at the school field. Parents are invited.",
    },
  ];

  return (
    <section className='max-w-6xl mx-auto px-4 sm:px-6 mt-16'>
      {/* Header */}
      <div className='mb-10 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
          📢 Announcements
        </h2>
        <p className='text-gray-500 mt-2'>
          Stay updated with the latest school information
        </p>
      </div>

      {/* Cards */}
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {announcements.map((item, index) => (
          <div
            key={index}
            className='bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 group'
          >
            {/* Category Badge */}
            <span className='inline-block mb-3 text-xs font-semibold px-3 py-1 rounded-full bg-prcolor/10 text-prcolor'>
              {item.category}
            </span>

            {/* Title */}
            <h3 className='text-lg font-semibold text-gray-800 group-hover:text-prcolor transition'>
              {item.title}
            </h3>

            {/* Date */}
            <p className='text-sm text-gray-400 mt-1'>{item.date}</p>

            {/* Description */}
            <p className='text-gray-600 mt-4 text-sm leading-relaxed'>
              {item.description}
            </p>

            {/* Action */}
            <button className='mt-6 text-sm font-medium text-prcolor hover:underline'>
              Read more →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
