import HeartBackground from './components/HeartBackground';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import VideoSection from './components/VideoSection';

function App() {
  return (
    <div className="relative min-h-screen">
      <HeartBackground />
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen relative z-10 snap-container">
        <Hero />
        <Gallery />
        <VideoSection />
      </div>
    </div>
  );
}

export default App;

