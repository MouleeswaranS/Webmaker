// File: src/pages/AboutPage.jsx
import React, { useState, useEffect } from 'react';
import Cursor from '../components/Cursor';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';

const AboutPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-black text-white overflow-x-hidden">
      <Cursor />
      {loading && <Loading />}
      {!loading && (
        <>
          <Navbar loading={loading} />
          <AboutSection />
        </>
      )}
    </main>
  );
};

export default AboutPage;

// In App.jsx
// Add the route like this:
// import AboutPage from './pages/AboutPage';
// <Route path="/about" element={<AboutPage />} />

// In Navbar.jsx, update menu item:
// import { Link } from 'react-router-dom';
// Replace href="#AboutUs" with:
// <Link to="/about" className="hover:text-pink-400 transition text-white">About us</Link>
