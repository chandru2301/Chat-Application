// deploy-to-netlify.js
// This script helps with setting up environment variables for Netlify deployment

const fs = require('fs');

// Get the Render backend URL from the command line argument or use a default placeholder
const renderUrl = process.argv[2] || 'RENDER_BACKEND_URL_PLACEHOLDER';

// Create the .env file content with the Render URL
const envContent = `VITE_API_BASE_URL=${renderUrl}
VITE_WS_ENDPOINT=${renderUrl}/ws
`;

// Write the .env file
fs.writeFileSync('.env.production', envContent);

console.log(`Created .env.production with backend URL: ${renderUrl}`);
console.log('You can now deploy to Netlify with these environment variables.');
console.log('Or set them manually in the Netlify dashboard under Site settings > Build & deploy > Environment variables'); 