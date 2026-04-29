import { useEffect, useRef, useState } from "react";
import { FaUsers, FaTrophy, FaCheckCircle, FaBookOpen } from "react-icons/fa";

interface Stat {
  id: number;
  icon: React.ReactNode;
  target: number;
  label: string;
  suffix?: string;
  iconBg: string;
  iconColor: string;
}

const stats: Stat[] = [
  {
    id: 1,
    icon: <FaUsers />,
    target: 4800,
    label: "Students Enrolled",
    iconBg: "bg-prcolor/10",
    iconColor: "text-prcolor",
  },
  {
    id: 2,
    icon: <FaTrophy />,
    target: 320,
    label: "Best Awards Won",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
  {
    id: 3,
    icon: <FaCheckCircle />,
    target: 12500,
    label: "Classes Completed",
    iconBg: "bg-blcolor/10",
    iconColor: "text-darkerGreen",
  },
  {
    id: 4,
    icon: <FaBookOpen />,
    target: 95,
    label: "Our Total Classes",
    iconBg: "bg-purplecolor/10",
    iconColor: "text-purplecolor",
  },
];

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function useCounter(target: number, duration: number, triggered: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;

    const start = performance.now();

    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOut(progress) * target));
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [triggered, target, duration]);

  return count;
}

function StatCard({ stat }: { stat: Stat }) {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(stat.target, 2000, triggered);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className='flex flex-col items-center text-center px-6 py-10 border-b md:border-b-0 md:border-r border-gray-100 last:border-0 '
    >
      <div className={`w-14 h-14 rounded-full ${stat.iconBg} flex items-center justify-center mb-5`}>
        <span className={`text-2xl ${stat.iconColor}`}>{stat.icon}</span>
      </div>

      <div className='text-4xl font-extrabold text-darkcolor leading-none mb-2'>
        {count.toLocaleString()}
        {stat.suffix && <span className='text-prcolor'>{stat.suffix}</span>}
      </div>

      <p className='text-gray-500 text-sm font-medium uppercase tracking-wide'>
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className='w-full py-16 bg-white mt-32'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}