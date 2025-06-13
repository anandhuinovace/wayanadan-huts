import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Accommodations from "../components/Accommodations";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    accommodation: "",
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    adults: "1",
    children: "0",
    guests: "1",
    message: "",
    status: "New",
  });
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Accommodations  setFormData={setFormData} />
      <Testimonials />
      <Contact formData={formData} setFormData={setFormData} />
    </>
  );
};

export default Index;
