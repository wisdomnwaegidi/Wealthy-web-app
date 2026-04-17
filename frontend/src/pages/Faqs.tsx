import quizData from "../data/item";
import Faq from "./Faq";
import { FaQuestion } from "react-icons/fa";

const Faqs = () => {
  return (
    <main className="bg-white pt-40 min-h-screen flex flex-col">
      <div className="max-w-[47.25rem] mx-auto w-[90vw] rounded-lg p-10 grid grid-cols-1 gap-4 mb-60 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,3fr] gap-4">
          <h1 className="text-center md:text-left text-prcolor mb-5 font-bold text-4xl">
            Frequently Asked Questions?
          </h1>
          <section>
            {quizData.map((quiz) => (
              <Faq key={quiz.id} {...quiz} />
            ))}
          </section>
        </div>
      </div>
      <div className="relative flex-shrink-0">
        <FaQuestion
          className="absolute bottom-0 right-0 mr-10 text-prcolor opacity-50 mb-10"
          size={400}
        />
      </div>
    </main>
  );
};

export default Faqs;
