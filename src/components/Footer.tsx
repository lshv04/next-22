import React from "react";
import Sticker from "./Sticker";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Copyright */}
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Leandro Hosken. All Rights Reserved.
        </p>

        {/* Social Links */}
        <Sticker />
      </div>
    </footer>
  );
};

export default Footer;
