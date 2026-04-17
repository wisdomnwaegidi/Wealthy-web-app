import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface FaqProps {
  question: string;
  answer: string;
}

const Faq = ({ question, answer }: FaqProps) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <article className="p-4 bg-darkcolor mb-4 rounded-[0.56rem] shadow-md">
      <header className="flex justify-between items-center">
        <h1 className="text-white font-semibold">{question}</h1>
        <button
          type="button"
          onClick={() => setShowInfo((prevInfo) => !prevInfo)}
          className="border-transparent w-8 h-8 bg-greencolor flex items-center justify-center rounded-full cursor-pointer ml-4 self-center min-w-8">
          {showInfo ? (
            <AiOutlineMinus className="text-white font-black" />
          ) : (
            <AiOutlinePlus className="text-white font-black" />
          )}
        </button>
      </header>
      {showInfo && <hr className="mt-4" />}

      {showInfo && <p className="text-white font-semibold mt-2">{answer}</p>}
    </article>
  );
};

export default Faq;
