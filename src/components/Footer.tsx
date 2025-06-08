import React from 'react';
import { Home, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-white">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <Home className="w-8 h-8 mr-2 text-emerald-300" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Wayanadan Huts
              </h3>
            </div>
            <p className="text-emerald-100">
              Wayanadan Huts Home Stay, Wayanad Two BHK(A/C) Home Stay <br/>@ Bathery Include Kitchen, Dining Hall, Balcony & Fully Furnushed <br/>2 BHK units also available as 1 BHK on request.
            </p>
            <div className="flex space-x-3">
              {[
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>,
                  label: "Facebook",
                  url: "https://www.facebook.com/share/1Aseg7MPte/"
                },
                {
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
                  label: "Instagram",
                  url: "https://www.instagram.com/shibinvarghese1990?igsh=MXBucjRtNWIyNmZ5aw=="
                },
                {
                  icon: (
                    <a href="https://wa.me/919645682968" target="_blank">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z"
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
                            <linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#5BD066" />
                              <stop offset="1" stopColor="#27B43E" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </a>
                  ),

                }


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

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-emerald-700 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-emerald-200 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:w-3 transition-all"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-emerald-200 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:w-3 transition-all"></span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#accommodations"
                  className="text-emerald-200 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:w-3 transition-all"></span>
                  Our Huts
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-emerald-200 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:w-3 transition-all"></span>
                  Guest Reviews
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-emerald-200 hover:text-white transition-colors flex items-center group"
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:w-3 transition-all"></span>
                  Contact & Booking
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-emerald-700 pb-2 inline-block">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-3 text-emerald-300 flex-shrink-0" />
                <address className="not-italic text-emerald-100">
                  Kunthani, Sultan Bathery, Wayanad<br />
                  Kerala 673592
                </address>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-emerald-300" />
                <a href="tel:+919876543210" className="text-emerald-200 hover:text-white transition-colors">
                  +91 82819 00530 , +91 95395 69263
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-emerald-300" />
                <a href="mailto:bookings@wayanadanhuts.com" className="text-emerald-200 hover:text-white transition-colors">
                  wayanadanhuts@gmail.com
                </a>
              </li>
            </ul>
            <Button className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg transition-all hover:shadow-xl">
              Login
            </Button>
          </div>

          {/* Column 4: Map */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b border-emerald-700 pb-2 inline-block">
              Our Location
            </h4>
            <div className="overflow-hidden rounded-xl shadow-xl border-2 border-emerald-700/50 hover:border-emerald-400 transition-all duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.881605310233!2d76.25703477589768!3d11.631785842832823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba60f22d1371d79%3A0xbb91ad2ff474016f!2sWAYANADANHUTS%20HOME%20STAY!5e0!3m2!1sen!2sin!4v1749098297496!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wayanadan Huts Location"
                className="hover:scale-105 transition-transform duration-500"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-emerald-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-emerald-300 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Wayanadan Huts. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-emerald-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-emerald-300 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-emerald-300 hover:text-white text-sm transition-colors">
              Cancellation Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;