import Logo from "../assets/images/wealthy-logo.png";
import Img from "../assets/images/56716d89e6.jpg";

const days: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const day: number = new Date().getDay();
const year: number = new Date().getFullYear();
const month: number = new Date().getMonth();
const date: number = new Date().getDate();

const newDate = (): string => {
  let suffix: string;

  if (date === 1) {
    suffix = "st";
  } else if (date === 2) {
    suffix = "nd";
  } else if (date === 3 || date === 23) {
    suffix = "rd";
  } else {
    suffix = "th";
  }

  return `${date}${suffix}`;
};

export type Content = {
  id: number;
  dept: string;
  img: string;
  deptLogo: string;
  dmy: string;
  headerInfo: string;
  info: string;
};

export const contents: Content[] = [
  {
    id: 1,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 10 websites for children to learn Maths",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolorem sed nemo consequuntur nam debitis in tempora fugit, rem fugiat facere dolorum expedita deleniti modi, libero, delectus magni? Consequuntur perferendis modi omnis animi aut pariatur eos debitis blanditiis, mollitia soluta ullam suscipit recusandae aliquid totam laudantium. Neque distinctio incidunt ducimus, expedita, natus voluptatibus quisquam aspernatur possimus odit id sit perferendis deserunt dolorem necessitatibus impedit similique aut voluptatum? Animi aperiam mollitia vero ut similique deleniti nulla voluptas cupiditate iure sunt debitis quasi quaerat laudantium perspiciatis officia tempora ratione sequi dolores ducimus, ab non esse molestias. Magnam non veniam, culpa, harum atque mollitia sint quia fuga tempore commodi ratione ad officiis natus. Id aut nisi dolorem cumque aliquid consectetur, earum accusantium aspernatur nam et ut culpa quis sed iste iusto quo. Reprehenderit ratione excepturi, porro nesciunt eligendi doloremque itaque dolorum nulla voluptatum consequuntur saepe explicabo temporibus inventore quas ipsam necessitatibus corrupti. Dicta, non. Quos illum nulla natus tempora sunt, dicta, a excepturi id ipsum, pariatur fuga optio dolorem aliquid? Ratione nostrum vitae explicabo cum in dolore, quia voluptatem esse error minima at optio rerum sapiente? Eligendi rerum quia quo, ex ullam quis. Consequatur at amet reprehenderit? Enim facere dignissimos quisquam quibusdam eos ab itaque expedita, nobis et repellendus vero error beatae, voluptatem molestias autem fuga eaque cum excepturi accusantium explicabo impedit illum esse modi. Quas dolor commodi accusamus id iure veniam enim fugiat facilis excepturi, laudantium ab alias ipsam dolores et recusandae dolorem quis totam hic exercitationem dignissimos laboriosam. Numquam magnam repellat, quis praesentium sunt facilis ad quod possimus consequuntur rerum aut quo, iste esse obcaecati? Laborum dignissimos dolore iure ex, veniam illum consequuntur. Consectetur nemo impedit cum dolores architecto est autem ullam aperiam exercitationem dolorum, veniam doloremque illum ipsam deserunt eius? Iure molestiae blanditiis impedit illum labore fugit ipsa sunt molestias.",
  },
  {
    id: 2,
    deptLogo: Logo,
    dept: "English Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Words that make up the English language",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolorem sed nemo consequuntur nam debitis in tempora fugit, rem fugiat facere dolorum expedita deleniti modi, libero, delectus magni? Consequuntur perferendis modi omnis animi aut pariatur eos debitis blanditiis, mollitia soluta ullam suscipit recusandae aliquid totam laudantium. Neque distinctio incidunt ducimus, expedita, natus voluptatibus quisquam aspernatur possimus odit id sit perferendis deserunt dolorem necessitatibus impedit similique aut voluptatum? Animi aperiam mollitia vero ut similique deleniti nulla voluptas cupiditate iure sunt debitis quasi quaerat laudantium perspiciatis officia tempora ratione sequi dolores ducimus, ab non esse molestias. Magnam non veniam, culpa, harum atque mollitia sint quia fuga tempore commodi ratione ad officiis natus. Id aut nisi dolorem cumque aliquid consectetur, earum accusantium aspernatur nam et ut culpa quis sed iste iusto quo. Reprehenderit ratione excepturi, porro nesciunt eligendi doloremque itaque dolorum nulla voluptatum consequuntur saepe explicabo temporibus inventore quas ipsam necessitatibus corrupti. Dicta, non. Quos illum nulla natus tempora sunt, dicta, a excepturi id ipsum, pariatur fuga optio dolorem aliquid? Ratione nostrum vitae explicabo cum in dolore, quia voluptatem esse error minima at optio rerum sapiente? Eligendi rerum quia quo, ex ullam quis. Consequatur at amet reprehenderit? Enim facere dignissimos quisquam quibusdam eos ab itaque expedita, nobis et repellendus vero error beatae, voluptatem molestias autem fuga eaque cum excepturi accusantium explicabo impedit illum esse modi. Quas dolor commodi accusamus id iure veniam enim fugiat facilis excepturi, laudantium ab alias ipsam dolores et recusandae dolorem quis totam hic exercitationem dignissimos laboriosam. Numquam magnam repellat, quis praesentium sunt facilis ad quod possimus consequuntur rerum aut quo, iste esse obcaecati? Laborum dignissimos dolore iure ex, veniam illum consequuntur. Consectetur nemo impedit cum dolores architecto est autem ullam aperiam exercitationem dolorum, veniam doloremque illum ipsam deserunt eius? Iure molestiae blanditiis impedit illum labore fugit ipsa sunt molestias.",
  },
  {
    id: 3,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 20 speaking countries",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolorem sed nemo consequuntur nam debitis in tempora fugit, rem fugiat facere dolorum expedita deleniti modi, libero, delectus magni? Consequuntur perferendis modi omnis animi aut pariatur eos debitis blanditiis, mollitia soluta ullam suscipit recusandae aliquid totam laudantium. Neque distinctio incidunt ducimus, expedita, natus voluptatibus quisquam aspernatur possimus odit id sit perferendis deserunt dolorem necessitatibus impedit similique aut voluptatum? Animi aperiam mollitia vero ut similique deleniti nulla voluptas cupiditate iure sunt debitis quasi quaerat laudantium perspiciatis officia tempora ratione sequi dolores ducimus, ab non esse molestias. Magnam non veniam, culpa, harum atque mollitia sint quia fuga tempore commodi ratione ad officiis natus. Id aut nisi dolorem cumque aliquid consectetur, earum accusantium aspernatur nam et ut culpa quis sed iste iusto quo. Reprehenderit ratione excepturi, porro nesciunt eligendi doloremque itaque dolorum nulla voluptatum consequuntur saepe explicabo temporibus inventore quas ipsam necessitatibus corrupti. Dicta, non. Quos illum nulla natus tempora sunt, dicta, a excepturi id ipsum, pariatur fuga optio dolorem aliquid? Ratione nostrum vitae explicabo cum in dolore, quia voluptatem esse error minima at optio rerum sapiente? Eligendi rerum quia quo, ex ullam quis. Consequatur at amet reprehenderit? Enim facere dignissimos quisquam quibusdam eos ab itaque expedita, nobis et repellendus vero error beatae, voluptatem molestias autem fuga eaque cum excepturi accusantium explicabo impedit illum esse modi. Quas dolor commodi accusamus id iure veniam enim fugiat facilis excepturi, laudantium ab alias ipsam dolores et recusandae dolorem quis totam hic exercitationem dignissimos laboriosam. Numquam magnam repellat, quis praesentium sunt facilis ad quod possimus consequuntur rerum aut quo, iste esse obcaecati? Laborum dignissimos dolore iure ex, veniam illum consequuntur. Consectetur nemo impedit cum dolores architecto est autem ullam aperiam exercitationem dolorum, veniam doloremque illum ipsam deserunt eius? Iure molestiae blanditiis impedit illum labore fugit ipsa sunt molestias.",
  },
  {
    id: 4,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 20 speaking countries",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolorem sed nemo consequuntur nam debitis in tempora fugit, rem fugiat facere dolorum expedita deleniti modi, libero, delectus magni? Consequuntur perferendis modi omnis animi aut pariatur eos debitis blanditiis, mollitia soluta ullam suscipit recusandae aliquid totam laudantium. Neque distinctio incidunt ducimus, expedita, natus voluptatibus quisquam aspernatur possimus odit id sit perferendis deserunt dolorem necessitatibus impedit similique aut voluptatum? Animi aperiam mollitia vero ut similique deleniti nulla voluptas cupiditate iure sunt debitis quasi quaerat laudantium perspiciatis officia tempora ratione sequi dolores ducimus, ab non esse molestias. Magnam non veniam, culpa, harum atque mollitia sint quia fuga tempore commodi ratione ad officiis natus. Id aut nisi dolorem cumque aliquid consectetur, earum accusantium aspernatur nam et ut culpa quis sed iste iusto quo. Reprehenderit ratione excepturi, porro nesciunt eligendi doloremque itaque dolorum nulla voluptatum consequuntur saepe explicabo temporibus inventore quas ipsam necessitatibus corrupti. Dicta, non. Quos illum nulla natus tempora sunt, dicta, a excepturi id ipsum, pariatur fuga optio dolorem aliquid? Ratione nostrum vitae explicabo cum in dolore, quia voluptatem esse error minima at optio rerum sapiente? Eligendi rerum quia quo, ex ullam quis. Consequatur at amet reprehenderit? Enim facere dignissimos quisquam quibusdam eos ab itaque expedita, nobis et repellendus vero error beatae, voluptatem molestias autem fuga eaque cum excepturi accusantium explicabo impedit illum esse modi. Quas dolor commodi accusamus id iure veniam enim fugiat facilis excepturi, laudantium ab alias ipsam dolores et recusandae dolorem quis totam hic exercitationem dignissimos laboriosam. Numquam magnam repellat, quis praesentium sunt facilis ad quod possimus consequuntur rerum aut quo, iste esse obcaecati? Laborum dignissimos dolore iure ex, veniam illum consequuntur. Consectetur nemo impedit cum dolores architecto est autem ullam aperiam exercitationem dolorum, veniam doloremque illum ipsam deserunt eius? Iure molestiae blanditiis impedit illum labore fugit ipsa sunt molestias.",
  },
  {
    id: 5,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 20 speaking countries",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quidem cupiditate mollitia eius animi aspernatur quam velit libero amet esse?",
  },
  {
    id: 6,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 20 speaking countries",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quidem cupiditate mollitia eius animi aspernatur quam velit libero amet esse?",
  },
  {
    id: 7,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 20 speaking countries",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quidem cupiditate mollitia eius animi aspernatur quam velit libero amet esse?",
  },
  {
    id: 8,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 20 speaking countries",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quidem cupiditate mollitia eius animi aspernatur quam velit libero amet esse?",
  },
  {
    id: 9,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 20 speaking countries",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quidem cupiditate mollitia eius animi aspernatur quam velit libero amet esse?",
  },
  {
    id: 10,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 20 speaking countries",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quidem cupiditate mollitia eius animi aspernatur quam velit libero amet esse?",
  },
  {
    id: 11,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 20 speaking countries",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quidem cupiditate mollitia eius animi aspernatur quam velit libero amet esse?",
  },
  {
    id: 12,
    deptLogo: Logo,
    dept: "Child Education",
    dmy: `${days[day]} ${newDate()} ${months[month]}, ${year}`,
    img: Img,
    headerInfo: "Top 20 speaking countries",
    info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, quidem cupiditate mollitia eius animi aspernatur quam velit libero amet esse?",
  },
];
