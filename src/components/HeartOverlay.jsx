import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeartOverlay = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartCount = 15;
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      size: 20 + Math.random() * 30,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: '-50px',
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-soft-rose"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
              opacity="0.4"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default HeartOverlay;

