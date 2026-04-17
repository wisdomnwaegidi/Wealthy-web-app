import { contents } from "../data/contents";
import Blogs from "../pages/Blogs";

const BlogPosts = () => {
  return (
    <div className="py-10 md:py-20 lg:py-40">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6 w-full max-w-7xl mx-auto">
        {contents.map((eachContent) => (
          <Blogs key={eachContent.id} {...eachContent} />
        ))}
      </section>
    </div>
  );
};

export default BlogPosts;
