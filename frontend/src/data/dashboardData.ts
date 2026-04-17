interface Course {
  name: string;
  code: string;
  instructor: string;
  schedule: string;
  time: string;
  location: string;
}

interface Exam {
  name: string;
  course: string;
  date: string;
  time: string;
  location: string;
  status: string;
}

export const courses: Course[] = [
  {
    name: "Graphic Fundamentals",
    code: "ART101",
    instructor: "Prof. Smith",
    schedule: "Monday & Wednesday",
    time: "9:00 AM - 10:30 AM",
    location: "Design Studio A",
  },
  {
    name: "Advanced Web Design",
    code: "ITD201",
    instructor: "Dr. Johnson",
    schedule: "Tuesday & Thursday",
    time: "1:30 PM - 3:00 PM",
    location: "Computer Lab 3",
  },
  {
    name: "User Experience Research",
    code: "UXD301",
    instructor: "Prof. Davis",
    schedule: "Monday & Saturday",
    time: "11:00 AM - 12:30 PM",
    location: "Design Lab 2",
  },
  {
    name: "3D Animation Techniques",
    code: "ANI301",
    instructor: "Dr. Martinez",
    schedule: "Wednesday",
    time: "2:00 PM - 5:00 PM",
    location: "Animation Studio",
  },
];

export const exams: Exam[] = [
  {
    name: "Graphic Design Fundamentals",
    course: "ART101",
    date: "Jan 25, 2026",
    time: "10:00 AM",
    location: "Design Studio A",
    status: "Completed",
  },
  {
    name: "Digital Illustration",
    course: "ART103",
    date: "Feb 5, 2026",
    time: "02:00 PM",
    location: "Computer Lab 2",
    status: "Completed",
  },
  {
    name: "UX/UI Design Principles",
    course: "UXD301",
    date: "Mar 10, 2026",
    time: "01:00 PM",
    location: "Design Lab 1",
    status: "Upcoming",
  },
  {
    name: "History of Design Essay",
    course: "ART101",
    date: "Apr 2, 2026",
    time: "09:45 AM",
    location: "Lecture Hall B",
    status: "Upcoming",
  },
  {
    name: "Product Design Prototype",
    course: "ITD201",
    date: "May 15, 2026",
    time: "11:15 AM",
    location: "Prototype Lab",
    status: "Upcoming",
  },
  {
    name: "Color Theory and Application",
    course: "ART103",
    date: "June 8, 2026",
    time: "02:15 PM",
    location: "Design Studio B",
    status: "Upcoming",
  },
  {
    name: "Visual Communication Design",
    course: "ART202",
    date: "Nov 20, 2026",
    time: "2:00 PM",
    location: "Design Studio B",
    status: "Upcoming",
  },
];




