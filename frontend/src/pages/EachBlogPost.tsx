import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { contents } from "../data/contents";

const EachBlogPost = () => {
  const [blogContent, setBlogContent] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const newBlog = contents.find((content) => content.id === parseInt(id || "0"));
    if (newBlog) {
      setBlogContent(newBlog.info);
    }
    return;
  }, [id]);

  return (
    <div className="mt-40 mb-24 w-[70%] mx-auto">
      <div>
        <h1>Blogs</h1>
        <div className="mt-16 text-black">{blogContent}</div>
      </div>
      <div className="mt-8">
        <Link
          to="/blog-&-articles"
          className="bg-indigo-800 text-white font-semibold py-2.5 px-4 rounded-lg mb-64"
        >
          Return to Blogs
        </Link>
      </div>
    </div>
  );
};

export default EachBlogPost;