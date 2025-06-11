import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Only update active link based on scroll if we're on the home page
      if (location.pathname === '/') {
        const sections = ['about', 'accommodations', 'testimonials', 'contact'];
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if the current route is the menu page
  const isMenuPage = location.pathname === '/menu';
  const isMediaPage = location.pathname === '/media';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <span className={`text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent ${
              isScrolled ? '' : 'drop-shadow-lg'
            }`}>
              Wayanadan Huts
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { id: 'about', label: 'About', to: '#about' },
            { id: 'accommodations', label: 'Accommodations', to: '#accommodations' },
            { id: 'experiences', label: 'Menus', to: '/menu' },
            { id: 'media', label: 'Media', to: '/media' },
            { id: 'testimonials', label: 'Testimonials', to: '#testimonials' },
            { id: 'contact', label: 'Contact', to: '#accommodations' },
          ].map((item) => (
            <Link 
              key={item.id}
              to={item.to}
              className={`relative px-2 py-1 text-lg font-medium ${
                isScrolled 
                  ? (activeLink === item.id || (item.to === '/menu' && isMenuPage) || (item.to === '/media' && isMediaPage))
                    ? 'text-emerald-600' 
                    : 'text-gray-700 hover:text-emerald-600'
                  : (activeLink === item.id || (item.to === '/menu' && isMenuPage) || (item.to === '/media' && isMediaPage))
                    ? 'text-emerald-300'
                    : 'text-white hover:text-emerald-300'
              } transition-colors duration-300 group`}
              onClick={() => {
                if (item.to.startsWith('#')) {
                  setActiveLink(item.id);
                }
              }}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                (activeLink === item.id || (item.to === '/menu' && isMenuPage) || (item.to === '/media' && isMediaPage)) ? 'w-full' : 'w-0 group-hover:w-full'
              } ${isScrolled ? '' : 'bg-emerald-300'}`}></span>
            </Link>
          ))}
          {/* <Button 
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all"
            onClick={() => window.scrollTo(0, document.body.scrollHeight)}
          >
            Book Now
          </Button> */}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-full ${
              isScrolled 
                ? 'bg-white/90 text-gray-800' 
                : 'bg-white/20 text-white'
            } backdrop-blur-sm`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ease-in-out ${
        isMobileMenuOpen 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0 pointer-events-none'
      } ${isScrolled ? 'mt-16' : 'mt-20'}`}>
        <div className="bg-white/95 backdrop-blur-lg shadow-xl h-full w-full">
          <div className="container mx-auto px-6 py-8 flex flex-col space-y-6">
            {[
              { id: 'about', label: 'About', to: '#about' },
              { id: 'accommodations', label: 'Accommodations', to: '#accommodations' },
              { id: 'experiences', label: 'Menus', to: '/menu' },
              { id: 'media', label: 'Media', to: '/media' },
              { id: 'testimonials', label: 'Testimonials', to: '#testimonials' },
              { id: 'contact', label: 'Contact', to: '#contact' },
            ].map((item) => (
              <Link 
                key={item.id}
                to={item.to}
                className={`text-2xl font-medium py-3 px-4 rounded-lg transition-all ${
                  (activeLink === item.id || (item.to === '/menu' && isMenuPage) || (item.to === '/media' && isMediaPage))
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => {
                  if (item.to.startsWith('#')) {
                    setActiveLink(item.id);
                  }
                  closeMobileMenu();
                }}
              >
                {item.label}
              </Link>
            ))}
            {/* <Button 
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-4 text-lg mt-4 shadow-lg"
              onClick={() => {
                window.scrollTo(0, document.body.scrollHeight);
                closeMobileMenu();
              }}
            >
              Book Now
            </Button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;