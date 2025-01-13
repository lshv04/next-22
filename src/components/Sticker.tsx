import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

const Sticker = () => {
  return (
    <div>
                <div className=" flex space-x-4">
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
  )
}

export default Sticker