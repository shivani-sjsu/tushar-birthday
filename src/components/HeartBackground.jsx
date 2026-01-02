import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HeartBackground = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Hearts in fixed positions with beating animation
    const totalHearts = 50;
    const newHearts = Array.from({ length: totalHearts }, (_, i) => {
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 15 + Math.random() * 35,
        opacity: 0.2 + Math.random() * 0.3,
        beatDelay: Math.random() * 1.5, // Stagger the beats
        beatSpeed: 0.8 + Math.random() * 0.4, // Slightly different speeds
      };
    });
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            opacity: heart.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1, 1.15, 1], // Heartbeat pattern: ba-bump
          }}
          transition={{
            duration: heart.beatSpeed,
            delay: heart.beatDelay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#FF91A4"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default HeartBackground;

