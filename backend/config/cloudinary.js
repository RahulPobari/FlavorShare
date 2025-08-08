const cloudinary = require('cloudinary').v2;

// Validate environment variables early
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error(
    'ERROR: Missing one or more Cloudinary environment variables:' +
      ` CLOUDINARY_CLOUD_NAME: ${CLOUDINARY_CLOUD_NAME ? 'OK' : 'MISSING'},` +
      ` CLOUDINARY_API_KEY: ${CLOUDINARY_API_KEY ? 'OK' : 'MISSING'},` +
      ` CLOUDINARY_API_SECRET: ${CLOUDINARY_API_SECRET ? 'OK' : 'MISSING'}`
  );
  // Optionally: throw an error here to stop app startup if preferred
  // throw new Error('Cloudinary environment variables are required');
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Optional: Log when successfully configured (remove in production)
console.log('Cloudinary configured with cloud_name:', CLOUDINARY_CLOUD_NAME);

module.exports = cloudinary;
