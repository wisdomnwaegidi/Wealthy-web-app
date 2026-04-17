import {  classesDetails, classesDetailsOne, classesDetailsTwo } from "./classesDetails";

export const classesHeader = [
  {
    id: 1,
    text: "See All",
    url: "/seeall",
    detail: classesDetails,
  },
  {
    id: 2,
    text: "Trending",
    url: "/trending",
    detail: classesDetailsOne,
  },
  {
    id: 3,
    text: "Popularity",
    url: "/popularity",
    detail: classesDetailsTwo,
  },
  {
    id: 4,
    text: "Featured",
    url: "/featured",
    detail: classesDetailsTwo,
  },
];


