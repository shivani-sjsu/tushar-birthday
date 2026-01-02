import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const Letter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const letterText = `Dear Tushu,

On this special day, I want you to know how much you mean to me. Every moment we've shared has been a treasure, and I'm grateful for all the laughter, adventures, and memories we've created together.

You bring so much joy and light into my life. Your kindness, your smile, and your beautiful spirit make every day brighter. I hope this year brings you endless happiness, incredible adventures, and all the love you deserve.

Happy Birthday, my dear friend. May all your dreams come true, and may this new year of your life be filled with wonderful surprises and beautiful moments.

With all my love and warmest wishes.`;

  useEffect(() => {
    if (isInView && !isTyping) {
      setIsTyping(true);
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex < letterText.length) {
          setDisplayedText(letterText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30); // Adjust speed here (lower = faster)

      return () => clearInterval(typingInterval);
    }
  }, [isInView, letterText, isTyping]);

  return (
    <section
      ref={ref}
      className="min-h-screen snap-start flex items-center justify-center py-20 px-4 relative z-10"
    >
      <motion.div
        className="max-w-3xl w-full glass rounded-3xl shadow-2xl p-8 md:p-12"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="prose prose-lg max-w-none"
          style={{
            lineHeight: '1.8',
            fontSize: '1.125rem',
            color: '#4a5568',
          }}
        >
          <div
            className="whitespace-pre-wrap font-sans"
            style={{
              fontFamily: 'inherit',
              margin: 0,
            }}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: displayedText
                  .replace(/Dear Tushu,/g, '<strong class="font-bold italic">Dear Tushu,</strong>')
                  .replace(/special day/g, '<em class="italic font-semibold">special day</em>')
                  .replace(/treasure/g, '<strong class="font-bold">treasure</strong>')
                  .replace(/joy and light/g, '<em class="italic font-semibold">joy and light</em>')
                  .replace(/Happy Birthday/g, '<strong class="font-bold italic">Happy Birthday</strong>')
                  .replace(/dear friend/g, '<em class="italic">dear friend</em>')
                  .replace(/dreams come true/g, '<strong class="font-bold">dreams come true</strong>')
                  .replace(/wonderful surprises/g, '<em class="italic font-semibold">wonderful surprises</em>')
                  .replace(/beautiful moments/g, '<em class="italic font-semibold">beautiful moments</em>')
                  .replace(/With all my love/g, '<strong class="font-bold italic">With all my love</strong>')
              }}
            />
            {isTyping && displayedText.length < letterText.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-6 bg-deep-rose ml-1"
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Letter;

