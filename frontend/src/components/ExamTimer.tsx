import { useState, useEffect } from "react";
import "./ExamTimer.css";
import { useAppContext } from "../contexts/AppContext";

interface ExamTimerProps {
  duration: number;
  isTimerActive: boolean;
}

function ExamTimer({ duration, isTimerActive }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  const { showToast } = useAppContext();

  useEffect(() => {
    let timer: number | null = null;

    if (isTimerActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
       showToast({ message: "Time is up!", type: "ERROR" });
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive, timeLeft, showToast]);

 
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const hoursString = hours < 10 ? `0${hours}` : `${hours}`;

  return (
    <div className='exam-timer'>
      <h1>Exam Timer</h1>
      <div className='time-box'>
        Time Left: {hoursString} : {minutesString} : {secondsString}
      </div>
    </div>
  );
}

export default ExamTimer;
