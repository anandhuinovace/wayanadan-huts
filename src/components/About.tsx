import { useEffect, useRef } from 'react';
import fullView from "../assets/living-room.jpeg";
import TopView from "../assets/wayanadan-sky-view.jpeg";
import innerOUtView from "../assets/stay/stay26.jpg"
import innerView from "../assets/stay/stay12.jpg"
import "./index.css"
const About = () => {
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
      elements.forEach((el, index) => {
        observer.observe(el);
      });
    }

    return () => {
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll('.scroll-animate');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-[#f0f9f9]" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <span className="text-emerald-600 font-semibold tracking-wider">DISCOVER</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3 mb-4">
            The <span className="text-emerald-600">Wayanadan</span> Experience
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Gallery - Modern Grid Layout */}
          <div className="lg:w-1/2 w-full relative scroll-animate">
            <div className="grid grid-cols-10 grid-rows-8 gap-4 h-[500px]">
              <div className="col-span-6 row-span-4 relative overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src={fullView}
                  alt="Wayanad View 1"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="col-span-4 row-span-4 relative overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src={TopView}
                  alt="Wayanad View 2"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="col-span-4 row-span-4 relative overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src={innerView}
                  alt="Wayanad View 3"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="col-span-6 row-span-4 relative overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src={innerOUtView}
                  alt="Wayanad View 4"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-white px-6 py-3 rounded-full shadow-xl flex items-center scroll-animate" style={{ animationDelay: '0.3s' }}>
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <span className="font-medium text-gray-800">Affordable price</span>
            </div>
          </div>

          {/* Text Content - Modern Layout */}
          <div className="lg:w-1/2 w-full">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-emerald-600 scroll-animate">OUR STORY</h3>
              <h2 className="text-4xl font-bold text-gray-900 leading-tight scroll-animate" style={{ animationDelay: '0.1s' }}>
                Where Nature Meets <span className="text-emerald-600">Modern Comfort</span>
              </h2>
              
              <div className="space-y-5 text-gray-700 text-lg">
                <p className="scroll-animate" style={{ animationDelay: '0.2s' }}>
                  Nestled in the heart of Wayanad's lush landscapes, <span className="font-semibold text-emerald-600">Wayanadan Huts</span> offers a unique blend of Modern charm and contemporary amenities. Our eco-conscious retreat is designed for those who seek harmony with nature without compromising on comfort.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-animate" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p>Fully furnished 1 & 2 BHK (A/C) huts with modern amenities with attached bathroom</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p>High-speed WiFi, TV, Oven, Fridge, Airfrayer, Sofaset & bed, Dinning table & chair, and complete kitchen setup</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p>Prime location near Edakkal Caves & Karapuzha Dam ,  Wayanad Wildlife Sanctuary, 13km to Karnataka & TamilNadu Border</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p>Free Car Parking, Balcony Available</p>
                  </div>
                </div>
              </div>

              {/* Modern Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center scroll-animate" style={{ animationDelay: '0.4s' }}>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
                  <p className="text-gray-600 font-medium">Neat & Clean</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">100%</div>
                  <p className="text-gray-600 font-medium">Eco-Friendly</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
                  <p className="text-gray-600 font-medium">Happy Guests</p>
                </div>
              </div>

              {/* CTA Button */}
              {/* <div className="scroll-animate" style={{ animationDelay: '0.5s' }}>
                <button className="mt-6 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  View More
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;