import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const KissAnimation = ({ onKiss }) => {
  const [kisses, setKisses] = useState([]);

  const createKiss = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newKisses = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const distance = 80 + Math.random() * 40;
      return {
        id: Date.now() + i,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        angle: angle + Math.PI / 2,
      };
    });

    setKisses(newKisses);
    if (onKiss) onKiss();
  };

  return (
    <>
      <AnimatePresence>
        {kisses.map((kiss) => (
          <motion.div
            key={kiss.id}
            className="fixed pointer-events-none text-3xl z-50"
            style={{
              left: kiss.x,
              top: kiss.y,
            }}
            initial={{
              opacity: 1,
              scale: 0.5,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.5, 1.2, 1.5],
              x: Math.cos(kiss.angle) * 100,
              y: Math.sin(kiss.angle) * 100,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
            }}
          >
            💋
          </motion.div>
        ))}
      </AnimatePresence>
      <div onClick={createKiss} className="cursor-pointer">
        {onKiss}
      </div>
    </>
  );
};

export const KissButton = ({ children, onClick }) => {
  const [kisses, setKisses] = useState([]);

  const handleClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newKisses = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const distance = 60 + Math.random() * 30;
      return {
        id: Date.now() + i,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        angle: angle + Math.PI / 2,
      };
    });

    setKisses(newKisses);
    if (onClick) onClick(event);
  };

  return (
    <>
      <AnimatePresence>
        {kisses.map((kiss) => (
          <motion.div
            key={kiss.id}
            className="fixed pointer-events-none text-3xl z-50"
            style={{
              left: kiss.x,
              top: kiss.y,
            }}
            initial={{
              opacity: 1,
              scale: 0.5,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0.5, 1.2, 1.5],
              x: Math.cos(kiss.angle) * 80,
              y: Math.sin(kiss.angle) * 80,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          >
            💋
          </motion.div>
        ))}
      </AnimatePresence>
      <div onClick={handleClick} className="inline-block">
        {children}
      </div>
    </>
  );
};

export default KissAnimation;

