import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Accommodations from "../components/Accommodations";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

const Index = () => {
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
      <Accommodations />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Index;
