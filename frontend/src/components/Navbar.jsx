// components/Navbar.jsx
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Register', path: '/register' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-600 tracking-tight">
          <a href="/">SmartBrand</a>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-gray-700 font-medium hover:text-blue-600 hover:underline underline-offset-8 transition duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-white px-6 pb-4 space-y-2 shadow">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="block text-gray-700 font-medium hover:text-blue-600 hover:underline underline-offset-4 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;