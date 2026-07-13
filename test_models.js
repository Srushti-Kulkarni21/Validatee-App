const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const key = env.split('\n').find(l => l.startsWith('GEMINI_API_KEY=')).split('=')[1].trim();

async function run() {
  const ai = new GoogleGenAI({ apiKey: key });
  const modelsToTest = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash',
    'gemini-2.5-flash',
    'gemini-1.5-flash-latest'
  ];

  for (const m of modelsToTest) {
    try {
      const response = await ai.models.generateContent({
        model: m,
        contents: "Say hello",
      });
      console.log(`Model ${m} SUCCESS: ${response.text}`);
    } catch(e) {
      console.error(`Model ${m} FAILED: ${e.message}`);
    }
  }
}
run();
