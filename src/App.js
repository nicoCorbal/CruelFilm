import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  Play, 
  Calendar, 
  Clock, 
  Film,
  Users,
  Camera,
  Star,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowUp
} from "lucide-react";

// Professional Font System
const fonts = {
  title: { fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: "0.05em" },
  subtitle: { fontFamily: "'Playfair Display', serif", fontWeight: 500 },
  body: { fontFamily: "'Poppins', sans-serif", fontWeight: 400 }
};

// Sleek Header that appears after Hero scroll
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setHeaderVisible(window.scrollY > heroHeight - 100);
      setScrolled(window.scrollY > heroHeight + 50);
      
      // Detect active section
      const sections = ['inicio', 'trailer', 'galeria', 'produccion', 'reparto', 'entrevistas', 'prensa', 'contacto'];
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
      setActiveSection(id);
    }
  };

  const navItems = [
    { name: "Inicio", id: "inicio", icon: <Film size={18} /> },
    { name: "Tráiler", id: "trailer", icon: <Play size={18} /> },
    { name: "Galería", id: "galeria", icon: <Camera size={18} /> },
    { name: "Producción", id: "produccion", icon: <Users size={18} /> },
    { name: "Reparto", id: "reparto", icon: <Star size={18} /> },
    { name: "Entrevistas", id: "entrevistas", icon: <Youtube size={18} /> },
    { name: "Prensa", id: "prensa", icon: <Calendar size={18} /> },
    { name: "Contacto", id: "contacto", icon: <Mail size={18} /> }
  ];

  return (
    <>
      <motion.header 
        className={`fixed w-full z-50 transition-all duration-700 ${
          scrolled 
            ? 'backdrop-blur-xl bg-black/90 py-3 shadow-2xl' 
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ 
          y: headerVisible ? 0 : -100,
          opacity: headerVisible ? 1 : 0
        }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.25 }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Image */}
            <motion.div
              className="flex items-center"
            >
              <button
                onClick={() => scrollToSection("inicio")}
                className="hover:opacity-80 transition-opacity duration-300"
              >
                <img 
                  src="/galeria/CRUEL_3.png"
                  alt="CRUEL"
                  className="h-8 sm:h-10 md:h-12 w-auto"
                />
              </button>
            </motion.div>
            
            {/* Clean Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button 
                      onClick={() => scrollToSection(item.id)} 
                      className={`relative text-sm font-medium transition-all duration-300 ${
                        activeSection === item.id 
                          ? 'text-red-500' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                      style={fonts.body}
                    >
                      {item.name}
                      {activeSection === item.id && (
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500"
                          layoutId="activeNav"
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Simple Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 w-full sm:w-80 max-w-full bg-black/95 backdrop-blur-2xl z-50 lg:hidden border-l border-red-900/20"
            >
              <div className="flex flex-col h-full pt-20 pb-6 px-4 sm:px-6">
                <nav className="flex-1">
                  <ul className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-4 sm:px-5 py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center space-x-3 text-sm sm:text-base ${
                            activeSection === item.id
                              ? 'bg-red-600/20 text-red-400 shadow-lg shadow-red-600/10'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }`}
                          style={fonts.body}
                        >
                          <span className="text-red-500/70">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                          {activeSection === item.id && (
                            <motion.span 
                              className="ml-auto w-2 h-2 rounded-full bg-red-500"
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                
                {/* Mobile Menu Footer */}
                <div className="pt-6 border-t border-red-900/20">
                  <p className="text-gray-500 text-xs text-center">© 2025 CRUEL FILM</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Clean & Powerful Hero Section
const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);
  
  return (
    <section 
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Clean Gradient Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        {/* Subtle red accent */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Subtle Animated Elements */}
      <div className="absolute inset-0 z-5">
        {/* Top and Bottom Vignette */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      </div>
      
      {/* Main Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Production Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <img
            src="/galeria/diow.png"
            alt="Dionysiacus Productions"
            className="mx-auto w-24 sm:w-32 md:w-40 lg:w-48 opacity-90"
          />
          <p className="text-gray-400 text-xs sm:text-sm tracking-[0.4em] uppercase mt-3" style={fonts.body}>
            Presenta
          </p>
        </motion.div>
        
        {/* Main Title - CRUEL Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.8 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mb-6"
        >
          <img
            src="/galeria/CRUEL_3.png"
            alt="CRUEL"
            className="mx-auto w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[32rem]"
          />
        </motion.div>
        
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-base md:text-lg lg:text-xl text-red-500 mb-8 font-light tracking-wide"
          style={fonts.subtitle}
        >
          La historia de un suicidio
        </motion.p>
        
        {/* Film Details - Minimalist */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 0.8 : 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 text-sm text-gray-400"
          style={fonts.body}
        >
          <span>28 Marzo 2025</span>
          <span className="hidden md:inline">•</span>
          <span>17:15 min</span>
          <span className="hidden md:inline">•</span>
          <span>Drama</span>
        </motion.div>
        
        {/* Synopsis - Subtle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 0.9 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-2xl mx-auto mb-12 text-gray-300 text-sm md:text-base leading-relaxed text-center"
          style={fonts.body}
        >
          Un joven sin esperanza marca en su calendario el día de su muerte
        </motion.p>
        
        {/* CTA Buttons - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
        >
          <button
            onClick={() => document.getElementById('trailer').scrollIntoView({ behavior: 'smooth' })}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black text-sm sm:text-base font-medium hover:bg-gray-200 transition-all duration-300 rounded-full sm:rounded"
            style={fonts.body}
          >
            <span className="flex items-center justify-center space-x-2">
              <Play size={16} fill="currentColor" className="sm:w-[18px] sm:h-[18px]" />
              <span>Ver Tráiler</span>
            </span>
          </button>
          <button
            onClick={() => document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' })}
            className="px-6 sm:px-8 py-2.5 sm:py-3 border border-white/30 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 text-sm sm:text-base rounded-full sm:rounded"
            style={fonts.body}
          >
            Explorar
          </button>
        </motion.div>
      </motion.div>
      
      {/* Minimal Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 0.5 : 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

// Modern Section Component with Reveal Animations
const Section = ({ title, id, children, className = "", dark = false }) => {
  const ref = useRef(null);
  
  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative py-20 md:py-32 px-4 md:px-6 overflow-hidden ${
        dark ? 'bg-black' : 'bg-gradient-to-b from-gray-950 to-black'
      } ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, red 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, red 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-20"
          >
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl text-center font-bold"
              style={fonts.title}
            >
              <span className="text-gradient-animated">{title}</span>
            </h2>
            <div className="flex justify-center mt-6">
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
            </div>
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
};

// Premium Trailer Section
const Trailer = () => {
  const [showTrailer, setShowTrailer] = useState(false);
  
  return (
    <Section title="Tráiler Oficial" id="trailer" dark>
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group neon-border"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          onClick={() => setShowTrailer(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-20"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-full blur-xl animate-pulse-glow"></div>
              <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-2xl">
                <Play size={32} className="text-white ml-1" fill="white" />
              </div>
            </div>
          </motion.div>
          
          <img 
            src="/galeria/CRUEL_7.png" 
            alt="Trailer thumbnail"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
        
      </div>
      
      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div 
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTrailer(false)}
          >
            <motion.div
              className="relative w-full max-w-6xl aspect-video"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-14 right-0 text-white hover:text-red-500 transition-colors flex items-center space-x-2"
                onClick={() => setShowTrailer(false)}
              >
                <span style={fonts.body}>Cerrar</span>
                <X size={24} />
              </button>
              <iframe
                src="https://www.youtube.com/embed/TZK2u1Bpsfk?si=ho86C9L9in_e5Jk4&autoplay=1" 
                title="Tráiler de CRUEL" 
                frameBorder="0"
                className="w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

// Simple Gallery Component
const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 24;

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    fade: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: false
        }
      }
    ]
  };

  const galeriaImages = Array.from({ length: 24 }, (_, i) => ({
    src: `/galeria/${i + 1}.png`,
    title: `Escena ${i + 1}`
  }));

  return (
    <Section title="Galería" id="galeria" dark>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Slider */}
          <div className="relative gallery-container">
            <Slider {...settings}>
              {galeriaImages.map((img, index) => (
                <div key={index} className="outline-none">
                  <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-black flex items-center justify-center">
                    <img
                      src={img.src}
                      className="max-w-full max-h-full object-contain"
                      alt={img.title}
                    />
                  </div>
                </div>
              ))}
            </Slider>
            
            {/* Counter positioned absolutely */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 backdrop-blur px-3 py-1 rounded-full z-10">
              <span className="text-white text-xs" style={fonts.body}>
                {currentSlide + 1} / {totalSlides}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

// Simple Arrow Components
const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 backdrop-blur flex items-center justify-center rounded-full transition-all duration-300 z-10"
    onClick={onClick}
    aria-label="Imagen anterior"
  >
    <ChevronLeft size={16} className="text-white sm:w-5 sm:h-5" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 backdrop-blur flex items-center justify-center rounded-full transition-all duration-300 z-10"
    onClick={onClick}
    aria-label="Siguiente imagen"
  >
    <ChevronRight size={16} className="text-white sm:w-5 sm:h-5" />
  </button>
);

// Premium Production Team Section
const Production = () => {
  const [showMakingOf, setShowMakingOf] = useState(false);
  const team = [
    { name: "Marcos Ares", role: "Director", photo: "/equipo/MARCOS ARES.jpeg" },
    { name: "Luis Outeiriño", role: "Director de Fotografía", photo: "/equipo/LUIS OUTEIRIÑO.jpeg" },
    { name: "Pablo Oliveira", role: "Productor Ejecutivo", photo: "/equipo/PABLO OLIVEIRA.jpeg" },
    { name: "Óscar G. Calviño", role: "Director de Arte", photo: "/equipo/ÓSCAR G.CALVIÑO.jpeg" },
    { name: "Roi Torres", role: "Ayudante de Cámara", photo: "/equipo/ROI TORRES.jpeg" },
    { name: "Candela Lorenzo", role: "Script", photo: "/equipo/CANDELA LORENZO.jpeg" },
    { name: "Noé Cárcamo", role: "Sonidista", photo: "/equipo/noe.jpg" },
    { name: "Hugo Fernández", role: "Making Off", photo: "/equipo/HUGO FERNÁNDEZ.jpeg" },
    { name: "Sara López", role: "Directora de Prod.", photo: "/equipo/SARA LÓPEZ.jpeg" },
    { name: "Alejandro C. Oliveira", role: "Jefe de Prod.", photo: "/equipo/ALEJANDRO CALVO.jpeg" },
    { name: "Fernando A. Mourinho", role: "Aux Producción", photo: "/equipo/FERNANDO ANDRÉS MOURIÑO.jpeg" },
    { name: "Xulia Ferradás", role: "Aux Producción", photo: "/equipo/xulia.jpg" },
    { name: "Manuel Debén", role: "Aux Producción", photo: "/equipo/MANUEL DEBÉN.jpeg" },
    { name: "José M. Villanueva", role: "Aux Producción", photo: "/equipo/JOSÉ MIGUEL VILLANUEVA.jpeg" },
    { name: "Ariel J. Egas", role: "Aux Producción", photo: "/equipo/ARIEL JOSHUÁ.jpeg" },
  ];

  return (
    <Section title="Equipo de Producción" id="produccion" dark>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-xl text-gray-300 max-w-3xl mx-auto" style={fonts.body}>
          Talento del CIFP A Farixa que ha hecho realidad este proyecto con dedicación y profesionalismo.
        </p>
      </motion.div>
      
      {/* Team Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 lg:gap-8 mb-16 sm:mb-20 justify-items-center">
        {team.map((member, index) => (
          <motion.div 
            key={member.name}
            className="group text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <div className="relative mb-3 sm:mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-2xl overflow-hidden border-2 border-gray-800 group-hover:border-red-500/50 transition-all duration-500">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 text-center px-2" style={fonts.subtitle}>
              {member.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 text-center" style={fonts.body}>{member.role}</p>
          </motion.div>
        ))}
      </div>
      
      {/* Behind the Scenes */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-dark rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-12 mx-4 sm:mx-0"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gradient" style={fonts.title}>
          Detrás de Cámaras
        </h3>
        <p className="text-gray-300 leading-relaxed mb-8" style={fonts.body}>
          La producción de "CRUEL" abarcó más de 6 meses de trabajo intenso. El rodaje se realizó en 3 jornadas memorables, 
          utilizando locaciones reales y técnicas cinematográficas innovadoras para crear una atmósfera única que sumerge 
          al espectador en una experiencia sensorial completa.
        </p>
        
        {/* Making Of Video */}
        <div 
          className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => setShowMakingOf(true)}
        >
          <img 
            src="/galeria/CRUEL_4.png" 
            alt="Making Of"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-red-600 rounded-full blur-xl"></div>
              <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full bg-red-600 flex items-center justify-center">
                <Play size={28} className="text-white ml-1" fill="white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Making Of Modal */}
      <AnimatePresence>
        {showMakingOf && (
          <motion.div 
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMakingOf(false)}
          >
            <motion.div
              className="relative w-full max-w-6xl aspect-video"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-14 right-0 text-white hover:text-red-500 transition-colors flex items-center space-x-2"
                onClick={() => setShowMakingOf(false)}
              >
                <span style={fonts.body}>Cerrar</span>
                <X size={24} />
              </button>
              <iframe
                src="https://www.youtube.com/embed/4ZDg-uD68lg?si=OvpoHAufQg-zLK5z&autoplay=1" 
                title="Making Of de CRUEL" 
                frameBorder="0"
                className="w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

// Cast Section
const Reparto = () => {
  const cast = [
    { name: "Martín Álvarez", role: "Dante", photo: "/equipo/1.jpg", bio: "Protagonista" },
    { name: "Antonio Praza", role: "Nacho", photo: "/equipo/2.jpg", bio: "Mejor amigo" },
    { name: "Concha", role: "Madre de Dante", photo: "/equipo/3.jpg", bio: "Figura maternal" },
    { name: "Alejandra Quijano", role: "Chica", photo: "/equipo/4.jpg", bio: "Interés romántico" },
  ];

  return (
    <Section title="Reparto Principal" id="reparto">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
        {cast.map((member, index) => (
          <motion.div 
            key={member.name}
            className="group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="relative overflow-hidden rounded-2xl glass-dark">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1" style={fonts.subtitle}>
                  {member.name}
                </h3>
                <p className="text-red-400 font-medium mb-1 text-sm sm:text-base" style={fonts.body}>{member.role}</p>
                <p className="text-gray-400 text-xs sm:text-sm" style={fonts.body}>{member.bio}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

// Interviews Section
const Entrevistas = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedStart, setSelectedStart] = useState(null);
  
  const interviews = [
    {
      title: "Marcos Ares",
      subtitle: "Director - Entrevista con Telemiño",
      videoId: "FTeoz0ODOQM",
      thumbnail: "/galeria/CRUEL_3.png",
      duration: "12:45",
      startSeconds: 0
    },
    {
      title: "CINEPHILIA 09.04.25",
      subtitle: "Entrevista – empieza en 4:08",
      videoId: "PdjT5Hjs0gU",
      thumbnail: "/galeria/CRUEL_6.png",
      duration: "",
      startSeconds: 248
    }
  ];

  return (
    <Section title="Entrevistas" id="entrevistas" dark>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {interviews.map((item, index) => (
          <motion.div 
            key={index}
            className="group relative cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            onClick={() => { setSelectedVideo(item.videoId); setSelectedStart(item.startSeconds || 0); }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden glass-dark">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-red-600 rounded-full blur-xl opacity-70"></div>
                  <div className="relative h-14 w-14 rounded-full bg-red-600 flex items-center justify-center">
                    <Play size={22} className="text-white ml-1" fill="white" />
                  </div>
                </motion.div>
              </div>
              
              {/* Duration Badge */}
              {item.duration ? (
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-medium">{item.duration}</span>
                </div>
              ) : null}
              
              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-bold text-white mb-1" style={fonts.subtitle}>
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm" style={fonts.body}>{item.subtitle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setSelectedVideo(null); setSelectedStart(null); }}
          >
            <motion.div
              className="relative w-full max-w-6xl aspect-video"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute -top-14 right-0 text-white hover:text-red-500 transition-colors flex items-center space-x-2"
                onClick={() => { setSelectedVideo(null); setSelectedStart(null); }}
              >
                <span style={fonts.body}>Cerrar</span>
                <X size={24} />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1${selectedStart ? `&start=${selectedStart}` : ''}`}
                title="Entrevista CRUEL"
                frameBorder="0"
                className="w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

// Press Section
const Prensa = () => {
  const pressItems = [
    {
      title: "Telexornal Galicia 10-09-2025 (RTVE)",
      subtitle: "La noticia empieza en el 18:55",
      url: "https://www.rtve.es/play/videos/telexornal-galicia/telexornal-galicia-10-09-2025/16724193/",
      thumbnail: "/galeria/CRUEL_7.png"
    },
    {
      title: "El CHUO forma a sus profesionales en la prevención del suicidio",
      subtitle: "La Voz de Galicia",
      url: "https://www.lavozdegalicia.es/amp/noticia/ourense/2025/09/09/chuo-forma-profesionales-prevencion-suicidio/00031754741190268731625.htm",
      thumbnail: "/galeria/poster.png"
    }
  ];

  return (
    <Section title="Prensa" id="prensa" dark>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pressItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden glass-dark">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-lg font-bold text-white mb-1" style={fonts.subtitle}>{item.title}</h3>
                <p className="text-gray-300 text-sm" style={fonts.body}>{item.subtitle}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
};

// Premium Contact Section
const Contact = () => {
  return (
    <Section title="Contacto" id="contacto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-dark rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-12"
        >
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed px-2 sm:px-0" style={fonts.body}>
              Cortometraje de ficción que aborda la depresión y el suicidio con sensibilidad y respeto.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-4 px-2 sm:px-0" style={fonts.body}>
              Producido por estudiantes del 2º Grado Superior de Producción de Audiovisuales y Espectáculos
            </p>
          </div>
          
          {/* Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
                <Mail className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2" style={fonts.subtitle}>Email</h3>
              <a href="mailto:dionysiacusproductions@gmail.com" className="text-gray-400 hover:text-red-400 transition-colors text-sm sm:text-base break-all px-2 sm:px-0" style={fonts.body}>
                dionysiacusproductions@gmail.com
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600/20 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2" style={fonts.subtitle}>Ubicación</h3>
              <p className="text-gray-400 text-sm sm:text-base" style={fonts.body}>Ourense, Galicia, España</p>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a 
              href="https://www.instagram.com/cruel_film/" 
              className="group relative p-3 rounded-full glass hover:bg-red-600/20 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors" />
            </a>
            <a 
              href="https://www.youtube.com/@DionysiacusProductions" 
              className="group relative p-3 rounded-full glass hover:bg-red-600/20 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors" />
            </a>
          </div>
        </motion.div>
        
        {/* Institution Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <img
            src="/galeria/farixa.png"
            alt="CIFP A Farixa"
            className="mx-auto w-60 sm:w-72 md:w-96 opacity-70 hover:opacity-100 transition-opacity duration-300"
          />
        </motion.div>
      </div>
    </Section>
  );
};

// Ultra-Premium Footer with Advanced Design
const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };
  
  const footerLinks = [
    { title: 'Navegación', items: ['Inicio', 'Tráiler', 'Galería', 'Producción', 'Reparto', 'Entrevistas', 'Prensa'] },
    { title: 'Información', items: ['Sobre Nosotros', 'Prensa', 'Contacto'] },
    { title: 'Legal', items: ['Términos', 'Privacidad', 'Cookies', 'Copyright'] }
  ];
  
  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-950 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-red-900/20">
          <div className="container mx-auto px-4 md:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient-animated" style={fonts.title}>
                Mantente Conectado
              </h3>
              <p className="text-gray-400 mb-6" style={fonts.body}>
                Recibe las últimas noticias sobre CRUEL y futuros proyectos
              </p>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full px-5 py-3 bg-white/5 border border-red-900/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                    style={fonts.body}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-red-600/30 transition-all"
                  style={fonts.body}
                >
                  {subscribed ? '¡Suscrito!' : 'Suscribirse'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
        
        {/* Main Footer Grid */}
        <div className="container mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <img 
                    src="/galeria/CRUEL_3.png"
                    alt="CRUEL"
                    className="h-12 md:h-14 w-auto"
                  />
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed" style={fonts.body}>
                  Una producción cinematográfica de Dionysiacus Productions. 
                  Explorando las profundidades del drama humano con respeto y autenticidad.
                </p>
                
                {/* Social Icons */}
                <div className="flex space-x-3">
                  {[
                    { icon: Instagram, href: 'https://www.instagram.com/cruel_film/', label: 'Instagram' },
                    { icon: Youtube, href: 'https://www.youtube.com/@DionysiacusProductions', label: 'YouTube' },
                    { icon: Mail, href: 'mailto:dionysiacusproductions@gmail.com', label: 'Email' },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-10 h-10 rounded-full bg-white/5 border border-red-900/30 flex items-center justify-center hover:bg-red-600/20 hover:border-red-500/50 transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon size={18} className="text-gray-400 group-hover:text-red-400 transition-colors" />
                      <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/90 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Links Columns */}
            {footerLinks.map((column, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4" style={fonts.subtitle}>
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => {
                          const id = item.toLowerCase().replace(' ', '');
                          const element = document.getElementById(id);
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center space-x-2 group"
                        style={fonts.body}
                      >
                        <span className="w-0 h-px bg-red-500 group-hover:w-4 transition-all duration-300"></span>
                        <span>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-red-900/20">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gray-500 text-sm text-center md:text-left"
                style={fonts.body}
              >
                © 2025 CRUEL FILM. Todos los derechos reservados. Hecho con pasión en Galicia.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <img
                  src="/galeria/diow.png"
                  alt="Dionysiacus Productions"
                  className="h-8 opacity-50 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
            transition={{ type: "spring", bounce: 0.4 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-2xl group-hover:shadow-red-600/50 transition-all">
                <ArrowUp size={24} className="text-white" />
              </div>
            </div>
            
            {/* Tooltip */}
            <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/90 text-xs text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Volver arriba
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

// Main App Component
const App = () => {
  useEffect(() => {
    // Add smooth scroll behavior to the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden noise">
      <Header />
      <Hero />
      <main>
        <Trailer />
        <Gallery />
        <Production />
        <Reparto />
        <Entrevistas />
        <Prensa />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;