import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fonts = {
  title: { fontFamily: "'Bebas Neue', sans-serif" },
  body: { fontFamily: "'Montserrat', sans-serif" }
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 py-2 shadow-xl shadow-red-900/20' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-4xl text-red-600 font-bold tracking-widest transition-colors"
            style={fonts.title}
          >
            CRUEL
          </button>
        </motion.div>
        
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 md:mt-0"
        >
          <ul className="flex flex-wrap justify-center space-x-4 md:space-x-8">
            {[
              { name: "Tráiler", id: "trailer" },
              { name: "Galería", id: "galeria" },
              { name: "Producción", id: "produccion" },
              { name: "Reparto", id: "reparto" },
              { name: "Contacto", id: "contacto" }
            ].map((item) => (
              <li key={item.name}>
                <button 
                  onClick={() => scrollToSection(item.id)} 
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm md:text-base"
                  style={fonts.body}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;