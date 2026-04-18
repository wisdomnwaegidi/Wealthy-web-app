import { Link } from "react-router-dom";

interface BlogsProps {
  id: number;
  deptLogo: string;
  dept: string;
  dmy: string;
  img: string;
  headerInfo: string;
  info: string;
}

const BlogPosts = ({
  id,
  deptLogo,
  dept,
  dmy,
  img,
  headerInfo,
  info,
}: BlogsProps) => {
  return (
    <div className="my-8 px-4 md:px-6 lg:px-8">
      <div className="flex items-center mb-4 md:mb-5">
        <img src={deptLogo} alt={dept} className="w-12 h-12 md:w-16 md:h-16 object-cover" />
        <h4 className="ml-3 text-lg md:text-xl font-semibold">{dept}</h4>
      </div>
      <div className="shadow-lg rounded-lg overflow-hidden">
        <img src={img} alt="blog-image" className="w-full h-64 md:h-80 object-cover" />
        <div className="p-4 md:p-6 lg:p-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3">{headerInfo}</h1>
          <h4 className="text-sm md:text-base lg:text-lg text-gray-600 mb-4">
            Written by WealthHomeAcademy Admin | {dmy}
          </h4>
          <p className="text-base md:text-lg mb-4">
            {`${info.substring(0, 90)}${info.length > 90 ? '...' : ''}`}
          </p>
          <Link to={`/eachblogpost/${id}`} className="inline-block bg-primary-color text-white bg-indigo-800 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
