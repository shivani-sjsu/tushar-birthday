import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const MemoryCard = ({ memory, index, isInView }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all images for the slider (can be any number)
  const images = memory.images;

  // Reset to first image when not hovered
  useEffect(() => {
    if (!isHovered) {
      setCurrentImageIndex(0);
    }
  }, [isHovered]);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Random tilt for stacked look
  const tilt = (index * 7.3) % 7 - 3;

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `rotate(${tilt}deg)`,
      }}
    >
      {/* Stacked Polaroid Card */}
      <motion.div
        className="bg-white p-4 relative flex flex-col"
        style={{
          border: '8px solid white',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
          height: '420px',
        }}
      >
        {/* Image Slider Container */}
        <div className="mb-3 relative overflow-hidden flex-shrink-0" style={{ height: '256px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
              className="absolute inset-0"
            >
              <img
                src={images[currentImageIndex]}
                alt={`${memory.caption} ${currentImageIndex + 1}`}
                loading="lazy"
                className="w-full h-full object-contain bg-gray-50"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Only show when hovered and multiple images */}
          {isHovered && images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors z-10"
                style={{ opacity: 0.9 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-deep-rose"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors z-10"
                style={{ opacity: 0.9 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-deep-rose"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Slide Indicator Dots */}
          {isHovered && images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: idx === currentImageIndex ? '#D63384' : 'rgba(255, 255, 255, 0.6)',
                    transform: idx === currentImageIndex ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Caption and Date */}
        <div className="text-center flex-1 flex flex-col justify-center min-h-0">
          <p className="text-gray-800 font-bold mb-1 text-lg italic line-clamp-2">{memory.caption}</p>
          <p className="text-gray-500 text-sm font-medium line-clamp-3">{memory.date}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-200px' });

  // Sample data - each memory has 2-3 images
  // Place your images in: public/memories/
  // Then update the paths below (e.g., '/memories/memory1-img1.jpg')
  const memories = [
    {
      id: 1,
      images: [
        '/memories/vc1.PNG',
        '/memories/vc2.PNG',
        '/memories/vc3.png',
        '/memories/vc5.PNG',
      ],
      caption: 'VC Moments',
      date: 'I love taking ss of yours bcoz honestly I love capturing you',
    },
    {
      id: 2,
      images: [
        '/memories/uilike2.JPG',
        '/memories/uilike3.PNG',
        '/memories/uilike5.png',
        '/memories/uilkike1.PNG',
        '/memories/uillike4.JPG',
        '/memories/uilike6.PNG',
      ],
      caption: 'YOU and YOU',
      date: 'The pictures I look at and wonder how lucky Im to end up with this kiddo 🐕',
    },
    {
      id: 3,
      images: [
        '/memories/livein2.PNG',
        '/memories/lv1.JPG',
        '/memories/lv3.PNG',
        '/memories/lv4.PNG',
        '/memories/lv5.PNG',
      ],
      caption: 'Our Live-IN',
      date: 'Literally my happy place, thu thu(nazar na lage 🧿)',
    },
    {
      id: 4,
      images: [
        '/memories/us1.png',
        '/memories/us2.JPG',
        '/memories/us3.JPG',
        '/memories/us5.JPG',
        '/memories/us4.PNG',
      ],
      caption: 'Me & You',
      date: 'A little chaotic sometimes but I love that too and sometimes I do chaos on purpose just sometimes',
    },
    {
      id: 5,
      images: [
        '/memories/cutei.jpg',
      ],
      caption: 'Thats ME',
      date: 'Hehhhe that is a picturization of ME around YOU!!!!!! Like a cuteee doggo 🐶',
    },
    {
      id: 6,
      images: [
        '/memories/positive.png',
      ],
      caption: 'Positive Vibes',
      date: 'Everything is going to work out, all in your favour, just be positive bachha 😘😘',
    },
  ];

  return (
    <section
      ref={ref}
      className="min-h-screen snap-start flex flex-col items-center justify-center py-20 px-4 relative z-10"
    >
      <motion.div
        className="glass rounded-3xl p-8 md:p-12 mb-12 max-w-6xl w-full"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-deep-rose text-center font-bold italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Teri Meri Kahani
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl w-full px-4">
        {memories.map((memory, index) => (
          <MemoryCard
            key={memory.id}
            memory={memory}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
