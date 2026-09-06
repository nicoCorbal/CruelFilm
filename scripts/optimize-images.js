// Genera versiones web (JPG comprimido) de los fotogramas de /public/galeria
// Uso: node scripts/optimize-images.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "galeria");
const OUT = path.join(__dirname, "..", "public", "stills");
fs.mkdirSync(OUT, { recursive: true });

const jobs = [];
for (let i = 1; i <= 24; i++) {
  jobs.push({ from: `${i}.png`, to: `${String(i).padStart(2, "0")}.jpg`, width: 1920, quality: 82 });
  jobs.push({ from: `${i}.png`, to: `${String(i).padStart(2, "0")}-sm.jpg`, width: 960, quality: 78 });
}
jobs.push({ from: "poster.png", to: "poster.jpg", width: 1080, quality: 85 });

(async () => {
  for (const j of jobs) {
    const input = path.join(SRC, j.from);
    if (!fs.existsSync(input)) continue;
    await sharp(input)
      .resize({ width: j.width, withoutEnlargement: true })
      .jpeg({ quality: j.quality, mozjpeg: true, progressive: true })
      .toFile(path.join(OUT, j.to));
    const kb = Math.round(fs.statSync(path.join(OUT, j.to)).size / 1024);
    console.log(`${j.from} -> stills/${j.to} (${kb} KB)`);
  }
})();

// Logo del CIFP A Farixa + Xunta: convierte el PNG con fondo blanco en un logo
// blanco sobre transparente, recortado, para usarlo sobre fondo oscuro.
(async () => {
  const input = path.join(SRC, "farixa.png");
  if (!fs.existsSync(input)) return;
  const { data, info } = await sharp(input).trim({ threshold: 20 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const lum = Math.min(data[i], data[i + 1], data[i + 2]); // blanco -> 255, azul -> bajo
    data[i + 3] = 255 - lum;
    data[i] = data[i + 1] = data[i + 2] = 255;
  }
  const out = path.join(OUT, "logos-farixa.png");
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .resize({ width: 1200, withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`farixa.png -> stills/logos-farixa.png (${Math.round(fs.statSync(out).size / 1024)} KB, ${info.width}x${info.height})`);
})();

// Logo de Dionysiacus Productions: versión blanca sobre transparente, recortada
// (parte de diow.png, que ya tiene fondo transparente; solo se fuerza el color a blanco).
(async () => {
  const input = path.join(SRC, "diow.png");
  if (!fs.existsSync(input)) return;
  const { data, info } = await sharp(input).ensureAlpha().trim({ threshold: 10 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) { data[i] = data[i + 1] = data[i + 2] = 255; }
  const out = path.join(OUT, "logo-dp.png");
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(out);
  console.log(`diow.png -> stills/logo-dp.png (${Math.round(fs.statSync(out).size / 1024)} KB, ${info.width}x${info.height})`);
})();
