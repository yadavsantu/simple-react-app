import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    fetch(`http://localhost:5001/api/user/name/${email}`)
      .then(res => res.json())
      .then(data => {
        if (data.firstName) {
          setUserName(`${data.firstName} ${data.lastName}`);
        }
      })
      .catch(err => {
        console.error('Failed to fetch user name:', err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserName(null);
    window.location.href = '/login'; // redirect to login
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-600 tracking-tight">
          <a href="/">SmartBrand</a>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="text-gray-700 font-medium hover:text-blue-600 hover:underline underline-offset-8 transition duration-300"
            >
              {link.name}
            </a>
          ))}

          {userName ? (
            <>
              <span className="ml-4 text-sm font-semibold text-blue-700">
                👋 Welcome, {userName.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/register"
                className="ml-4 text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Register
              </a>
              <a
                href="/login"
                className="ml-2 text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Login
              </a>
            </>
          )}
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
          {userName ? (
            <>
              <div className="text-sm font-semibold text-blue-700 pt-2">
                👋 Welcome, {userName.split(' ')[0]}
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/register"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Register
              </a>
              <a
                href="/login"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Login
              </a>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;