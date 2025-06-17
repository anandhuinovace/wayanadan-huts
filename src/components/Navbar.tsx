import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Only update active link based on scroll if we're on the home page
      if (location.pathname === "/") {
        const sections = ["about", "accommodations", "testimonials", "contact"];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveLink(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSmoothScroll = (id: string) => {
    // Navigate to home if not there, then scroll
    if (location.pathname !== "/") {
      navigate("/"); // Push to home
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); // Delay needed after route change
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Check if the current route is the home page
  const isHomePage = location.pathname === "/";
  const isMenuPage = location.pathname === "/menu";
  const isMediaPage = location.pathname === "/media";

  // Determine navbar background based on route and scroll state
  const shouldShowTransparent = isHomePage && !isScrolled;
  const navbarBackground = shouldShowTransparent
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-md shadow-sm";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navbarBackground} ${
        shouldShowTransparent ? "py-4" : "py-2"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <span
              className={`text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent ${
                shouldShowTransparent ? "drop-shadow-lg" : ""
              }`}
            >
              Wayanadan Huts
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { id: "about", label: "About", to: "#about" },
            {
              id: "accommodations",
              label: "Accommodations",
              to: "#accommodations",
            },
            { id: "experiences", label: "Menus", to: "/menu" },
            { id: "media", label: "Media", to: "/media" },
            { id: "testimonials", label: "Testimonials", to: "#testimonials" },
            { id: "contact", label: "Contact", to: "#contact" },
          ].map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className={`relative px-2 py-1 text-lg font-medium ${
                shouldShowTransparent
                  ? activeLink === item.id ||
                    (item.to === "/menu" && isMenuPage) ||
                    (item.to === "/media" && isMediaPage)
                    ? "text-emerald-300"
                    : "text-white hover:text-emerald-300"
                  : activeLink === item.id ||
                    (item.to === "/menu" && isMenuPage) ||
                    (item.to === "/media" && isMediaPage)
                  ? "text-emerald-600"
                  : "text-gray-700 hover:text-emerald-600"
              } transition-colors duration-300 group`}
              onClick={(e) => {
                if (item.to.startsWith("#")) {
                  e.preventDefault(); // prevent anchor jump
                  setActiveLink(item.id);
                  handleSmoothScroll(item.id);
                }
              }}
            >
              {item.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 ${
                  shouldShowTransparent ? "bg-emerald-300" : "bg-emerald-600"
                } transition-all duration-300 ${
                  activeLink === item.id ||
                  (item.to === "/menu" && isMenuPage) ||
                  (item.to === "/media" && isMediaPage)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-full ${
              shouldShowTransparent
                ? "bg-white/20 text-white"
                : "bg-white/90 text-gray-800"
            } backdrop-blur-sm`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${shouldShowTransparent ? "mt-20" : "mt-16"}`}
      >
        <div className="bg-white/95 backdrop-blur-lg shadow-xl h-full w-full">
          <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
            {[
              { id: "about", label: "About", to: "#about" },
              {
                id: "accommodations",
                label: "Accommodations",
                to: "#accommodations",
              },
              { id: "experiences", label: "Menus", to: "/menu" },
              { id: "media", label: "Media", to: "/media" },
              {
                id: "testimonials",
                label: "Testimonials",
                to: "#testimonials",
              },
              { id: "contact", label: "Contact", to: "#contact" },
            ].map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className={`text-2xl font-medium py-3 px-4 rounded-lg transition-all ${
                  activeLink === item.id ||
                  (item.to === "/menu" && isMenuPage) ||
                  (item.to === "/media" && isMediaPage)
                    ? "bg-emerald-100 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  if (item.to.startsWith("#")) {
                    e.preventDefault(); // prevent anchor jump
                    setActiveLink(item.id);
                    handleSmoothScroll(item.id);
                  }
                  closeMobileMenu();
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
