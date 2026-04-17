import { useState, useEffect } from "react";
import ClassesDetail from "./ClassesDetail";
import Buttons from "../components/Buttons";
import { classesDetails, classDetails } from "../data/classesDetails";

const allButtons: string[] = [
  ...new Set(
    classesDetails.map((eachClass: classDetails) => eachClass.category)
  ),
];

const StudentClasses: React.FC = () => {
  const [classes, setClasses] = useState<classDetails[]>([]);
  const [allCategoriesBtn] = useState({ allButtons: allButtons });
  const [displayCount, setDisplayCount] = useState<number>(6);
  const [selectedCategory, setSelectedCategory] = useState<string>("See All");

  const filterButtons = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSeeMore = () => {
    setDisplayCount((prevCount) => prevCount + 3);
  };

  useEffect(() => {
    if (selectedCategory === "See All") {
      setClasses(classesDetails.slice(0, displayCount));
    } else {
      const newData = classesDetails.filter(
        (eachClass) => eachClass.category === selectedCategory
      );
      setClasses(newData.slice(0, displayCount));
    }
  }, [selectedCategory, displayCount]);

  useEffect(() => {
    setDisplayCount(6);
  }, [selectedCategory]);

  const allItemsDisplayed: boolean = classes.length === classesDetails.length;

  return (
    <div className="mt-44 container mx-auto w-4/5 text-center mb-60">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Our Popular Classes
        </h1>
        <p className="text-lg md:text-xl font-semibold mt-4">
          Here is a section of classes in our great citadel of learning. This is
          where we <br className="hidden md:block" /> take your wards on
          destination wow!
        </p>
      </div>
      <Buttons
        allCategoriesBtn={allCategoriesBtn.allButtons}
        filterButtons={filterButtons}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <ClassesDetail classes={classes} />
      </div>
      {selectedCategory === "See All" && !allItemsDisplayed && (
        <div className="flex justify-center mt-8">
          <button type="button"
            className="bg-prcolor text-white py-4 px-8 text-lg font-bold  hover:bg-purple-600 transition-colors duration-300"
            onClick={handleSeeMore}
          >
            See More Classes
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentClasses;
