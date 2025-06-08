import { useEffect, useRef, useState } from 'react';
import { Quote, Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  location: string;
  rating: number;
  image?: string;
  delay?: string;
  highlight?: string;
}

const TestimonialCard = ({ quote, author, location, rating, image, delay = "0s", highlight }: TestimonialProps) => (
  <div 
    className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col scroll-animate hover:shadow-xl transition-shadow"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center mb-6">
      <div className="mr-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-emerald-100 shadow-sm">
          {image ? (
            <img src={image} alt={author} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-2xl font-medium">
              {author.charAt(0)}
            </div>
          )}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-bold text-gray-900">{author}</h4>
        <p className="text-gray-600 text-sm">{location}</p>
        <div className="flex mt-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
      </div>
    </div>
    
    <div className="relative flex-grow">
      <Quote className="absolute -top-2 left-0 w-8 h-8 text-emerald-100" />
      <p className="text-gray-700 pl-8 text-lg leading-relaxed">&ldquo;{quote}&rdquo;</p>
      {highlight && (
        <div className="mt-4 pl-8">
          <span className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
            {highlight}
          </span>
        </div>
      )}
    </div>
    
    <div className="mt-6 pt-6 border-t border-gray-100">
      <div className="flex items-center">
        <div className="w-10 h-10 mr-3">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <path 
              d="M18 3c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15z" 
              fill="#E8F5E9"
            />
            <path 
              d="M18 7c6.065 0 11 4.935 11 11s-4.935 11-11 11-11-4.935-11-11 4.935-11 11-11z" 
              fill="#4CAF50"
            />
            <path 
              d="M18 11c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7 3.134-7 7-7z" 
              fill="#A5D6A7"
            />
          </svg>
        </div>
        <span className="text-sm text-gray-600">Verified Stay · {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      quote: "The 1BHK hut was perfect for our family! Modern amenities like WiFi and a full kitchen made our stay comfortable, while the bamboo architecture kept us connected to nature. Loved the proximity to Edakkal Caves!",
      author: "Ananya Krishnan",
      location: "Thrissur, Kerala",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      highlight: "Modern amenities in nature"
    },
    {
      quote: "As eco-tourists, we appreciated the 100% eco-friendly practices. The hut was spotless, and the kitchen setup allowed us to cook local ingredients from Wayanad's markets. A rare find!",
      author: "Vikram Rajendran",
      location: "Coimbatore, Tamil Nadu",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      highlight: "100% Eco-Friendly"
    },
    {
      quote: "Just 10 minutes from Karapuzha Dam! The 2BHK hut had everything—TV, WiFi, even a coffee maker. Waking up to misty hills from our balcony was unforgettable.",
      author: "Priya Shetty",
      location: "Mangalore, Karnataka",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      highlight: "Prime location"
    },
    {
      quote: "We're cleanliness freaks, and Wayanadan Huts exceeded expectations! The eco-friendly toiletries and daily housekeeping showed their attention to detail.",
      author: "Arjun Nambiar",
      location: "Kochi, Kerala",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/28.jpg",
      highlight: "100% Neat & Clean"
    },
    {
      quote: "The perfect workation spot! High-speed WiFi let me attend calls, and the serene environment boosted productivity. Evenings at the campfire were magical.",
      author: "Divya Iyer",
      location: "Bangalore, Karnataka",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      highlight: "Work-friendly with nature"
    },
    {
      quote: "Our kids adored the sustainable design! They learned about rainwater harvesting while we enjoyed the luxury of air conditioning. Best of both worlds.",
      author: "Suresh Pillai",
      location: "Madurai, Tamil Nadu",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      highlight: "Family-friendly sustainability"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.scroll-animate');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.scroll-animate');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-emerald-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 scroll-animate">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            GUEST REVIEWS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stories From <span className="text-emerald-600">Our Guests</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what travelers from across South India say about their experiences at Wayanadan Huts.
          </p>
        </div>
        
        {/* Desktop testimonials grid */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              {...testimonial} 
              delay={`${index * 0.1}s`}
            />
          ))}
        </div>
        
        {/* Mobile testimonials carousel */}
        <div className="md:hidden">
          <TestimonialCard 
            {...testimonials[activeIndex]} 
            delay="0s"
          />
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-emerald-600 w-6' : 'bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 scroll-animate" style={{ animationDelay: "0.4s" }}>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">4.9/5</div>
            <div className="flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 mt-1">Average Rating</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
            <p className="text-gray-600">Eco-Friendly Stays</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
            <p className="text-gray-600">Guests Recommend</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;