import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Tent, Mail, Phone, User } from "lucide-react";
import { motion } from "framer-motion";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from "emailjs-com";

interface ContactProps {
  formData: any;
  setFormData: any;
}

const Contact: React.FC<ContactProps> = ({ formData, setFormData }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  console.log(formData);
  useEffect(() => {
    const totalGuests = parseInt(formData.adults) + parseInt(formData.children);
    setFormData((prev) => ({ ...prev, guests: totalGuests.toString() }));
  }, [formData.adults, formData.children]);

  useEffect(() => {
    const fetchBookedDates = async () => {
      const snapshot = await getDocs(collection(db, "booked_dates"));
      const allDates = snapshot.docs
        .map((doc) => doc.data())
        .map((entry) => new Date(entry.date));

      setBookedDates(allDates);
    };

    fetchBookedDates();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      await emailjs.send(
        "service_k7jpzi8",
        "template_fe0hq7h",
        formData,
        "_1blvD_Ac7uPq_Cfb"
      );

      await addDoc(collection(db, "contact_submissions"), {
        ...formData,
        timestamp: new Date(),
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        accommodation: "",
        checkIn: null,
        checkOut: null,
        adults: "1",
        children: "0",
        guests: "1",
        message: "",
        status: "New",
      });
    } catch (error) {
      console.error("Error saving to Firebase:", error);
    }

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-emerald-50 to-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plan Your <span className="text-emerald-600">Nature Escape</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fill out the form below and our team will help you craft the perfect
            Wayanad experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-8"
        >
          <motion.div variants={itemVariants} className="lg:w-1/3">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-emerald-100">
                Our Details
              </h3>

              <div className="space-y-6">
                <motion.div whileHover={{ x: 5 }} className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Location</h4>
                    <p className="text-gray-600">
                      Kunthani, Sultan Bathery,
                      <br /> Kerala 673592
                    </p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Call Us</h4>
                    <a
                      href="tel:+919876543210"
                      className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      +91 82819 00530 , +91 95395 69263
                    </a>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Email Us</h4>
                    <a
                      href="mailto:wayanadanhuts@gmail.com"
                      className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      wayanadanhuts@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-lg mr-4">
                    <Tent className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">
                      Accommodations
                    </h4>
                    <p className="text-gray-600">
                      Wayanadan Huts Home Stay, Wayanad Two BHK(A/C) Home Stay @
                      Bathery Include Kitchen, Dining Hall, Balcony & Fully
                      Furnushed 2 BHK units also available as 1 BHK on request
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 pt-6 border-t border-emerald-100">
                <h4 className="font-bold text-gray-800 mb-4">
                  Follow Our Journey
                </h4>
                <div className="flex space-x-3">
                  {[
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      ),
                      label: "Facebook",
                      url: "https://www.facebook.com/share/1Aseg7MPte/",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          ></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      ),
                      label: "Instagram",
                      url: "https://www.instagram.com/shibinvarghese1990?igsh=MXBucjRtNWIyNmZ5aw==",
                    },
                    {
                      icon: (
                        <a href="https://wa.me/919645682968" target="_blank">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 32 32"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 27.0746 13.5046 28.8462 16 28.8462Z"
                                fill="#BFC8D0"
                              />
                              <path
                                d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z"
                                fill="url(#paint0_linear_87_7264)"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z"
                                fill="white"
                              />
                              <path
                                d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z"
                                fill="white"
                              />
                              <defs>
                                <linearGradient
                                  id="paint0_linear_87_7264"
                                  x1="26.5"
                                  y1="7"
                                  x2="4"
                                  y2="28"
                                  gradientUnits="userSpaceOnUse"
                                >
                                  <stop stopColor="#5BD066" />
                                  <stop offset="1" stopColor="#27B43E" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                        </a>
                      ),
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      whileHover={{ y: -3 }}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:w-2/3">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 relative overflow-hidden"
              id="contact-form"
            >
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-emerald-50/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-8 text-center z-[999] "
                >
                  <div className="bg-emerald-100 p-4 rounded-full mb-6">
                    <svg
                      className="w-12 h-12 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We've received your inquiry and will get back to you within
                    24 hours.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-emerald-100">
                Booking Inquiry
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.01 }}>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2 text-emerald-600" /> Your Name
                    *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }}>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2 flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2 text-emerald-600" /> Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }}>
                  <label
                    htmlFor="phone"
                    className="block text-gray-700 font-medium mb-2 flex items-center"
                  >
                    <Phone className="w-4 h-4 mr-2 text-emerald-600" /> Phone *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }}>
                  <label
                    htmlFor="accommodation"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Accommodation *
                  </label>
                  <div className="relative">
                    <select
                      id="accommodation"
                      name="accommodation"
                      required
                      value={formData.accommodation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select accommodation</option>
                      <option value="1 BHK">1 BHK </option>
                      <option value="2 BHK">2 BHK</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="z-50 relative"
                >
                  <label
                    htmlFor="checkIn"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Check-in *
                  </label>
                  <div className="relative z-50">
                    <DatePicker
                      selected={formData.checkIn}
                      onChange={(date: Date | null) =>
                        setFormData({ ...formData, checkIn: date })
                      }
                      minDate={new Date()}
                      excludeDates={bookedDates}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select check-in date"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                      popperClassName="z-50"
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="z-50 relative"
                >
                  <label
                    htmlFor="checkOut"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Check-out *
                  </label>
                  <div className="relative z-50">
                    <DatePicker
                      selected={formData.checkOut}
                      onChange={(date: Date | null) =>
                        setFormData({ ...formData, checkOut: date })
                      }
                      minDate={formData.checkIn || new Date()}
                      excludeDates={bookedDates}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select check-out date"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
                      popperClassName="z-50"
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="relative z-10"
                >
                  <label
                    htmlFor="adults"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Adults *
                  </label>
                  <div className="relative">
                    <select
                      id="adults"
                      name="adults"
                      required
                      value={formData.adults}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={`adult-${num}`} value={num.toString()}>
                          {num} {num === 1 ? "Adult" : "Adults"}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="relative z-10"
                >
                  <label
                    htmlFor="children"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Children
                  </label>
                  <div className="relative">
                    <select
                      id="children"
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={`child-${num}`} value={num.toString()}>
                          {num} {num === 1 ? "Child" : "Children"}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.01 }}>
                  <label className="block text-gray-700 font-medium mb-2">
                    Total Guests
                  </label>
                  <div className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50">
                    {formData.guests}{" "}
                    {parseInt(formData.guests) === 1 ? "Guest" : "Guests"}
                    <input
                      type="hidden"
                      name="guests"
                      value={formData.guests}
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.01 }} className="mt-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Special Requests
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
                  placeholder="Tell us about your dream getaway..."
                ></textarea>
              </motion.div>
              <motion.div
                className="mt-6 text-sm text-gray-600 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>
                  <strong>Note:</strong> Check-in time is{" "}
                  <strong>12:30 PM</strong>, and check-out time is{" "}
                  <strong>11:00 AM</strong>.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Submit Booking Inquiry
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
