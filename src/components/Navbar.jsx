import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Webmaker-Icon-01.jpg';
import PropTypes from 'prop-types';

const Navbar = ({ loading }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const openContactModal = () => setShowContactModal(true);
  const closeContactModal = () => setShowContactModal(false);

  const menuItems = [
    { name: 'Home', to: '/' },
    { name: 'About us', to: '/about' },
    { name: 'Our Services', to: '/services' },
    { name: 'Portfolio', to: '/portfolio' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'Shop', to: '/shop' },
    { name: 'Contact us', to: '/contact' },
  ];

  useEffect(() => {
    if (!loading) {
      const delay = setTimeout(() => setShowNavbar(true), 500);
      return () => clearTimeout(delay);
    }
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1 }}
            className={`w-[95%] fixed top-4 left-1/2 -translate-x-1/2 z-[999] transition-all duration-500 ${isScrolled ? 'bg-black shadow-lg scale-[0.98] rounded-full' : 'bg-black rounded-full'}`}
          >
            {!isScrolled && (
              <div className="w-full bg-white text-black text-sm flex justify-between px-6 py-2 font-medium rounded-t-full">
                <div className="flex items-center space-x-2">
                  <FaLocationDot className="text-purple-600" />
                  <span>Pondicherry</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-green-600" />
                  <span>+91 96262 66254</span>
                </div>
              </div>
            )}

            <nav className="w-[92%] mx-auto px-9 py-6 flex items-center justify-between bg-black text-gray-50 rounded-full">
              <Link to="/" className="flex items-center space-x-2 cursor-pointer">
                <img src={logo} alt="Logo" className="h-10 w-auto rounded-full" />
                <span className="font-bold text-xl">Web Makerz</span>
              </Link>

              <ul className="hidden md:flex space-x-6 text-xl font-semibold">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    {item.name === 'Home' ? (
                      <button
                        className="hover:text-pink-400 transition text-white"
                        onClick={() => window.location.href = '/'}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link to={item.to} className="hover:text-pink-400 transition text-white">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="hidden md:flex">
                <button
                  onClick={openContactModal}
                  className="bg-white text-black font-medium px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition"
                >
                  <span>Contact us</span>
                  <FaArrowRight />
                </button>
              </div>

              <button
                onClick={toggleMenu}
                className="md:hidden text-white text-3xl z-50 cursor-pointer absolute right-6 top-[4.3rem]"
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>

              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="md:hidden fixed inset-0 bg-black bg-opacity-95 text-white z-40 px-6 pt-24"
                  >
                    <ul className="flex flex-col space-y-6 text-xl font-semibold">
                      {menuItems.map((item) => (
                        <li key={item.name}>
                          {item.name === 'Home' ? (
                            <button
                              className="hover:text-pink-400 transition text-white"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                window.location.href = '/';
                              }}
                            >
                              {item.name}
                            </button>
                          ) : (
                            <Link
                              to={item.to}
                              className="hover:text-pink-400 transition"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        toggleMenu();
                        openContactModal();
                      }}
                      className="mt-8 bg-white text-black font-medium px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition"
                    >
                      <span className="cursor-pointer">Contact us</span>
                      <FaArrowRight />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContactModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeContactModal}
          >
            <motion.div
              className="relative w-[90%] max-w-md rounded-2xl p-6 shadow-2xl text-white bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-700 via-pink-500 to-yellow-400 backdrop-blur-lg border border-white/20 overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 z-0 opacity-30 bg-[conic-gradient(from_180deg_at_50%_50%,#ff00cc,#3333ff,#ffcc00,#ff00cc)] animate-spin-slow rounded-2xl blur-2xl"></div>
              <button className="absolute top-3 right-3 text-white text-lg z-10" onClick={closeContactModal}>
                <FaTimes />
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center relative z-10">Contact Us</h2>

              <div className="space-y-4 relative z-10">
                <input type="text" placeholder="Your phone number" className="w-full p-2 bg-white/10 text-white border border-white/30 rounded focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white" />
                <input type="email" placeholder="Your email address" className="w-full p-2 bg-white/10 text-white border border-white/30 rounded focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white" />
                <textarea placeholder="Your message..." rows="4" className="w-full p-2 bg-white/10 text-white border border-white/30 rounded focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white" />
                <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition w-full font-semibold"
                  onClick={() => {
                    alert('Submitted!');
                    closeContactModal();
                  }}
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Navbar.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Navbar;
