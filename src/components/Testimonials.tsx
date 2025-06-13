import { useEffect, useRef, useState } from "react";
import { Quote, Star } from "lucide-react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface TestimonialProps {
  id: string;
  quote: string;
  author: string;
  place: string;
  state: string;
  rating: number;
  image?: string;
  delay?: string;
  highlight?: string;
  status: string;
  createdAt?: Date;
  verified_date?: string;
}

const TestimonialCard = ({
  quote,
  author,
  place,
  state,
  rating,
  image,
  delay = "0s",
  highlight,
  verified_date,
}: TestimonialProps) => (
  <div
    className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col scroll-animate hover:shadow-xl transition-shadow"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center mb-6">
      <div className="mr-4 flex-shrink-0">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-emerald-100 shadow-sm">
          {image ? (
            <img
              src={image}
              alt={author}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-2xl font-medium">
              {author.charAt(0)}
            </div>
          )}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-bold text-gray-900 break-words">
          {author}
        </h4>
        <p className="text-gray-600 text-sm">
          {place}, {state}
        </p>
        <div className="flex mt-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 flex-shrink-0 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>

    <div className="relative flex-grow">
      <Quote className="absolute -top-2 left-0 w-8 h-8 text-emerald-100" />
      <p className="text-gray-700 pl-8 text-lg leading-relaxed break-words">
        &ldquo;{quote}&rdquo;
      </p>
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
        <div className="w-10 h-10 mr-3 flex-shrink-0">
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
        {new Date(verified_date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Query only approved testimonials
        const q = query(
          collection(db, "ratings"),
          where("status", "==", "approved")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          quote: doc.data().description,
          author: doc.data().name,
          place: doc.data().place,
          state: doc.data().state,
          rating: doc.data().rating,
          verified_date:
            doc.data().verified_date?.toDate?.().toISOString() || null,
          image: doc.data().image || undefined,
          status: doc.data().status,
          createdAt: doc.data().createdAt?.toDate?.() || null,
          highlight: doc.data().highlight || undefined,
        })) as TestimonialProps[];

        // Sort by date (newest first)
        data.sort(
          (a, b) =>
            (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
        );
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  console.log;
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
  }, [testimonials]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  // Calculate average rating
  const averageRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : 0;

  if (loading) {
    return (
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-b from-white to-emerald-50"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-b from-white to-emerald-50"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-white to-emerald-50"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 scroll-animate">
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            GUEST REVIEWS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stories From <span className="text-emerald-600">Our Guests</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear what travelers from across South India say about their
            experiences at Wayanadan Huts.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <>
            {/* Desktop testimonials grid */}
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  {...testimonial}
                  delay={`${index * 0.1}s`}
                />
              ))}
            </div>

            {/* Mobile testimonials carousel */}
            <div className="md:hidden">
              <TestimonialCard {...testimonials[activeIndex]} delay="0s" />

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.slice(0, 6).map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeIndex
                        ? "bg-emerald-600 w-6"
                        : "bg-gray-300"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Trust indicators */}
            <div
              className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 scroll-animate"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  {averageRating.toFixed(1)}/5
                </div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mt-1">Average Rating</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  100%
                </div>
                <p className="text-gray-600">Eco-Friendly Stays</p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  {testimonials.length > 0
                    ? `${Math.round(
                        (testimonials.filter((t) => t.rating >= 4).length /
                          testimonials.length) *
                          100
                      )}%`
                    : "0%"}
                </div>
                <p className="text-gray-600">Guests Recommend</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No testimonials available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
