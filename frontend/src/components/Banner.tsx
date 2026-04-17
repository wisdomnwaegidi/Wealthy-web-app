import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-img sm:w-4/5 mx-auto sm:rounded-3xl p-16 my-24">
      <div className="flex flex-col items-center text-center p-5">
        <h1 className="text-white font-semibold text-xl sm:text-2xl">
          Discover how we teach your child to become brilliant.
        </h1>
        <Link
          to="/Register"
          className="bg-yellow-400 inline-block py-4 px-12 mt-5 font-semibold hover:bg-yellow-600 rounded-full">
          Register ward{" "}
        </Link>
      </div>
    </div>
  );
};

export default Banner;
