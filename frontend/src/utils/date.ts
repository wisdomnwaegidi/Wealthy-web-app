import { format } from "date-fns";

const getGreeting = () => {
  const currentHour = new Date().getHours(); // Get the current hour (0-23)

  if (currentHour >= 0 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good night";
  }
};

export const greeting = getGreeting();
export const todaysDate = format(new Date(), "EEEE dd MMMM, yyyy");
export const date = new Date().getFullYear();
