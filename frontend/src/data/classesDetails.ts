import ClassesImage from "../assets/images/about_1_.jpg";
import ClassesImageOne from "../assets/images/class_img_4.jpg";
import ClassesImageTwo from "../assets/images/class_img_4.jpg";

type classSize = {
  childClass: string;
  classSize: string;
};

type age = {
  years: string;
  yearsAge: string;
};

export type classDetails = {
  id: number;
  img: string;
  url: string;
  urlText: string;
  header: string;
  time: string;
  info: string;
  size: classSize;
  age: age;
  category: string;
  urlPath: string;
};

export const classesDetails: classDetails[] = [
  {
    id: 1,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Nursery One",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in writing",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "See All",
    urlPath: "/featured",
  },
  {
    id: 2,
    img: ClassesImage,
    url: "/writing",
    urlText: "Mathematics",
    header: "Nursery Two",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Featured",
    urlPath: "/featured",
  },
  {
    id: 3,
    img: ClassesImage,
    url: "/writing",
    urlText: "English Language",
    header: "Primary One",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in English",
    size: {
      childClass: "Class Size :",
      classSize: " 30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: " 15 - 20",
    },
    category: "Featured",
    urlPath: "/featured",
  },
  {
    id: 4,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Featured",
    urlPath: "/Featured",
  },
  {
    id: 5,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: " 15 - 20",
    },
    category: "Featured",
    urlPath: "/featured",
  },
  {
    id: 6,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Popularity",
    urlPath: "/popularity",
  },
  {
    id: 7,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Featured",
    urlPath: "/featured",
  },
  {
    id: 8,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Popularity",
    urlPath: "/popularity",
  },
  {
    id: 9,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Trending",
    urlPath: "/trending",
  },
  {
    id: 10,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Trending",
    urlPath: "/trending",
  },
  {
    id: 11,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Trending",
    urlPath: "/trending",
  },
  {
    id: 12,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Trending",
    urlPath: "/trending",
  },
  {
    id: 13,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: " 15 - 20",
    },
    category: "Trending",
    urlPath: "/trending",
  },
  {
    id: 14,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Popularity",
    urlPath: "/popularity",
  },
  {
    id: 15,
    img: ClassesImage,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
    category: "Popularity",
    urlPath: "/popularity",
  },
];

export const classesDetailsOne = [
  {
    id: 1,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 2,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 3,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 4,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 5,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 6,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 7,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 8,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 9,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 10,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 11,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 12,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 13,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 14,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 15,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
];

export const classesDetailsTwo = [
  {
    id: 1,
    img: ClassesImageTwo,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 2,
    img: ClassesImageTwo,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 3,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 4,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 5,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 6,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: " 15 - 20",
    },
  },
  {
    id: 7,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 8,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 9,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 10,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 11,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 12,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 13,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 14,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
  {
    id: 15,
    img: ClassesImageOne,
    url: "/writing",
    urlText: "writing",
    header: "Imagination Classes",
    time: "Class Time : 08:00 am - 10:00 am",
    info: "We ensure your child becomes really good in mathematics",
    size: {
      childClass: "Class Size :",
      classSize: "30 - 40",
    },
    age: {
      years: "Years Old :",
      yearsAge: "15 - 20",
    },
  },
];
