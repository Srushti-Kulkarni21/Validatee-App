const { GoogleGenAI } = require('@google/genai');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  // In @google/genai, it's typically ai.models.list()
  try {
    const models = await ai.models.list();
    for (const m of models) {
      console.log(m.name);
    }
  } catch(e) {
    console.error(e);
  }
}
run();
