import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 cursor-pointer bg-blue-500 text-white p-4 md:p-5 rounded-full hover:bg-blue-600 transition-colors duration-300"
      onClick={scrollToTop}
    >
      <FaArrowUp className="text-lg md:text-xl" />
    </div>
  );
};

export default ScrollToTopButton;
