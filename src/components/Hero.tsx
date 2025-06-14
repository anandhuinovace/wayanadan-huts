import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import Image1 from '@/assets/living-room.jpeg'
import Image2 from '@/assets/wayanadan-sky-view.jpeg';
import Image3 from '@/assets/guest.jpg';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: Image1,
    title: 'Discover Wayanad’s Natural Wonders',
    subtitle: 'From the Heart of Heritage',
    description: 'Stay in our cozy, eco-friendly homestay nestled amidst the cultural and scenic landmarks of Wayanad—just minutes from Edakkal Caves, Karapuzha Dam, Phantom Rock, and more.',
    ctaPrimary: 'About Wayanad',
    ctaPrimaryLink: '/about_wayanad',
    ctaSecondary: 'How to Reach',
    ctaSecondaryLink: '/reach'
  },
  {
    image: Image2,
    title: 'Wake Up to Majestic Hills',
    subtitle: 'Misty Mornings in Nature',
    description: 'Experience tranquility and breathtaking views from your private balcony in the hills of Wayanad.',
    ctaPrimary: 'About Wayanad',
    ctaPrimaryLink: '/about_wayanad',
    ctaSecondary: 'How to Reach',
    ctaSecondaryLink: '/reach'
  },
  {
    image: Image3,
    title: 'Adventure Meets Comfort',
    subtitle: 'Explore the Unexplored',
    description: 'Discover waterfalls, wildlife, and winding trails while relaxing in our nature-inspired homestay.',
    ctaPrimary: 'About Wayanad',
    ctaPrimaryLink: '/about_wayanad',
    ctaSecondary: 'How to Reach',
    ctaSecondaryLink: '/reach'
  },
];

const CarouselHero = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const length = slides.length;

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
      setIsTransitioning(false);
    }, 800);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + length) % length);
      setIsTransitioning(false);
    }, 800);
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${idx === current
              ? 'opacity-100 z-10'
              : 'opacity-0 z-0 pointer-events-none'
            } ${isTransitioning ? 'transitioning' : ''
            }`}
        >
          {/* Background Image with Parallax Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={slide.image}
              alt={`Slide ${idx}`}
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 z-10" />

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 md:px-6 flex flex-col justify-center items-start z-20">
            <div className={`max-w-2xl space-y-6 transform transition-all duration-700 ease-out ${idx === current
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
              }`}>
              <div className="text-emerald-300 font-medium tracking-wider mb-2">
                WELCOME TO WAYANADAN HUTS
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {slide.title} <span className="text-emerald-300">{slide.subtitle}</span>
              </h1>
              <p className="text-xl text-white/90 max-w-lg">{slide.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to={slide.ctaPrimaryLink} >
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                    {slide.ctaPrimary}
                  </Button>
                </Link>
                <Link to={slide.ctaSecondaryLink} >
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10 hover:border-emerald-300 px-8 py-6 text-lg hover:text-emerald-300 transition-all"
                  >
                    {slide.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-3 rounded-full hover:bg-emerald-600 hover:scale-110 transition-all"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-30 bg-black/30 text-white p-3 rounded-full hover:bg-emerald-600 hover:scale-110 transition-all"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${idx === current ? 'bg-emerald-400 w-8' : 'bg-white/50'
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <a href="#about" className="flex flex-col items-center group">
          <span className="text-white/80 text-sm mb-2 group-hover:text-emerald-300 transition-colors">
            Scroll to explore
          </span>
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center group-hover:border-emerald-300 transition-all">
            <ChevronDown className="w-4 h-4 text-white/80 mt-2 animate-bounce group-hover:text-emerald-300 transition-colors" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default CarouselHero;