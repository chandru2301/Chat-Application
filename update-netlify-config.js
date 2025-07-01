// update-netlify-config.js
// This script updates your Netlify site environment variables

const { execSync } = require('child_process');

// Replace with your actual Render backend URL
const RENDER_BACKEND_URL = "https://chat-application-teoj.onrender.com"; // Actual Render backend URL

// Check if Netlify CLI is installed
try {
  console.log("Checking for Netlify CLI...");
  execSync('netlify --version', { stdio: 'inherit' });
} catch (error) {
  console.error("Netlify CLI not found. Please install it with: npm install -g netlify-cli");
  process.exit(1);
}

// Instructions for updating Netlify environment variables
console.log("\n=== NETLIFY CONFIGURATION GUIDE ===");
console.log("\n1. Make sure you're logged in to Netlify CLI:");
console.log("   netlify login");
console.log("\n2. Run the following commands to set your environment variables:");
console.log(`   netlify env:set VITE_API_BASE_URL ${RENDER_BACKEND_URL}`);
console.log(`   netlify env:set VITE_WS_ENDPOINT ${RENDER_BACKEND_URL}/ws`);
console.log("\n3. Trigger a new deployment:");
console.log("   netlify deploy --prod");
console.log("\nAlternatively, you can set these variables in the Netlify dashboard:");
console.log("1. Go to your site settings in Netlify");
console.log("2. Navigate to 'Build & deploy' > 'Environment variables'");
console.log("3. Add the following variables:");
console.log(`   VITE_API_BASE_URL: ${RENDER_BACKEND_URL}`);
console.log(`   VITE_WS_ENDPOINT: ${RENDER_BACKEND_URL}/ws`);
console.log("\n=== END OF GUIDE ==="); 