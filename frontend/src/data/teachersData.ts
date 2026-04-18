// in data/teachersData.ts
import TeachersImage from "../assets/images/wisdom-nwaegidi.jpg";

// UPDATED INTERFACE to match the image icons
interface Socials {
  facebook: { link: string; color: string };
  twitter: { link: string; color: string };
  linkedin: { link: string; color: string }; // Swapped WhatsApp for LinkedIn
}

export interface TeacherData {
  id: number;
  img: string;
  names: string;
  title: string; // New field for job title
  socials: Socials;
}

// EXAMPLE DATA with colors matching the image exactly
export const teachersData: TeacherData[] = [
  {
    id: 1,
    img: TeachersImage,
    names: "Chris Nnaemeka",
    title: "Maths Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" }, // Bright Green
      twitter: { link: "#", color: "bg-[#FE7A36]" }, // Orange
      linkedin: { link: "#", color: "bg-[#219C90]" }, // Teal/Cyan
    },
  },
  {
    id: 2,
    img: TeachersImage, // Use actual individual images here
    names: "Alex Johnson",
    title: "Art Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 3,
    img: TeachersImage,
    names: "Chioma Chimezie",
    title: "English Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 4,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 5,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 6,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 7,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 8,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 9,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 10,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 11,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 12,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 13,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 14,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 15,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
  {
    id: 16,
    img: TeachersImage,
    names: "Wisdom Nwaegidi",
    title: "Sains Teacher",
    socials: {
      facebook: { link: "#", color: "bg-[#65B741]" },
      twitter: { link: "#", color: "bg-[#FE7A36]" },
      linkedin: { link: "#", color: "bg-[#219C90]" },
    },
  },
];
