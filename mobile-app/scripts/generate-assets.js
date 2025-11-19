const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');
const imagesDir = path.join(assetsDir, 'images');

[assetsDir, imagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// A single pixel transparent PNG base64; safe placeholder for icons
const pixelBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMBAwKc+qgAAAAASUVORK5CYII=';
const buffer = Buffer.from(pixelBase64, 'base64');

const placeholders = {
  'icon.png': buffer,
  'splash.png': buffer,
  'adaptive-icon.png': buffer,
  'favicon.png': buffer,
};

const imagePlaceholders = {
  'onboarding1.png': buffer,
  'onboarding2.png': buffer,
  'onboarding3.png': buffer,
};

Object.entries(placeholders).forEach(([name, buf]) => {
  const filePath = path.join(assetsDir, name);
  try {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, buf);
        console.log(`Created placeholder asset: ${filePath}`);
    }
  } catch (err) {
    console.error(`Failed to write ${filePath}:`, err.message);
  }
});

Object.entries(imagePlaceholders).forEach(([name, buf]) => {
    const filePath = path.join(imagesDir, name);
    try {
      if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, buf);
          console.log(`Created placeholder image: ${filePath}`);
      }
    } catch (err) {
      console.error(`Failed to write ${filePath}:`, err.message);
    }
  });
