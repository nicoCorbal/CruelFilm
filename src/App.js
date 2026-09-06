import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

/* ────────────────────────────────────────────────────────────
   DATOS
   ──────────────────────────────────────────────────────────── */

const NAV = [
  { id: "sinopsis", label: "Sinopsis" },
  { id: "trailer", label: "Tráiler" },
  { id: "fotogramas", label: "Fotogramas" },
  { id: "reparto", label: "Reparto" },
  { id: "equipo", label: "Equipo" },
  { id: "prensa", label: "Prensa" },
  { id: "contacto", label: "Contacto" },
];

const SPECS = [
  ["Título", "Cruel"],
  ["Dirección", "Marcos Ares"],
  ["Idea original", "Pablo Oliveira"],
  ["Dirección de fotografía", "Luis Outeiriño"],
  ["Dirección de arte", "Óscar G. Calviño"],
  ["Producción", "Dionysiacus Productions · CIFP A Farixa"],
  ["Duración", "17 min 15 s"],
  ["Género", "Drama"],
  ["Estreno", "28 de marzo de 2025"],
  ["Rodaje", "Ourense, Galicia"],
];

const CAST = [
  { name: "Martín Álvarez", role: "Dante", photo: "/equipo/1.jpg" },
  { name: "Antonio Praza", role: "Nacho", photo: "/equipo/2.jpg" },
  { name: "Concha", role: "Madre de Dante", photo: "/equipo/3.jpg" },
  { name: "Alejandra Quijano", role: "Chica", photo: "/equipo/4.jpg" },
];

const CREW = [
  { role: "Dirección", name: "Marcos Ares", photo: "/equipo/MARCOS ARES.jpeg" },
  { role: "Dirección de fotografía", name: "Luis Outeiriño", photo: "/equipo/LUIS OUTEIRIÑO.jpeg" },
  { role: "Producción ejecutiva", name: "Pablo Oliveira", photo: "/equipo/PABLO OLIVEIRA.jpeg" },
  { role: "Dirección de arte", name: "Óscar G. Calviño", photo: "/equipo/ÓSCAR G.CALVIÑO.jpeg" },
  { role: "Dirección de producción", name: "Sara López", photo: "/equipo/SARA LÓPEZ.jpeg" },
  { role: "Jefatura de producción", name: "Alejandro C. Oliveira", photo: "/equipo/ALEJANDRO CALVO.jpeg" },
  { role: "Ayudante de cámara", name: "Roi Torres", photo: "/equipo/ROI TORRES.jpeg" },
  { role: "Script", name: "Candela Lorenzo", photo: "/equipo/CANDELA LORENZO.jpeg" },
  { role: "Sonido", name: "Noé Cárcamo", photo: "/equipo/noe.jpg" },
  { role: "Making of", name: "Hugo Fernández", photo: "/equipo/HUGO FERNÁNDEZ.jpeg" },
  { role: "Auxiliar de producción", name: "Fernando A. Mourinho", photo: "/equipo/FERNANDO ANDRÉS MOURIÑO.jpeg" },
  { role: "Auxiliar de producción", name: "Xulia Ferradás", photo: "/equipo/xulia.jpg" },
  { role: "Auxiliar de producción", name: "Manuel Debén", photo: "/equipo/MANUEL DEBÉN.jpeg" },
  { role: "Auxiliar de producción", name: "José M. Villanueva", photo: "/equipo/JOSÉ MIGUEL VILLANUEVA.jpeg" },
  { role: "Auxiliar de producción", name: "Ariel J. Egas", photo: "/equipo/ARIEL JOSHUÁ.jpeg" },
];

const STILLS = Array.from({ length: 24 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { full: `/stills/${n}.jpg`, thumb: `/stills/${n}-sm.jpg`, n };
});

const PRESS = [
  {
    src: "RTVE · Telexornal Galicia",
    title: "Cruel, en el Telexornal Galicia",
    note: "10 de septiembre de 2025 · La pieza empieza en el minuto 18:55",
    kind: "Ver noticia",
    href: "https://www.rtve.es/play/videos/telexornal-galicia/telexornal-galicia-10-09-2025/16724193/",
  },
  {
    src: "La Voz de Galicia",
    title: "El CHUO forma a sus profesionales en la prevención del suicidio",
    note: "9 de septiembre de 2025",
    kind: "Leer artículo",
    href: "https://www.lavozdegalicia.es/amp/noticia/ourense/2025/09/09/chuo-forma-profesionales-prevencion-suicidio/00031754741190268731625.htm",
  },
  {
    src: "Telemiño",
    title: "Entrevista a Marcos Ares, director",
    note: "Conversación sobre el rodaje y la intención del cortometraje",
    kind: "Ver entrevista",
    video: "FTeoz0ODOQM",
  },
  {
    src: "Cinephilia",
    title: "Cruel en Cinephilia",
    note: "9 de abril de 2025 · La entrevista empieza en el minuto 4:08",
    kind: "Ver entrevista",
    video: "PdjT5Hjs0gU",
    start: 248,
  },
];

const TRAILER_ID = "TZK2u1Bpsfk";
const MAKING_OF_ID = "4ZDg-uD68lg";

const EASE = [0.16, 1, 0.3, 1];

/* ────────────────────────────────────────────────────────────
   UTILIDADES
   ──────────────────────────────────────────────────────────── */

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const useLockBody = (locked) => {
  useEffect(() => {
    document.body.classList.toggle("no-scroll", locked);
    return () => document.body.classList.remove("no-scroll");
  }, [locked]);
};

const useKey = (key, handler, active = true) => {
  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => { if (e.key === key) handler(e); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, handler, active]);
};

/** Aparece suavemente al entrar en el viewport */
const Reveal = ({ children, delay = 0, y = 26, className, style, as = "div" }) => {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
};

const Arrow = ({ size = 12 }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlayIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M5 3.5v13l11-6.5-11-6.5z" />
  </svg>
);

const SectionHead = ({ num, title, aside }) => (
  <div className="section-head">
    <Reveal className="eyebrow" as="p"><span className="num">{num}</span>{title}</Reveal>
    <Reveal className="display display-lg" as="h2" delay={0.05}>{title}</Reveal>
    {aside && <Reveal className="aside" as="p" delay={0.1}>{aside}</Reveal>}
  </div>
);

/* ────────────────────────────────────────────────────────────
   INTRO
   ──────────────────────────────────────────────────────────── */

const Intro = ({ onDone }) => {
  useLockBody(true);
  useEffect(() => {
    const t = setTimeout(onDone, 2100);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div className="intro" exit={{ opacity: 0, transition: { duration: 0.8, ease: EASE } }}>
      <motion.p className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}>
        Dionysiacus Productions presenta
      </motion.p>
      <motion.div className="line" initial={{ width: 0 }} animate={{ width: "min(60vw, 420px)" }} transition={{ duration: 1.3, ease: EASE, delay: 0.5 }} />
      <motion.p className="serif" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}>
        <em>Cruel</em>
      </motion.p>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────
   CABECERA
   ──────────────────────────────────────────────────────────── */

const Nav = ({ onTrailer }) => {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 120 && !open);
      lastY.current = y;

      let current = "";
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useLockBody(open);
  useKey("Escape", () => setOpen(false), open);

  const go = (id) => { setOpen(false); setTimeout(() => scrollTo(id), open ? 250 : 0); };

  return (
    <>
      <motion.header
        className={`nav ${hidden ? "hidden" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Ir al inicio">CRUEL</button>
        <nav aria-label="Secciones">
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <button className={active === n.id ? "active" : ""} onClick={() => go(n.id)}>{n.label}</button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="right">
          <button className="link" onClick={onTrailer}>Ver tráiler <Arrow /></button>
          <button className="menu-btn" onClick={() => setOpen(true)}>Menú</button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button className="close" onClick={() => setOpen(false)}>Cerrar</button>
            <ul>
              {NAV.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.05 }}>
                  <button onClick={() => go(n.id)}><span className="num">{String(i + 1).padStart(2, "0")}</span>{n.label}</button>
                </motion.li>
              ))}
            </ul>
            <div className="foot">
              <span>Dionysiacus Productions</span>
              <span>Ourense, 2025</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ────────────────────────────────────────────────────────────
   HERO
   ──────────────────────────────────────────────────────────── */

const Hero = ({ ready }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const show = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.3, ease: EASE, delay },
  });

  return (
    <section className="hero" id="inicio" ref={ref}>
      <motion.div className="bg" style={{ scale, y }}>
        <img src="/stills/08.jpg" alt="Dante, con las manos sobre la cara, en la penumbra de su habitación" fetchPriority="high" />
      </motion.div>
      <div className="veil" />

      <motion.div className="presents" {...show(0.2)}>
        <img src="/stills/logo-dp.png" alt="" />
        <p className="eyebrow">Dionysiacus Productions presenta</p>
      </motion.div>

      <motion.div className="content" style={{ opacity: fade }}>
        <motion.h1 className="title" {...show(0.4)}>
          <img src="/galeria/CRUEL_3.png" alt="CRUEL" />
        </motion.h1>
        <motion.div className="meta" {...show(0.65)}>
          <p className="serif">La historia de <em>un suicidio</em></p>
          <p className="eyebrow">Un cortometraje de Marcos Ares · 17 min · 2025</p>
        </motion.div>
      </motion.div>

      <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.6, duration: 1 }}>
        <span /> Desplázate
      </motion.div>
    </section>
  );
};

/* ────────────────────────────────────────────────────────────
   MARQUESINA
   ──────────────────────────────────────────────────────────── */

const Ticker = () => {
  const items = ["La historia de un suicidio", "Estreno 28 · 03 · 2025", "17 minutos", "Drama", "Ourense, Galicia", "Dionysiacus Productions", "CIFP A Farixa"];
  const list = [...items, ...items];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="track">
        {list.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   SINOPSIS
   ──────────────────────────────────────────────────────────── */

const Synopsis = () => (
  <section className="section wrap synopsis" id="sinopsis">
    <SectionHead num="01" title="Sinopsis" aside="Ficción · 2025" />
    <div className="grid-2">
      <div className="col-left">
        <Reveal className="poster">
          <img src="/stills/poster.jpg" alt="Cartel de Cruel" loading="lazy" />
        </Reveal>
      </div>
      <div>
        <Reveal className="serif pull" as="p">
          Un joven sin esperanza marca en su calendario <em>el día de su muerte.</em>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lede">
            Cruel es un cortometraje de ficción que aborda la depresión y el suicidio con sensibilidad y respeto.
            Sigue a Dante durante los días que él mismo ha decidido que serán los últimos, y a las personas que,
            sin saberlo, orbitan a su alrededor.
          </p>
          <p className="lede">
            Producido por el alumnado del segundo curso del Grado Superior de Producción de Audiovisuales y
            Espectáculos del CIFP A Farixa, en Ourense.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <dl className="specs">
            {SPECS.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ────────────────────────────────────────────────────────────
   VÍDEO
   ──────────────────────────────────────────────────────────── */

const VideoBlock = ({ still, alt, label, cornerLeft, cornerRight, videoId, start = 0, playing, onPlay }) => (
  <div className="video-block" role={playing ? undefined : "button"} tabIndex={playing ? -1 : 0} onClick={playing ? undefined : onPlay} onKeyDown={(e) => { if (!playing && (e.key === "Enter" || e.key === " ")) onPlay(); }}>
    {playing ? (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1${start ? `&start=${start}` : ""}`}
        title={label}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    ) : (
      <>
        <img src={still} alt={alt} loading="lazy" />
        <div className="veil" />
        <div className="play">
          <div className="ring"><PlayIcon /></div>
          <span className="label">{label}</span>
        </div>
        <div className="corner"><span>{cornerLeft}</span><span>{cornerRight}</span></div>
      </>
    )}
  </div>
);

const Trailer = ({ playing, onPlay }) => (
  <section className="section wrap" id="trailer">
    <SectionHead num="02" title="Tráiler" aside="Tráiler oficial · 2025" />
    <Reveal>
      <VideoBlock
        still="/stills/12.jpg"
        alt="Dante sonríe sentado en una butaca roja de cine"
        label="Reproducir tráiler"
        cornerLeft="Cruel · Tráiler oficial"
        cornerRight="YouTube"
        videoId={TRAILER_ID}
        playing={playing}
        onPlay={onPlay}
      />
    </Reveal>
  </section>
);

const VideoModal = ({ video, onClose }) => {
  useLockBody(Boolean(video));
  useKey("Escape", onClose, Boolean(video));
  return (
    <AnimatePresence>
      {video && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={onClose}>
          <motion.div className="frame" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: 0.6, ease: EASE }} onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={onClose}>Cerrar ✕</button>
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0${video.start ? `&start=${video.start}` : ""}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ────────────────────────────────────────────────────────────
   FOTOGRAMAS
   ──────────────────────────────────────────────────────────── */

const Lightbox = ({ index, onClose, onStep }) => {
  useLockBody(index !== null);
  useKey("Escape", onClose, index !== null);
  useKey("ArrowRight", () => onStep(1), index !== null);
  useKey("ArrowLeft", () => onStep(-1), index !== null);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <div className="top">
            <span>Fotograma {STILLS[index].n} / {STILLS.length}</span>
            <button className="link" onClick={onClose}>Cerrar ✕</button>
          </div>
          <div className="stage">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={STILLS[index].full}
                alt={`Fotograma ${STILLS[index].n} de Cruel`}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </AnimatePresence>
            <button className="hit prev" onClick={() => onStep(-1)} aria-label="Anterior" />
            <button className="hit next" onClick={() => onStep(1)} aria-label="Siguiente" />
          </div>
          <div className="bottom">
            <button className="link" onClick={() => onStep(-1)}>← Anterior</button>
            <span className="faint">Usa las flechas del teclado</span>
            <button className="link" onClick={() => onStep(1)}>Siguiente →</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Stills = () => {
  const strip = useRef(null);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(null);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });

  const step = () => {
    const el = strip.current;
    const fig = el?.querySelector("figure");
    if (!el || !fig) return 0;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    return fig.getBoundingClientRect().width + gap;
  };

  const onScroll = () => {
    const s = step();
    if (!s) return;
    setCurrent(Math.min(STILLS.length - 1, Math.max(0, Math.round(strip.current.scrollLeft / s))));
  };

  const goTo = (i) => {
    const el = strip.current;
    if (!el) return;
    const idx = Math.min(STILLS.length - 1, Math.max(0, i));
    el.scrollTo({ left: idx * step(), behavior: "smooth" });
  };

  const onDown = (e) => {
    const el = strip.current;
    drag.current = { on: true, x: e.clientX, left: el.scrollLeft, moved: false };
    el.classList.add("dragging");
  };
  const onMove = (e) => {
    if (!drag.current.on) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    strip.current.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    strip.current.classList.remove("dragging");
    goTo(Math.round(strip.current.scrollLeft / step()));
  };

  const openAt = (i) => { if (!drag.current.moved) setOpen(i); };
  const stepLightbox = useCallback((d) => setOpen((i) => (i + d + STILLS.length) % STILLS.length), []);

  return (
    <section className="section wrap stills" id="fotogramas">
      <SectionHead num="03" title="Fotogramas" aside={`${STILLS.length} imágenes · Arrastra para explorar`} />
      <Reveal>
        <div
          className="strip"
          ref={strip}
          onScroll={onScroll}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
        >
          {STILLS.map((s, i) => (
            <figure key={s.n} onClick={() => openAt(i)}>
              <div className="img">
                <img src={s.thumb} alt={`Fotograma ${s.n} de Cruel`} loading="lazy" draggable="false" />
              </div>
              <figcaption><span>Fotograma {s.n}</span><span>Ampliar</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="controls">
          <span className="count">{String(current + 1).padStart(2, "0")} — {STILLS.length}</span>
          <div className="btns">
            <button className="link" onClick={() => goTo(current - 1)}>← Anterior</button>
            <button className="link" onClick={() => goTo(current + 1)}>Siguiente →</button>
          </div>
        </div>
      </Reveal>
      <Lightbox index={open} onClose={() => setOpen(null)} onStep={stepLightbox} />
    </section>
  );
};

/* ────────────────────────────────────────────────────────────
   REPARTO
   ──────────────────────────────────────────────────────────── */

const Cast = () => (
  <section className="section wrap cast" id="reparto">
    <SectionHead num="04" title="Reparto" aside="Intérpretes principales" />
    <div className="grid-4">
      {CAST.map((c, i) => (
        <Reveal className="card" key={c.name} delay={i * 0.08}>
          <div className="img"><img src={c.photo} alt={c.name} loading="lazy" /></div>
          <p className="name">{c.name}</p>
          <p className="role">como <em>{c.role}</em></p>
        </Reveal>
      ))}
    </div>
  </section>
);

/* ────────────────────────────────────────────────────────────
   EQUIPO
   ──────────────────────────────────────────────────────────── */

const Team = ({ onMakingOf }) => {
  const [hover, setHover] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <section className="section wrap" id="equipo" onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      <SectionHead num="05" title="Equipo" aside="CIFP A Farixa · Ourense" />
      <div className="team-intro">
        <Reveal className="serif" as="p" style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.6rem)", maxWidth: "20ch" }}>
          Quince personas, seis meses de trabajo y <em>tres jornadas de rodaje.</em>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="lede">
            Cruel se rodó en localizaciones reales de Ourense. Todo el equipo técnico está formado por alumnado del
            CIFP A Farixa, que asumió cada departamento de la producción, desde la dirección de fotografía hasta el sonido directo.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <ul className="credits" onMouseLeave={() => setHover(null)}>
          {CREW.map((m) => (
            <li key={m.name} onMouseEnter={() => setHover(m)}>
              <span className="role">{m.role}</span>
              <span className="name">{m.name}</span>
              <span className="avatar"><img src={m.photo} alt="" loading="lazy" /></span>
            </li>
          ))}
        </ul>
      </Reveal>

      <AnimatePresence>
        {hover && (
          <motion.div
            className="credits-preview"
            key={hover.name}
            style={{ left: pos.x > 340 ? pos.x - 260 : pos.x + 28, top: pos.y - 140 }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <img src={hover.photo} alt="" />
          </motion.div>
        )}
      </AnimatePresence>

      <Reveal className="bts">
        <VideoBlock
          still="/stills/01.jpg"
          alt="Un operador ajusta un foco durante el rodaje"
          label="Ver el making of"
          cornerLeft="Detrás de las cámaras"
          cornerRight="Making of"
          videoId={MAKING_OF_ID}
          playing={false}
          onPlay={onMakingOf}
        />
        <div className="caption">
          <span>Rodaje en Ourense · Making of realizado por Hugo Fernández</span>
          <span>2025</span>
        </div>
      </Reveal>
    </section>
  );
};

/* ────────────────────────────────────────────────────────────
   PRENSA
   ──────────────────────────────────────────────────────────── */

const Press = ({ onVideo }) => (
  <section className="section wrap" id="prensa">
    <SectionHead num="06" title="Prensa" aside="Entrevistas y cobertura" />
    <Reveal>
      <ul className="press">
        {PRESS.map((p) => {
          const inner = (
            <>
              <span className="src">{p.src}</span>
              <span className="ttl">{p.title}<small>{p.note}</small></span>
              <span className="kind">{p.kind} <Arrow /></span>
            </>
          );
          return (
            <li key={p.title}>
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer">{inner}</a>
              ) : (
                <button onClick={() => onVideo({ id: p.video, start: p.start, title: p.title })}>{inner}</button>
              )}
            </li>
          );
        })}
      </ul>
    </Reveal>
  </section>
);

/* ────────────────────────────────────────────────────────────
   PIE
   ──────────────────────────────────────────────────────────── */

const Footer = () => (
  <footer className="footer" id="contacto">
    <Reveal className="wordmark">
      <img src="/galeria/CRUEL_3.png" alt="CRUEL" loading="lazy" />
    </Reveal>
    <div className="cols">
      <div>
        <h4>Contacto</h4>
        <ul>
          <li><a href="mailto:dionysiacusproductions@gmail.com">dionysiacusproductions@gmail.com</a></li>
          <li><span className="muted">Ourense, Galicia</span></li>
        </ul>
        <div className="logos">
          <img src="/stills/logo-dp.png" alt="Dionysiacus Productions" loading="lazy" />
          <img className="farixa" src="/stills/logos-farixa.png" alt="Xunta de Galicia · CIFP A Farixa" loading="lazy" />
        </div>
      </div>
      <div>
        <h4>Redes</h4>
        <ul>
          <li><a href="https://www.instagram.com/cruel_film/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://www.youtube.com/@DionysiacusProductions" target="_blank" rel="noopener noreferrer">YouTube</a></li>
        </ul>
      </div>
      <div>
        <h4>Índice</h4>
        <ul>
          {NAV.filter((n) => n.id !== "contacto").map((n) => (
            <li key={n.id}><button onClick={() => scrollTo(n.id)}>{n.label}</button></li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Si necesitas ayuda</h4>
        <p className="help">
          Si estás pasando por un momento difícil, en España puedes llamar al <strong>024</strong>, la línea de atención a la conducta suicida, gratuita y disponible las 24 horas.
        </p>
      </div>
    </div>
    <div className="bottom">
      <span>© 2025 Dionysiacus Productions</span>
      <span>Cruel · Un cortometraje de Marcos Ares</span>
      <span>Hecho en Galicia</span>
    </div>
  </footer>
);

/* ────────────────────────────────────────────────────────────
   APP
   ──────────────────────────────────────────────────────────── */

const App = () => {
  const [intro, setIntro] = useState(() => !sessionStorage.getItem("cruel-intro"));
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [video, setVideo] = useState(null);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem("cruel-intro", "1");
    setIntro(false);
  }, []);

  const openTrailer = () => {
    scrollTo("trailer");
    setTrailerPlaying(true);
  };

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <AnimatePresence>{intro && <Intro onDone={finishIntro} />}</AnimatePresence>

      <Nav onTrailer={openTrailer} />
      <main>
        <Hero ready={!intro} />
        <Ticker />
        <Synopsis />
        <Trailer playing={trailerPlaying} onPlay={() => setTrailerPlaying(true)} />
        <Stills />
        <Cast />
        <Team onMakingOf={() => setVideo({ id: MAKING_OF_ID, title: "Making of de Cruel" })} />
        <Press onVideo={setVideo} />
      </main>
      <Footer />

      <VideoModal video={video} onClose={() => setVideo(null)} />
    </>
  );
};

export default App;
