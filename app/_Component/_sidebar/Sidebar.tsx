import { FaHome, FaUserAlt, FaEnvelope, FaVideo, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // State to control sidebar visibility
  const [isSticky, setIsSticky] = useState(false); // State to control if sidebar should stick to top
  const router = useRouter();
  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar visibility
  };

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 18 * 4) { // Adjust 18*4 if the spacing needs to be different
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed ${isSticky ? 'top-0' : 'top-18'} left-0 h-full bg-gray-800 text-white shadow-md p-6 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute top-4 right-[-25px] bg-gray-800 text-white p-2 rounded-full shadow-md transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Logo or Header */}
      <div className="text-2xl font-bold mb-6">
        My App
      </div>

      {/* Navigation Links */}
      <ul className="w-full space-y-4">
        <li className="w-full">
          <button
           onClick={() => router.push("/posts")}
            className="flex items-center p-2 rounded-lg hover:bg-violet-700 transition-colors duration-200"
          >
            <FaHome className="mr-3" />
            Home
          </button>
        </li>
        <li className="w-full">
          <button
         onClick={() => router.push("/profile")}
            className="flex items-center p-2 rounded-lg hover:bg-violet-700 transition-colors duration-200"
          >
            <FaUserAlt className="mr-3" />
            Profile
          </button>
        </li>
        <li className="w-full">
          <a
            href="#"
            className="flex items-center p-2 rounded-lg hover:bg-violet-700 transition-colors duration-200"
          >
            <FaEnvelope className="mr-3" />
            Contact
          </a>
        </li>
        <li className="w-full">
          <a
            href="#"
            className="flex items-center p-2 rounded-lg hover:bg-violet-700 transition-colors duration-200"
          >
            <FaVideo className="mr-3" />
            Video
          </a>
        </li>
      </ul>

      {/* Social Media Links */}
      <div className="mt-auto flex space-x-4 justify-center">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f text-xl hover:text-violet-700 transition-colors duration-200"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter text-xl hover:text-violet-700 transition-colors duration-200"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram text-xl hover:text-violet-700 transition-colors duration-200"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in text-xl hover:text-violet-700 transition-colors duration-200"></i>
        </a>
      </div>
    </div>
  );
}
