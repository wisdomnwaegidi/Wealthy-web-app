import React from "react";
import { Link } from "react-router-dom";

interface ClassDetails {
  id: number;
  img: string;
  url: string;
  urlText: string;
  header: string;
  time: string;
  info: string;
  size: {
    childClass: string;
    classSize: string;
  };
  age: {
    years: string;
    yearsAge: string;
  };
}

interface ClassDetailsProps {
  classes: ClassDetails[];
}

const ClassesDetail: React.FC<ClassDetailsProps> = ({ classes }) => {
  return (
    <>
      {classes.map((item) => {
        const {
          id,
          img,
          url,
          urlText,
          header,
          time,
          info,
          size: { childClass, classSize },
          age: { years, yearsAge },
        } = item;
        return (
          <div
            key={id}
            className="bg-white rounded-lg shadow-md overflow-hidden md:flex md:flex-col text-left"
          >
            <div className="overflow-hidden">
              <img
                src={img}
                alt="classes-image"
                className="w-full h-auto hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
            <div className="p-4">
              <div className="mb-4">
                <Link
                  to={url}
                  className="text-white cursor-pointer bg-blue-500 px-4 py-2 rounded-md hover:bg-transparent hover:text-blue-500 hover:border-blue-500 hover:border-2"
                >
                  {urlText}
                </Link>
              </div>

              <h4 className="text-xl md:text-2xl font-bold mb-2">
                <Link
                  to={url}
                  className="text-gray-800 hover:text-blue-500 transition-colors duration-300"
                >
                  {header}
                </Link>
              </h4>
              <p className="mb-2">{time}</p>
              <p className="mb-4">{info}</p>
              <div className="flex items-center gap-4 text-sm">
                <p className="text-gray-600">
                  {childClass} <span className="font-bold">{classSize}</span>
                </p>
                <div className="w-px h-4 bg-gray-300"></div>
                <p className="text-gray-600">
                  {years} <span className="font-bold">{yearsAge}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ClassesDetail;
