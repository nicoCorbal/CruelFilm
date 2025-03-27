import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Play, Calendar, User, Clock } from "lucide-react";
import SuicideCounter from "./components/Contdaor";

// Modern font pairings - maintaining gothic theme but with better typography
const fonts = {
  title: { fontFamily: "'Bebas Neue', sans-serif" },
  body: { fontFamily: "'Montserrat', sans-serif" }
};

// Header Component with smooth scrolling for navigation
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
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
            className="text-4xl text-red-600 font-bold tracking-widest  transition-colors"
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

// Enhanced Hero Section with parallax effect

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    // Disable parallax on mobile devices
    if (window.innerWidth > 768) {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    }
  };

  return (
    <section 
      id="inicio"
      className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax Background Layers */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('/blood-texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: window.innerWidth > 768 
            ? `${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%`
            : 'center'
        }}
      />
      
      {/* Dark overlay with texture */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10"></div>
      
      {/* Content with responsive layout */}
      <div className="relative z-20 max-w-4xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 
            className="text-gray-400 mb-2 tracking-widest text-xs sm:text-sm" 
            style={fonts.body}
          >
            PRESENTA
          </h2>
          
          <motion.h1
            className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-red-600 font-bold drop-shadow-lg"
            style={fonts.title}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            CRUEL
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-xs sm:text-sm text-red-500 tracking-wider uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            La desesperación tiene un nuevo rostro
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center mt-6 sm:mt-8 space-x-3 sm:space-x-6 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400 text-xs sm:text-sm">
            <Calendar className="w-[14px] sm:w-[16px] h-[14px] sm:h-[16px]" />
            <span>2025</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400 text-xs sm:text-sm">
            <Clock className="w-[14px] sm:w-[16px] h-[14px] sm:h-[16px]" />
            <span>120 min</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 text-gray-400 text-xs sm:text-sm">
            <User className="w-[14px] sm:w-[16px] h-[14px] sm:h-[16px]" />
            <span>Drama/Horror</span>
          </div>
        </motion.div>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-300 mt-6 sm:mt-8 italic leading-relaxed max-w-xl mx-auto"
          style={fonts.body}  
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          En un mundo donde el dolor es la única certeza, tres almas perdidas enfrentan su último desafío. 
          Una historia de desesperación, redención y el oscuro abrazo de lo inevitable.
        </motion.p>
        
        
      </div>
    </section>
  );
};

// Improved Section Component with better animations and styling
const Section = ({ title, id, children, className = "" }) => (
  <motion.section
    id={id}
    className={`py-12 md:py-20 px-4 md:px-6 mt-8 bg-gray-900 text-white border-t border-red-900/30 ${className}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1 }}
  >
    <div className="container mx-auto">
      <motion.h2 
        className="text-3xl md:text-4xl text-red-500 mb-8 md:mb-12 text-center" 
        style={fonts.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {title}
        <div className="h-1 w-16 md:w-24 bg-red-700 mt-4 mx-auto"></div>
      </motion.h2>
      {children}
    </div>
  </motion.section>
);

// Enhanced Trailer Section with modal video
const Trailer = () => {
  const [showTrailer, setShowTrailer] = useState(false);
  
  return (
    <Section title="Tráiler" id="trailer" className="overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer group"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          onClick={() => setShowTrailer(true)}
        >
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors flex items-center justify-center z-10">
            <div className="h-14 w-14 md:h-20 md:w-20 rounded-full bg-red-600/80 flex items-center justify-center">
              <Play size={24} className="text-white ml-1" />
            </div>
          </div>
          <img 
            src="/trailer-thumbnail.jpg" 
            alt="Trailer thumbnail"
            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
          />
        </motion.div>
        
        <motion.p
          className="text-gray-300 text-center mt-6 text-sm md:text-base"
          style={fonts.body}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Experimenta un vistazo a la oscuridad que aguarda en "CRUEL"
        </motion.p>
      </div>
      
      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTrailer(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2 }}
            >
              <button 
                className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
                onClick={() => setShowTrailer(false)}
              >
                Cerrar ×
              </button>
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

// Enhanced Gallery with better arrows and transition effects
const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;
  
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const imageDescriptions = [
    "El protagonista enfrenta sus demonios internos en una escena cargada de tensión emocional.",
    "Los límites entre la realidad y la ficción se desvanecen en esta impactante secuencia.",
    "El clímax revela verdades ocultas que cambian todo lo que creíamos saber."
  ];

  return (
    <Section title="Galería" id="galeria" className="bg-black">
      <div className="max-w-5xl mx-auto">
        <Slider {...settings} className="overflow-hidden rounded-lg shadow-2xl shadow-red-900/30">
          {["stock1.jpg", "stock2.jpg", "stock3.jpg"].map((img, index) => (
            <div key={index} className="relative">
              <div className="w-full h-[400px] md:h-[600px] overflow-hidden">
                <img
                  src={`/${img}`}
                  className="w-full h-full object-cover object-center"
                  alt={`Escena ${index + 1}`}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 md:p-8">
                <p className="text-white text-sm md:text-lg" style={fonts.body}>
                  {imageDescriptions[index]}
                </p>
              </div>
            </div>
          ))}
        </Slider>
        
        {/* Custom pagination indicator - mobile friendly */}
        <div className="flex justify-center mt-4 md:mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`h-1 transition-all duration-300 ${currentSlide === index ? 'w-8 md:w-12 bg-red-600' : 'w-4 md:w-6 bg-gray-700'}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

// Custom Arrow Components with improved styling
const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 bg-black/60 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-red-700 transition-all duration-300 z-10"
    onClick={onClick}
  >
    <ChevronLeft size={20} />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 bg-black/60 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full hover:bg-red-700 transition-all duration-300 z-10"
    onClick={onClick}
  >
    <ChevronRight size={20} />
  </button>
);

const Production = () => {
  const team = [
    { name: "Marcos Ares", role: "Director", photo: "/director.jpg" },
    { name: "Luis Outeiriño", role: "Director de Fotografía", photo: "/cinematographer.jpg" },
    { name: "Pablo Oliveira", role: "Productor Ejecutivo", photo: "/producer.jpg" },
    { name: "Óscar G. Calviño", role: "Director de Arte", photo: "/director.jpg" },
    { name: "Roi Torres", role: "Ayudante de Cámara", photo: "/cinematographer.jpg" },
    { name: "Candela Lorenzo", role: "Script", photo: "/producer.jpg" },
    { name: "Noé Cárcamo", role: "Sonidista", photo: "/director.jpg" },
    { name: "Hugo Fernández", role: "Making Off", photo: "/cinematographer.jpg" },
    { name: "Sara López", role: "Directora de Prod.", photo: "/producer.jpg" },
    { name: "Alejandro C. Oliveira", role: "Jefe de Prod.", photo: "/director.jpg" },
    { name: "Fernando Andrés Mourinho", role: "Aux Producción 1", photo: "/cinematographer.jpg" },
    { name: "Xulia Ferrradás", role: "Aux Producción 2", photo: "/producer.jpg" },
    { name: "Manuel Debén", role: "Aux Producción 3", photo: "/director.jpg" },
    { name: "José Miguel Villanueva", role: "Aux Producción 4", photo: "/cinematographer.jpg" },
    { name: "Ariel Joshuá Egas", role: "Aux Producción 5", photo: "/producer.jpg" },
  ];

  return (
    <Section title="Producción" id="produccion">
      <motion.p 
        className="text-base md:text-xl text-center max-w-3xl mx-auto text-gray-300 px-4"
        style={fonts.body}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        "CRUEL" fue realizado por un equipo apasionado de cineastas, con un enfoque en 
        la cinematografía oscura y narrativa impactante que penetra en lo más profundo de la psique humana.
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mt-8 md:mt-16 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {team.map((member, index) => (
          <motion.div 
            key={member.name}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden mb-2 sm:mb-4 border-2 border-red-800">
              <img 
                src={member.photo} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm sm:text-base md:text-xl text-red-500" style={fonts.title}>{member.name}</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-400" style={fonts.body}>{member.role}</p>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-8 md:mt-16 bg-black/50 p-4 sm:p-6 md:p-8 mx-4 rounded-lg border border-red-900/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-lg sm:text-xl md:text-2xl text-red-500 mb-3 sm:mb-4" style={fonts.title}>Detrás de cámaras</h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-300" style={fonts.body}>
          La producción de "CRUEL" abarcó más de 8 meses de rodaje en locaciones reales, 
          utilizando técnicas innovadoras de iluminación y cinematografía para crear una 
          atmósfera única que sumerge al espectador en una experiencia sensorial completa.
        </p>
      </motion.div>
    </Section>
  );
};
const Reparto = () => {
  const team = [
    { name: "Martin Álvarez", role: "Dante", photo: "/director.jpg" },
    { name: "Antonio praza", role: "Nacho", photo: "/cinematographer.jpg" },
    { name: "Concha", role: "Madre de Dante", photo: "/producer.jpg" },
    { name: "Alejandra Quijano", role: "Chica ", photo: "/director.jpg" },
    { name: "Roi Torres", role: "Ayudante de Cámara", photo: "/cinematographer.jpg" },
    { name: "Candela Lorenzo", role: "Script", photo: "/producer.jpg" },
  ];

  return (
    <Section title="Reparto" id="reparto">
      <motion.p 
        className="text-base md:text-xl text-center max-w-3xl mx-auto text-gray-300 px-4"
        style={fonts.body}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        "CRUEL" fue realizado por un equipo apasionado de cineastas, con un enfoque en 
        la cinematografía oscura y narrativa impactante que penetra en lo más profundo de la psique humana.
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 md:mt-16 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {team.map((member, index) => (
          <motion.div 
            key={member.name}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden mb-2 sm:mb-4 border-2 border-red-800">
              <img 
                src={member.photo} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm sm:text-base md:text-xl text-red-500" style={fonts.title}>{member.name}</h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-400" style={fonts.body}>{member.role}</p>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-8 md:mt-16 bg-black/50 p-4 sm:p-6 md:p-8 mx-4 rounded-lg border border-red-900/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-lg sm:text-xl md:text-2xl text-red-500 mb-3 sm:mb-4" style={fonts.title}>Detrás de cámaras</h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-300" style={fonts.body}>
          La producción de "CRUEL" abarcó más de 8 meses de rodaje en locaciones reales, 
          utilizando técnicas innovadoras de iluminación y cinematografía para crear una 
          atmósfera única que sumerge al espectador en una experiencia sensorial completa.
        </p>
      </motion.div>
    </Section>
  );
};


// Simplified Contact Section without form and "mantente conectado"
const Contact = () => {
  return (
    <Section title="Contacto" id="contacto" className="bg-black/60">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div>
          <h3 className="text-xl md:text-2xl text-red-500 mb-4 text-center" style={fonts.title}>Síguenos</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://www.instagram.com/cruel_film/" className="text-gray-400 hover:text-red-500 transition-colors">
              <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:border-red-500 transition-colors">
                <span className="text-2xl">📸</span>
              </div>
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-red-500 transition-colors">
              <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:border-red-500 transition-colors">
                <span className="text-2xl">🐦</span>
              </div>
            </a>
            <a href="https://youtube.com" className="text-gray-400 hover:text-red-500 transition-colors">
              <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:border-red-500 transition-colors">
                <span className="text-2xl">📺</span>
              </div>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl md:text-2xl text-red-500 mb-4 text-center" style={fonts.title}>Información</h3>
          <ul className="space-y-4 text-gray-300 max-w-md mx-auto" style={fonts.body}>
            <li className="flex items-start space-x-4 justify-center">
              <span className="text-red-500">📧</span>
              <span>info@cruelfilm.com</span>
            </li>
            <li className="flex items-start space-x-4 justify-center">
              <span className="text-red-500">📞</span>
              <span>+34 555 123 456</span>
            </li>
            <li className="flex items-start space-x-4 justify-center">
              <span className="text-red-500">📍</span>
              <span>Ourense, Galicia</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl md:text-2xl text-red-500 mb-4 text-center" style={fonts.title}>Festivales</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {["Festival de Sitges", "Nocturna Madrid", "BIFFF"].map((festival) => (
              <span key={festival} className="bg-gray-800 text-xs md:text-sm text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                {festival}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

// New Footer Component
const Footer = () => (
  <footer className="bg-black text-gray-400 py-8 md:py-12 border-t border-red-900/30">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl md:text-3xl text-red-600" style={fonts.title}>CRUEL</h2>
          <p className="text-xs md:text-sm mt-2" style={fonts.body}>© 2025 Todos los derechos reservados</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          <button onClick={() => document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Inicio</button>
          <button onClick={() => document.getElementById('trailer').scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Tráiler</button>
          <button onClick={() => document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Galería</button>
          <button onClick={() => document.getElementById('produccion').scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Producción</button>
          <button onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-red-500 transition-colors text-sm">Contacto</button>
        </div>
      </div>
      
      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-800 text-xs md:text-sm text-center" style={fonts.body}>
        <p>Diseñado con pasión por el cine de terror.</p>
        <p className="mt-2">
          <a href="#" className="text-gray-400 hover:text-red-500 transition-colors mx-2">Política de Privacidad</a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition-colors mx-2">Términos de Uso</a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition-colors mx-2">Cookies</a>
        </p>
      </div>
    </div>
  </footer>
);

// Main App Component with all sections
const App = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <Hero />
      <main>
        <Trailer />
        <Gallery />
        <Production />
        <Reparto />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;