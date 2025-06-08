import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Bed, MapPin, Star, Mountain, Trees } from 'lucide-react';

interface HutProps {
  title: string;
  description: string;
  image: string;
  price: string;
  capacity: string;
  location: string;
  delay?: string;
}

const HutCard = ({ title, description, image, price, capacity, location, delay = "0s" }: HutProps) => (
  <div 
    className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 scroll-animate"
    style={{ animationDelay: delay }}
  >
    <div className="relative h-72 group">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-emerald-700 shadow-md">
        {price} <span className="font-normal">/ night</span>
      </div>
      <div className="absolute bottom-4 left-4 flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <div className="flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
          <Trees className="w-4 h-4 mr-1" />
          <span>Eco</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-5">{description}</p>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center text-gray-700">
          <Bed className="w-5 h-5 mr-2 text-emerald-600" />
          <span>{capacity}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
          <span>{location}</span>
        </div>
      </div>
      
      <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-6 text-lg rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
        Book This Hut
      </Button>
    </div>
  </div>
);

const Accommodations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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

  const huts = [
    {
      title: "Bamboo Tree House",
      description: "Elevated bamboo treehouse offering panoramic views of the forest canopy. Perfect for couples seeking a romantic nature retreat.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
      price: "",
      capacity: "2 Guests",
      location: "Forest Edge",
      delay: "0s"
    },
    {
      title: "Eco Mud Cottage",
      description: "Traditional mud and bamboo cottage with modern amenities and private garden. Ideal for families wanting an authentic experience.",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      price: "",
      capacity: "4 Guests",
      location: "Valley View",
      delay: "0.2s"
    },
  ];

  return (
    <section id="accommodations" className="py-20 bg-gradient-to-b from-white to-[#f8fdfd]" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 scroll-animate">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            LUXURY STAYS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Experience <span className="text-emerald-600">Authentic</span> Wayanad
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience peaceful living in the heart of Wayanad’s natural beauty at our cozy homestay.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {huts.map((hut, index) => (
            <HutCard key={index} {...hut} delay={`${index * 0.1}s`} />
          ))}
        </div>
        
        <div className="mt-16 text-center scroll-animate" style={{ animationDelay: "0.4s" }}>
          <Button className="px-10 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            View All Accommodations
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Accommodations;