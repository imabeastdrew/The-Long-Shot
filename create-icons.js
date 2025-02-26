const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create the public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Function to create a placeholder image
function createPlaceholderImage(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#3498db'; // A nice blue color
  ctx.fillRect(0, 0, size, size);
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size * 0.3}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TLS', size/2, size/2);
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, filename), buffer);
  console.log(`Created ${filename}`);
}

// Create different sized images
createPlaceholderImage(192, 'logo192.png');
createPlaceholderImage(512, 'logo512.png');

console.log('Icons generated successfully!'); 