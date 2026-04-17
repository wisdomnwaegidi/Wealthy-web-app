/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: {
        md: "10rem",
      },
    },
    extend: {
      colors: {
        prcolor: "#644bf1",
        blcolor: "#07f3ac",
        purplecolor: "#ec13ec",
        darkcolor: "#25186e",
        darkerGreen: "#07b681",
      },
      backgroundImage: {
        imgHome: "url('./assets/images/56716d89e6.jpg')",
        imgAbt: "url('./assets/images/869645c5f8.jpg')",
        "kick-wrapper": "url('./assets/images/Teacher&students.jpg')",
      },
    },
  },
  plugins: [],
};
