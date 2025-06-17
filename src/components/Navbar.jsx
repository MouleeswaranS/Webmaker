import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import logo from '../assets/Webmaker-Icon-01.jpg';
import PropTypes from 'prop-types';

const Navbar = ({ loading }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const menuItems = [
    'Home', 'About us', 'Our Services',
    'Portfolio', 'Pricing', 'Shop', 'Contact us',
  ];

  useEffect(() => {
    if (!loading) {
      const delay = setTimeout(() => setShowNavbar(true), 500);
      return () => clearTimeout(delay);
    }
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showNavbar && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1 }}
          className={`w-full top-0 left-0 z-50 fixed transition-all duration-500 ${
            isScrolled ? 'backdrop-blur-lg bg-white/80 shadow-lg scale-[0.98]' : ''
          }`}
        >
          {/* Top Contact Bar */}
          <div className="w-full bg-white text-black text-sm flex justify-between px-6 py-2 font-medium">
            <div className="flex items-center space-x-2">
              <FaLocationDot className="text-purple-600" />
              <span>Pondicherry</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-green-600" />
              <span>+91 96262 66254</span>
            </div>
          </div>

          {/* Main Navbar */}
<nav className="w-[92%] mx-auto px-6 py-7 flex items-center justify-between bg-black text-gray-50 rounded-full">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-hover-target">
              <img src={logo} alt="Logo" className="h-10 w-auto rounded-full" />
              <span className="font-bold text-xl"> Web Makerz </span>
            </div>

            {/* Menu items */}
            <ul className="hidden md:flex space-x-6 text-3xl font-semibold">
              {menuItems.map((item) => (
                <li key={item}>
                  <a
                    href="#Home"
                    className="cursor-hover-target hover:text-pink-400 transition text-white text-2xl"
                  >
                    <a
                    href="#About Us"
                    className="cursor-hover-target hover:text-pink-400 transition text-white text-2xl"
                  >
                    <a
                    href="#Service"
                    className="cursor-hover-target hover:text-pink-400 transition text-white text-2xl"
                  >
                    <a
                    href="#Home"
                    className="cursor-hover-target hover:text-pink-400 transition text-white text-2xl"
                  >
                    <a
                    href="#Home"
                    className="cursor-hover-target hover:text-pink-400 transition text-white text-2xl"
                  >

                  </a>
                  </a>
                  </a>
                  </a>
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Button */}
            <div className="hidden md:flex">
              <button className="cursor-hover-target bg-white text-black font-medium px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-gray-200 transition">
                <span className="cursor-pointer">Contact us</span>
                <FaArrowRight />
              </button>
            </div>

            {/* Mobile toggle button */}
{/* Mobile toggle button */}
<button
  onClick={toggleMenu}
  className="md:hidden text-white text-3xl z-50 cursor-pointer absolute right-6 top-[4.3rem]"
>
  {mobileMenuOpen ? <FaTimes /> : <FaBars />}
</button>

{/* Mobile Menu Drawer */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="md:hidden fixed top-0 right-0 h-full w-3/4 bg-black text-white z-40 px-6 pt-24"
    >
      <ul className="flex flex-col space-y-6 text-xl font-semibold">
        {menuItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item.replace(/\s+/g, '')}`}
              onClick={toggleMenu}
              className="cursor-hover-target hover:text-pink-400 transition"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={toggleMenu}
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
  );
};

Navbar.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Navbar;
