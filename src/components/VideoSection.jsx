import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const VideoSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-50%' });
  const [hasPlayed, setHasPlayed] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasPlayed) {
          video.play().catch((err) => {
            console.log('Autoplay prevented:', err);
          });
          setHasPlayed(true);
        } else if (!entry.isIntersecting && hasPlayed) {
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasPlayed]);

  const createHeartConfetti = (event) => {
    if (!event) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const newHearts = Array.from({ length: 30 }, (_, i) => {
      const angle = (i / 30) * Math.PI * 2;
      const distance = 50 + Math.random() * 30;
      return {
        id: Date.now() + i,
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        angle: angle,
        size: 20 + Math.random() * 20,
      };
    });
    setHearts(newHearts);
    
    // Clear hearts after animation
    setTimeout(() => {
      setHearts([]);
    }, 2500);
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen snap-start flex items-center justify-center py-20 px-4 relative z-10"
    >
      <motion.div
        className="max-w-5xl w-full relative"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="glass rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="relative rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 0 40px rgba(214, 51, 132, 0.3), 0 0 80px rgba(255, 77, 148, 0.2)',
            }}
          >
            {/* Bloom effect */}
            <div 
              className="absolute inset-0 -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(214, 51, 132, 0.25) 0%, transparent 70%)',
                filter: 'blur(50px)',
                transform: 'scale(1.3)',
              }}
            />
            
            <video
              ref={videoRef}
              className="w-full h-auto rounded-2xl"
              controls
              playsInline
              muted
              loop
            >
              {/* Place your video in: public/video.mov or public/video.mp4 */}
              <source
                src="/video.mov"
                type="video/quicktime"
              />
              <source
                src="/video.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="flex justify-center mt-8">
            <motion.button
              onClick={createHeartConfetti}
              className="btn-gradient text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg cursor-pointer italic"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Click Me 💕
            </motion.button>
          </div>
        </div>

        {/* Heart confetti */}
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="fixed pointer-events-none z-50"
            style={{
              left: heart.x,
              top: heart.y,
            }}
            initial={{
              opacity: 1,
              scale: 0.5,
            }}
            animate={{
              y: heart.y - 400,
              x: heart.x + Math.cos(heart.angle) * 150,
              opacity: [1, 1, 0],
              scale: [0.5, 1.2, 0.8],
              rotate: 360,
            }}
            transition={{
              duration: 2.5,
              ease: 'easeOut',
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
                fill="#D63384"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default VideoSection;

