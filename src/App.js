import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Pill,
  HelpCircle,
  BellRing,
  Users,
  Heart,
  Activity,
  Brain,
  ArrowRight,
  Check
} from 'lucide-react';


// ------------------ Navbar ------------------
const Navbar = ({ isScrolled, toggleMenu, isMenuOpen }) => {
  // Definimos los enlaces con sus anclas correspondientes.
  const navLinks = [
    { href: "#problema", label: "El Problema" },
    { href: "#solucion", label: "Nuestra Solución" },
    { href: "#funcionalidades", label: "Funcionalidades Avanzadas" },
    { href: "#ia", label: "Inteligencia Artificial Avanzada" },
    { href: "#impacto", label: "Impacto Social" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
      <a href="#hero" className="inline-flex items-center mr-8 group">
          <div className="mr-2 text-blue-400 transition-all duration-300 group-hover:scale-110">
              <Pill size={28} strokeWidth={2.5} aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold tracking-wide text-blue-400 group-hover:text-blue-300 transition-colors">
                oPills
            </span>
      </a>
        <ul className="hidden lg:flex space-x-6">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-medium tracking-wide py-2 px-1 relative hover:text-blue-400 transition-colors after:absolute after:bottom-0 after:left-0 after:bg-blue-500 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Menú móvil */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Abrir Menú"
            title="Abrir Menú"
            className="p-2 -mr-1 rounded-full bg-gray-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-5" aria-hidden="true" /> : <Menu className="w-5" aria-hidden="true" />}
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full z-10">
              <div className="p-5 bg-gray-900/95 backdrop-blur-md border border-gray-800 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <a href="/" className="inline-flex items-center group">
                    <div className="mr-2 text-blue-400 group-hover:scale-110 transition-all duration-300">
                      <Pill size={24} strokeWidth={2.5} aria-hidden="true" />
                    </div>
                    <span className="text-2xl font-bold tracking-wide text-blue-400 group-hover:text-blue-300 transition-colors">
                      oPills
                    </span>
                  </a>
                  <button
                    onClick={toggleMenu}
                    aria-label="Cerrar Menú"
                    title="Cerrar Menú"
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <X className="w-5" aria-hidden="true" />
                  </button>
                </div>
                <nav>
                  <ul className="space-y-4">
                    {navLinks.map(link => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="block py-2 font-medium tracking-wide hover:text-blue-400 transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                    <li>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
// ------------------ Sección: Hero ------------------
const Hero = () => {
  return (
    <section 
    id="hero"  // Se establece el id para que el enlace lo encuentre
    className="relative w-full h-screen flex items-center justify-center bg-blue-800 text-white py-16 px-4"
    >
    <section className="relative w-full h-screen flex items-center justify-center bg-blue-800 text-white py-16 px-4">
      {/* Contenedor central */}
      <div className="text-center">
        {/* Logo centrado */}
        <img
          src="/galeria/logosin.png"  // Asegúrate de que el logo esté en public/imagenes/
          alt="Logo oPills"
          className="mx-auto w-80 md:w-[28rem] mb-6"
        />

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Bienvenido a oPills
        </h1>

        {/* Subtítulo */}
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Gestiona tu medicación de forma inteligente, eficiente y segura. ¡Descubre cómo mejorar tu calidad de vida hoy!
        </p>

        {/* Botones de llamada a la acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#solucion"
            className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-100 transition"
          >
            Descubre la Solución
          </a>
          <a
            href="#funcionalidades"
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition"
          >
            Ver Funcionalidades
          </a>
        </div>
      </div>
    </section>
  </section>
  );
};




// ------------------ Sección: El Problema ------------------
const ProblemSection = () => (
  <section id="problema" className="px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-8">
        <div className="inline-block p-2 bg-blue-600/20 rounded-lg mb-4">
          <HelpCircle size={30} className="text-blue-500" aria-hidden="true" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">El Problema</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto"></div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl">
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Una gran parte de la población consume medicación sin un seguimiento adecuado, lo que genera riesgos para la salud y provoca ineficiencias en el sistema sanitario.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/80 p-6 rounded-lg border-l-4 border-red-500 hover:scale-105 transform transition-all">
            <h3 className="text-xl font-semibold text-white mb-3">Seguimiento Deficiente</h3>
            <p className="text-gray-300">Control ineficaz en el seguimiento de dosis y tratamientos que puede derivar en complicaciones médicas.</p>
          </div>
          <div className="bg-gray-800/80 p-6 rounded-lg border-l-4 border-yellow-500 hover:scale-105 transform transition-all">
            <h3 className="text-xl font-semibold text-white mb-3">Saturación Sanitaria</h3>
            <p className="text-gray-300">El sistema se sobrecarga por el mal manejo de la medicación, generando ineficiencias y retrasos en la atención.</p>
          </div>
          <div className="bg-gray-800/80 p-6 rounded-lg border-l-4 border-orange-500 hover:scale-105 transform transition-all">
            <h3 className="text-xl font-semibold text-white mb-3">Dificultad de Acceso</h3>
            <p className="text-gray-300">Personas con discapacidad o poca experiencia tecnológica enfrentan barreras para llevar un control preciso de su medicación.</p>
          </div>
          <div className="bg-gray-800/80 p-6 rounded-lg border-l-4 border-blue-500 hover:scale-105 transform transition-all">
            <h3 className="text-xl font-semibold text-white mb-3">Falta de Integración</h3>
            <p className="text-gray-300">Las soluciones actuales no se adaptan adecuadamente a las necesidades reales de los usuarios.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ------------------ Sección: La Solución: oPills ------------------
const SolutionSection = () => (
  <section id="solucion" className="px-4 py-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 relative">
    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-blue-900/20 to-gray-900/20 -z-10"></div>
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-12">
        <div className="inline-block p-2 bg-blue-600/20 rounded-lg mb-4">
          <Pill size={30} className="text-blue-500" aria-hidden="true" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">La Solución: oPills</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto"></div>
      </div>
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl">
        <p className="text-xl text-gray-200 mb-8 leading-relaxed italic">
          "oPills revoluciona la forma en que gestionas tu medicación, combinando tecnología de vanguardia con una interfaz intuitiva y accesible para todos."
        </p>
        {/* Aquí puedes incluir un mockup o demo de la app, por ejemplo */}
        <div className="flex justify-center">
          <div className="bg-gray-800 border-4 border-gray-700 rounded-3xl w-64 h-96 overflow-hidden shadow-2xl relative">
            <div className="bg-gray-900 w-32 h-6 absolute top-0 left-1/2 transform -translate-x-1/2 rounded-b-xl"></div>
            <div className="bg-blue-900/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-400 font-bold">oPills</span>
                <BellRing size={18} className="text-blue-400" aria-hidden="true" />
              </div>
              <div className="mt-4 text-sm text-white font-bold">Hola, María</div>
              <div className="text-xs text-gray-300">Tus medicamentos para hoy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ------------------ Sección: Funcionalidades Avanzadas ------------------
const AdvancedFeaturesSection = () => {
  // Definimos las funcionalidades a mostrar en un array para iterar
  const features = [
    {
      title: "Recordatorios Personalizados",
      description: "Alertas configurables que se adaptan a tus horarios y preferencias para que nunca olvides una dosis.",
      icon: <BellRing size={24} className="text-white" aria-hidden="true" />,
      borderColor: "border-blue-500",
    },
    {
      title: "Escaneo de Medicamentos",
      description: "Usa la cámara para identificar y agregar medicamentos de forma rápida y sin complicaciones.",
      icon: <Activity size={24} className="text-white" aria-hidden="true" />,
      borderColor: "border-blue-500",
    },
    {
      title: "Seguimiento Compartido",
      description: "Comparte la información de tu tratamiento con cuidadores o profesionales, manteniendo siempre el control.",
      icon: <Users size={24} className="text-white" aria-hidden="true" />,
      borderColor: "border-blue-500",
    },
    {
      title: "Análisis de Tendencias",
      description: "Visualiza informes detallados y gráficos interactivos sobre la adherencia y evolución de tu tratamiento.",
      icon: <Check size={24} className="text-white" aria-hidden="true" />,
      borderColor: "border-blue-500",
    },
  ];

  return (
    <section id="funcionalidades" className="px-4 py-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 relative">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-block p-2 bg-blue-600/20 rounded-lg mb-4">
            <Activity size={30} className="text-blue-500" aria-hidden="true" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Funcionalidades Avanzadas</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto"></div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className={`bg-gray-800/70 p-6 rounded-xl border-l-4 ${item.borderColor} hover:scale-105 transform transition-all`}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-full">
                  {item.icon}
                </div>
              </div>
              <h4 className="font-bold text-blue-400 mb-2 text-center">{item.title}</h4>
              <p className="text-gray-300 text-sm text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ------------------ Sección: Inteligencia Artificial Avanzada ------------------
const AdvancedAISection = () => (
  <section id="ia" className="px-4 py-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-12">
        <div className="inline-block p-2 bg-blue-600/20 rounded-lg mb-4">
          <Brain size={30} className="text-blue-500" aria-hidden="true" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Inteligencia Artificial Avanzada</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto"></div>
      </div>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl">
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          oPills integra tecnologías de IA de última generación para facilitar el reconocimiento por voz, el procesamiento de lenguaje natural y la visión por computador. Esto te permite interactuar de manera natural, recibir respuestas precisas y disfrutar de una experiencia totalmente personalizada, manteniendo siempre la seguridad y privacidad de tus datos.
        </p>
        {/* Aquí podrías agregar gráficos o pequeños íconos explicativos */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <HelpCircle size={24} className="text-blue-400" aria-hidden="true" />
            <span className="text-blue-400 font-semibold mt-2">NLP</span>
            <p className="text-gray-300 text-sm text-center">Comprende tu lenguaje natural</p>
          </div>
          <div className="flex flex-col items-center">
            <BellRing size={24} className="text-blue-400" aria-hidden="true" />
            <span className="text-blue-400 font-semibold mt-2">Voz</span>
            <p className="text-gray-300 text-sm text-center">Control manos libres</p>
          </div>
          <div className="flex flex-col items-center">
            <Brain size={24} className="text-blue-400" aria-hidden="true" />
            <span className="text-blue-400 font-semibold mt-2">Visión</span>
            <p className="text-gray-300 text-sm text-center">Reconoce imágenes en tiempo real</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ------------------ Sección: Impacto Social ------------------
const ImpactSection = () => (
  <section id="impacto" className="px-4 py-24 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 relative">
    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-blue-900/20 to-gray-900/20 -z-10"></div>
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-12">
        <div className="inline-block p-2 bg-blue-600/20 rounded-lg mb-4">
          <Heart size={30} className="text-blue-500" aria-hidden="true" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Impacto Social</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto"></div>
      </div>
      <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl">
        <p className="text-lg text-gray-300 mb-8 leading-relaxed text-center">
          oPills transforma la gestión de la medicación, promoviendo una atención más eficiente, inclusiva y responsable. Esto se traduce en un mayor control de los tratamientos, reducción de errores y una mejora sustancial en la calidad de vida de los usuarios.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-blue-400 mb-2">85%</div>
            <p className="text-sm text-gray-300">Mejora en adherencia</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-blue-400 mb-2">62%</div>
            <p className="text-sm text-gray-300">Menos errores</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-blue-400 mb-2">40%</div>
            <p className="text-sm text-gray-300">Reducción de complicaciones</p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl font-bold text-blue-400 mb-2">93%</div>
            <p className="text-sm text-gray-300">Satisfacción de usuarios</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ------------------ Footer ------------------
const Footer = () => (
  <footer className="px-4 pt-16 pb-8 bg-gray-900/80 border-t border-gray-800">
    <div className="max-w-7xl mx-auto">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <a href="/" className="inline-flex items-center group mb-6">
            <div className="mr-2 text-blue-400 transition-all duration-300 group-hover:scale-110">
              <Pill size={28} strokeWidth={2.5} aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold tracking-wide text-blue-400 group-hover:text-blue-300 transition-colors">
              oPills
            </span>
          </a>
          <p className="text-gray-400 mb-6">
            Toda tu medicación en la palma de tu mano. Una solución innovadora y accesible para gestionar tu salud con tecnología de vanguardia.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-300">Contacto</p>
          <div className="flex items-start">
            <span className="mr-1 text-gray-400">Teléfono:</span>
            <a href="tel:+34123456789" className="text-blue-400 hover:text-blue-300 transition-colors">
              +34 123 456 789
            </a>
          </div>
          <div className="flex items-start">
            <span className="mr-1 text-gray-400">Email:</span>
            <a href="mailto:info@opills.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              info@opills.com
            </a>
          </div>
          <div className="flex items-start">
            <span className="mr-1 text-gray-400">Dirección:</span>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              Calle de la Salud 123, Madrid
            </a>
          </div>
        </div>
        <div>
          <p className="text-base font-bold tracking-wide text-gray-300">Enlaces</p>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#problema" className="text-blue-400 hover:text-blue-300 transition-colors">El Problema</a>
            </li>
            <li>
              <a href="#solucion" className="text-blue-400 hover:text-blue-300 transition-colors">La Solución: oPills</a>
            </li>
            <li>
              <a href="#funcionalidades" className="text-blue-400 hover:text-blue-300 transition-colors">Funcionalidades Avanzadas</a>
            </li>
            <li>
              <a href="#ia" className="text-blue-400 hover:text-blue-300 transition-colors">Inteligencia Artificial Avanzada</a>
            </li>
            <li>
              <a href="#impacto" className="text-blue-400 hover:text-blue-300 transition-colors">Impacto Social</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-5 border-t border-gray-800">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} oPills. Todos los derechos reservados.
        </p>
        <div className="flex mt-4 md:mt-0 space-x-6">
          <a href="/privacy" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
            Política de Privacidad
          </a>
          <a href="/terms" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
            Términos de Servicio
          </a>
          <a href="/cookies" className="text-sm text-gray-500 hover:text-blue-400 transition-colors">
            Política de Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// ------------------ Componente Principal ------------------
const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar isScrolled={isScrolled} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <AdvancedFeaturesSection />
        <AdvancedAISection />
        <ImpactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
