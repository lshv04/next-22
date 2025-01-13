import React from 'react';
import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Copyright */}
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Leandro Hosken. All Rights Reserved.
        </p>

        {/* Social Links */}
        <div className="sticker flex space-x-4">
          <a
            href="https://www.linkedin.com/in/leandrohosken/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <FaLinkedin size={20} />
            
          </a>
          <a
            href="https://github.com/lshv04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <FaGithub size={20} />
            
          </a>
          <a
            href="https://wa.me/5531987670611"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <FaWhatsapp size={20} />
            
          </a>
          <a
            href="mailto:lshv04@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <FaEnvelope size={20} />
            
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
