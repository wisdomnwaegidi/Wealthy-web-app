import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Subjects = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 py-[3rem] sm:py-[7rem] mt-[7rem]">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-center">
          Explore Our Subjects
        </h1>
        <p className="text-center sm:text-2xl mt-4">
          Don't just take our word for it
        </p>
      </div>

      <div className="slider-container overflow-hidden">
        <Slider
          {...settings}
          arrows={false}
          swipe={false}
          swipeToSlide={false}
          className="custom-slider">
          <div className="p-12 rounded-3xl text-white bg-prcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              Mathematics
            </h3>
            <p className="text-center">
              Dive into the world of precision and logic with our Mathematics
              courses. From basic arithmetic to advanced calculus, we equip you
              with the tools to solve real-world problems and build a foundation
              for success in any field. Mathematics is not just about numbers;
              it is about unlocking the potential of your mind.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-white bg-prcolor">
            <h3 className="text-center text-xl font-semibold pb-4">English</h3>
            <p className="text-center">
              Words have the power to inspire, captivate, and persuade. Our
              English courses empower you to express yourself with confidence.
              Whether it is literature analysis, creative writing, or effective
              communication skills, we guide you through the nuances of
              language, opening doors to a world of endless possibilities.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-white bg-prcolor">
            <h3 className="text-center text-xl font-semibold mb- pb-4">
              Civic Studies
            </h3>
            <p className="text-center">
              Explore the dynamics of society, politics, and governance in our
              Civic Studies classes. Develop a deep understanding of your role
              as a responsible citizen, and discover how you can actively
              contribute to shaping a just and equitable world. Empower yourself
              with knowledge and be the change you want to see.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-white bg-prcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              Physical Health Education
            </h3>
            <p className="text-center">
              In our Physical Education programs, we go beyond the gym to
              promote a holistic approach to health and well-being. From team
              sports to individual fitness routines, discover the joy of
              movement and cultivate habits that will keep you physically and
              mentally fit for a lifetime.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-white bg-prcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              Religion and National Values
            </h3>
            <p className="text-center">
              Religion and National Values celebrate the rich tapestry of
              beliefs and cultures that define our society. Gain insights into
              the values that bind us as a nation and learn to appreciate the
              diversity that makes us unique. In an increasingly interconnected
              world, understanding different perspectives is the key to building
              bridges of harmony and cooperation.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-white bg-prcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              Social Skills
            </h3>
            <p className="text-center">
              Unleash the power of effective communication and interpersonal
              dynamics with our Social Skills courses. From active listening to
              conflict resolution, we guide you through the art of building
              meaningful connections. Equip yourself with the tools to thrive in
              both personal and professional relationships.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-white bg-prcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              French Language
            </h3>
            <p className="text-center">
              Immerse yourself in the beauty of the French language. Our courses
              blend linguistic expertise with cultural richness, allowing you to
              not only speak French but also understand the nuances of its
              elegance. Join us on a journey to broaden your horizons and
              connect with the Francophone world.
            </p>
          </div>
        </Slider>
      </div>
      <div className="slider-container overflow-hidden mt-10">
        <Slider
          {...settings}
          arrows={false}
          swipe={false}
          swipeToSlide={false}
          className="custom-slider">
          <div className="p-12 rounded-3xl text-black bg-blcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              Mathematics
            </h3>
            <p className="text-center">
              Dive into the world of precision and logic with our Mathematics
              courses. From basic arithmetic to advanced calculus, we equip you
              with the tools to solve real-world problems and build a foundation
              for success in any field. Mathematics is not just about numbers;
              it is about unlocking the potential of your mind.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-black  bg-blcolor">
            <h3 className="text-center text-xl font-semibold pb-4">English</h3>
            <p className="text-center">
              Words have the power to inspire, captivate, and persuade. Our
              English courses empower you to express yourself with confidence.
              Whether it is literature analysis, creative writing, or effective
              communication skills, we guide you through the nuances of
              language, opening doors to a world of endless possibilities.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-black bg-blcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              Civic Studies
            </h3>
            <p className="text-center">
              Explore the dynamics of society, politics, and governance in our
              Civic Studies classes. Develop a deep understanding of your role
              as a responsible citizen, and discover how you can actively
              contribute to shaping a just and equitable world. Empower yourself
              with knowledge and be the change you want to see.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-black bg-blcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              Physical Health Education
            </h3>
            <p className="text-center">
              In our Physical Education programs, we go beyond the gym to
              promote a holistic approach to health and well-being. From team
              sports to individual fitness routines, discover the joy of
              movement and cultivate habits that will keep you physically and
              mentally fit for a lifetime.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-black bg-blcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              Religion and National Values
            </h3>
            <p className="text-center">
              Religion and National Values celebrate the rich tapestry of
              beliefs and cultures that define our society. Gain insights into
              the values that bind us as a nation and learn to appreciate the
              diversity that makes us unique. In an increasingly interconnected
              world, understanding different perspectives is the key to building
              bridges of harmony and cooperation.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-black bg-blcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              Social Skills
            </h3>
            <p className="text-center">
              Unleash the power of effective communication and interpersonal
              dynamics with our Social Skills courses. From active listening to
              conflict resolution, we guide you through the art of building
              meaningful connections. Equip yourself with the tools to thrive in
              both personal and professional relationships.
            </p>
          </div>
          <div className="p-12 rounded-3xl text-black bg-blcolor">
            <h3 className="text-center text-xl font-semibold pb-4">
              French Language
            </h3>
            <p className="text-center">
              Immerse yourself in the beauty of the French language. Our courses
              blend linguistic expertise with cultural richness, allowing you to
              not only speak French but also understand the nuances of its
              elegance. Join us on a journey to broaden your horizons and
              connect with the Francophone world.
            </p>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Subjects;
