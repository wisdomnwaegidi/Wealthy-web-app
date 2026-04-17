import { Link } from "react-router-dom";
import Teacher from "../assets/images/teacher.jpg";
import Choose from "../assets/images/3dc3424b14.jpg";

const About = () => {
  return (
    <>
      <div className="img-abt py-20 px-4 md:py-40 md:px-20 mt-24 md:mt-24">
        <div className="sm:w-[50%] mx-auto">
          <h2 className="text-center sm:text-left text-3xl md:text-4xl text-white leading-tight tracking-tighter font-bold">
            A few things you should know about us
          </h2>
          <p className="text-white mt-3 mb-3 text-base md:text-lg text-center sm:text-left">
            Wealthy Homes Academy is a citadel of learning that teaches your
            child to become the champion they are designed to be.
          </p>
          <div className="flex justify-center sm:justify-start">
            <Link
              to="/Register"
              className="bg-prcolor text-white py-3 px-6 md:py-4 md:px-8 font-semibold inline-block mt-3 hover:text-white hover:bg-indigo-700 transition-colors duration-300">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <section className=" max-w-6xl mx-auto mt-16 md:mt-48 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
        <div className="mission">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-base md:text-lg">
            Our mission is to give your ward(s) a strong academic foundation
            that enables them to become sound and smart individuals while also
            providing them with a pedestal to achieve more in life, irrespective
            of their chosen careers.
          </p>
        </div>
        <div className=" grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Trust</h3>
            <p className="text-base md:text-lg">
              Trusting us will help foster a positive and productive teaching
              environment that impacts your wards academically, spiritually,
              mentally, and psychologically.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Integrity</h3>
            <p className="text-base md:text-lg">
              We are known for practicing uncompromising adherence to strong
              moral and ethical principles.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Transparency</h3>
            <p className="text-base md:text-lg">
              We operate in a way that makes it easy for you, our parents, to
              see the actions performed in making your children world-class.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
            <p className="text-base md:text-lg">
              As a team, we collaborate to achieve a common goal: to give your
              wards the best education they can get.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-16 md:mt-48 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">
        <div className="who">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Who We Are</h1>
          <p className="text-base md:text-lg">
            We know parents and guardians are always on the lookout for what is
            best for their children academically, and we know how painstaking
            and draining that search can be. That is why at Wealthy Homes
            Academy, we streamline the process for our dear parents/guardians
            while offering affordable yet quality education for your ward(s).
          </p>
        </div>

        <img
          src={Teacher}
          alt="teacher"
          className="w-full rounded-md shadow-md"
        />
      </section>

      <section className=" max-w-6xl mx-auto mt-16 md:mt-40 px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">
        <img
          src={Choose}
          alt="choose us"
          className="w-full rounded-md shadow-md"
        />

        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Us</h1>
          <p className="text-base md:text-lg">
            The Wealthy Homes Academy team is driven by our goal for the
            development and welfare of your children while ensuring constant
            communication with parents to provide feedback on their children's
            progress.
          </p>
        </div>
      </section>

      <main className="bg-kick-wrapper bg-cover bg-center py-20 md:py-32 flex flex-col items-center justify-center my-10 md:my-20">
        <p className="text-xl text-center font-semibold md:text-2xl text-white mb-6">
          Kickstart your ward(s) academic journey with us now!
        </p>
        <Link
          to="/Register"
          className="bg-prcolor text-white py-3 px-6 md:py-4 md:px-8 font-semibold hover:bg-indigo-700 transition-colors duration-300">
          Get Started
        </Link>
      </main>
    </>
  );
};

export default About;
