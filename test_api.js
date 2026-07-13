const { runStartupResearch } = require('./services/research.js');

// Load env vars
require('dotenv').config({ path: '.env.local' });

// We need to use ts-node to run the TS file, or compile it.
