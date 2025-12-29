// Load environment variables first
require('dotenv').config({ path: '../.env' });

// Import the Express app
const app = require('../backend/server');

// Export for Vercel serverless
module.exports = app;