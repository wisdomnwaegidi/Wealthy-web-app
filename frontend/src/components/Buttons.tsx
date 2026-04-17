interface ButtonsProps {
  filterButtons: (category: string) => void;
  allCategoriesBtn: string[];
}

const Buttons: React.FC<ButtonsProps> = ({ filterButtons, allCategoriesBtn }) => {
  return (
    <div className="flex justify-center mt-8 mb-4 px-4 overflow-x-auto">
      <div className="flex flex-nowrap gap-2 md:gap-4">
        {allCategoriesBtn.map((singleButton, index) => (
          <button
            type="button"
            key={index}
            onClick={() => filterButtons(singleButton)}
            className="bg-prcolor text-white py-2 px-4 md:py-3 md:px-6 rounded-full font-semibold text-xs sm:text-base md:text-lg mx-1 my-1 hover:bg-purplecolor focus:bg-darkcolor transition-colors duration-300 cursor-pointer whitespace-nowrap"
          >
            {singleButton}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Buttons;
