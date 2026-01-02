import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [showScroll, setShowScroll] = useState(true);
  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const fullText1 = 'Happy Birthdayyy';
  const fullText2 = 'Tushuuuu💞';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing effect for first text
  useEffect(() => {
    if (!isInView) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText1.length) {
        setDisplayedText1(fullText1.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Start typing second text after a short delay
        setTimeout(() => {
          let currentIndex2 = 0;
          const typingInterval2 = setInterval(() => {
            if (currentIndex2 < fullText2.length) {
              setDisplayedText2(fullText2.slice(0, currentIndex2 + 1));
              currentIndex2++;
            } else {
              clearInterval(typingInterval2);
            }
          }, 100);
        }, 300);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [isInView]);

  return (
    <section 
      ref={ref}
      className="h-screen flex flex-col items-center justify-center snap-start relative z-10 px-4"
    >
      <motion.div
        className="glass rounded-3xl p-12 md:p-16 lg:p-20 max-w-4xl w-full text-center shadow-2xl relative z-10 overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          backgroundImage: 'url(/birthday-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(2px)',
        }}
      >
        {/* Overlay for better text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(255, 255, 255, 0.35)',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <motion.h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-deep-rose mb-6 font-bold"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {displayedText1}
            {displayedText1.length < fullText1.length && (
              <span className="animate-pulse">|</span>
            )}
          </motion.h1>
          <motion.p
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-deep-rose mt-6 font-bold"
            style={{
              textShadow: '0 2px 10px rgba(214, 51, 132, 0.3)',
              letterSpacing: '0.05em',
            }}
          >
            {displayedText2}
            {displayedText2.length < fullText2.length && displayedText1.length === fullText1.length && (
              <span className="animate-pulse">|</span>
            )}
          </motion.p>
        </div>
      </motion.div>

      {showScroll && (
        <motion.div
          className="absolute bottom-8 flex flex-col items-center relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.p
            className="text-deep-rose/70 text-sm mb-2 font-semibold italic"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll Down
          </motion.p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-deep-rose/70"
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;

