import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {
  Bed,
  MapPin,
  Star,
  Wifi,
  ParkingSquare,
  Utensils,
  Tv,
} from "lucide-react";
import { Link } from "react-router-dom";

// Import images for 1 BHK
import oneBhkLiving from "./../assets/stay/stay6.jpg";
import oneBhkBedroom from "./../assets/guest.jpg";
import oneBhkKitchen from "./../assets/stay/stay1.jpg";
import oneBhkBathroom from "./../assets/stay/stay2.jpg";

import twoBhkLiving from "./../assets/twobhk-living.jpg";
import twoBhkDining from "./../assets/twobhk-dining.jpg";
import twoBhkKitchen from "./../assets/twoBhk-kitchen.jpg";

import sprinFitMatress1 from "./../assets/mattress/img1.jpeg";
import sprinFitMatress2 from "./../assets/mattress/mattresdetail.jpeg";
import sprinFitMatress3 from "./../assets/mattress/actress.jpg";
import sprinFitMatress4 from "./../assets/mattress/zoomed (1).jpeg";

interface HutProps {
  title: string;
  description: string;
  images: string[];
  price: string;
  capacity: string;
  location: string;
  delay?: string;
  offer?: string;
  discount?: string;
  handleBookNow: () => void;
  features: string[];
}

interface ContactProps {
  setFormData: (
    value: React.SetStateAction<{ accommodation?: string; adults?: string }>
  ) => void;
}

const HutCard = ({
  title,
  description,
  images,
  price,
  capacity,
  location,
  offer,
  discount,
  delay = "0s",
  handleBookNow,
  features,
}: HutProps) => (
  <div
    className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 scroll-animate"
    style={{ animationDelay: delay }}
  >
    <div className="relative h-72 group">
      {/* Image collage grid */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
        {/* Main image (larger) */}
        <div className="relative row-span-2 col-span-1">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Smaller images */}
        <div className="relative">
          <img
            src={images[1]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="relative">
          <img
            src={images[2]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

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
          {offer && (
            <>
              <span className="line-through text-gray-500 mr-1">₹{offer}</span>
              <span className="font-bold">₹{price}</span>
              {/* {discount && (
                <span className="ml-1 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
                  {discount} OFF
                </span>
              )} */}
            </>
          )}
          {!offer && <span>₹{price}</span>}
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

      {/* Features section */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
        <div className="grid grid-cols-2 gap-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center text-sm text-gray-600"
            >
              {feature.includes("Wifi") && (
                <Wifi className="w-4 h-4 mr-1 text-emerald-600" />
              )}
              {feature.includes("Parking") && (
                <ParkingSquare className="w-4 h-4 mr-1 text-emerald-600" />
              )}
              {feature.includes("Kitchen") && (
                <Utensils className="w-4 h-4 mr-1 text-emerald-600" />
              )}
              {feature.includes("TV") && (
                <Tv className="w-4 h-4 mr-1 text-emerald-600" />
              )}
              {feature}
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleBookNow}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-6 text-lg rounded-xl shadow-md transition-all duration-300 hover:shadow-lg"
      >
        Book Now
      </Button>
    </div>
  </div>
);

const Accommodations: React.FC<ContactProps> = ({ setFormData }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  type RateType = {
    price: string;
    offer: string;
    discount: string;
  };

  const [rates, setRates] = useState<Record<string, RateType>>({});
  useEffect(() => {
    const fetchRates = async () => {
      const snapshot = await getDocs(collection(db, "rates"));
      const rateMap = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        rateMap[data.name] = {
          price: data.price,
          offer: data.offer,
          discount: data.discount,
        };
      });

      setRates(rateMap);
    };

    fetchRates();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll(".scroll-animate");
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll(".scroll-animate");
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const huts = [
    {
      title: "1 BHK Apartment AC",
      name: "1 BHK",
      description:
        "Cozy 1 bedroom apartment with attached bathroom, balcony, and all modern amenities. Perfect for couples or small families.",
      images: [oneBhkLiving, oneBhkBedroom, oneBhkKitchen, oneBhkBathroom],
      price: rates?.["1 BHK"]?.price ?? "Loading...",
      offer: rates?.["1 BHK"]?.offer ?? "",
      discount: rates?.["1 BHK"]?.discount ?? "",
      capacity: "3 Adults or 2 Adults + 2 Children",
      location: "Prime Location",
      delay: "0s",
      features: [
        "Attached Bathroom",
        "Balcony in Bedroom",
        "Free Wifi",
        "Free Car Parking",
        "Fully Equipped Kitchen",
        "Dining Hall with Table",
        "Living Room with TV",
        "Sofa Set in Living Room",
      ],
    },
    {
      title: "2 BHK Apartment AC",
      name: "2 BHK",
      description:
        "Spacious 2 bedroom apartment with one attached bathroom, balcony in master bedroom, and premium amenities for larger groups.",
      images: [twoBhkKitchen, twoBhkDining, twoBhkLiving],
      price: rates?.["2 BHK"]?.price ?? "Loading...",
      offer: rates?.["2 BHK"]?.offer ?? "",
      discount: rates?.["2 BHK"]?.discount ?? "",
      capacity: "6 Adults or 3 Adults + 4 Children",
      location: "Prime Location",
      delay: "0.2s",
      features: [
        "Attached Bathroom",
        "Balcony in Master Bedroom",
        "Free Wifi",
        "Free Car Parking",
        "Fully Equipped Kitchen",
        "Dining Hall with Table",
        "Living Room with TV",
        "Sofa Set in Living Room",
      ],
    },
  ];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookNow = (name: string, capacity: string) => {
    setFormData((prev: any) => ({
      ...prev,
      accommodation: name,
      adults: capacity.split(" ")[0] || "1",
    }));

    setTimeout(() => scrollToSection("contact-form"), 100);
  };

  return (
    <section
      id="accommodations"
      className="py-20 bg-gradient-to-b from-white to-[#f8fdfd]"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 scroll-animate">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            LUXURY STAYS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comfortable <span className="text-emerald-600">Accommodations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience comfortable living with all modern amenities in our
            well-appointed apartments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {huts.map((hut, index) => (
            <HutCard
              key={index}
              {...hut}
              delay={`${index * 0.1}s`}
              handleBookNow={() => handleBookNow(hut.name, hut.capacity)}
            />
          ))}
        </div>

        {/* Premium Mattress Section */}
        <div
          className="mt-20 text-center scroll-animate px-4 md:px-0"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sleep on Luxury with{" "}
            <span className="text-emerald-600">Springfit Mattress</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            All our accommodations are equipped with{" "}
            <strong>Springfit premium mattresses</strong>, ensuring restful
            sleep and superior comfort for all our guests.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            <div>
              <img
                src={sprinFitMatress3}
                alt="Springfit Mattress 1"
                className="rounded-xl shadow-lg w-full h-full object-cover"
                style={{ maxHeight: "750px" }}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <img
                src={sprinFitMatress1}
                alt="Springfit Mattress 2"
                className="rounded-xl shadow-lg w-full h-60 object-cover"
              />
              <img
                src={sprinFitMatress2}
                alt="Springfit Mattress 3"
                className="rounded-xl shadow-lg w-full h-60 object-cover"
              />
               <img
                src={sprinFitMatress4}
                alt="Springfit Mattress 3"
                className="rounded-xl shadow-lg w-full h-60 object-contain bg-[#012839]"
              />
            </div>
          </div>
        </div>

        <div
          className="mt-16 text-center scroll-animate"
          style={{ animationDelay: "0.4s" }}
        >
          <Link to="/media">
            <Button className="px-10 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              View More Images
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Accommodations;
