// components/Footer.jsx
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold text-white">SmartBrand</h1>
          <p className="mt-2 text-sm">Empowering smarter digital experiences.</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/services" className="hover:text-blue-400 transition">Services</a></li>
            <li><a href="/about" className="hover:text-blue-400 transition">About</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/register" className="hover:text-blue-400 transition">Register</a></li>
            <li><a href="/login" className="hover:text-blue-400 transition">Login</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-blue-400 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} SmartBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;