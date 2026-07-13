async function run() {
  try {
    const res = await fetch('http://localhost:3000/api/research', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idea: "AI Fitness Coach",
        country: "India",
        targetAudience: "Gen Z",
        businessModel: "SaaS"
      })
    });
    
    if (!res.ok) {
      const text = await res.text();
      console.error("HTTP Error:", res.status, text);
    } else {
      const data = await res.json();
      console.log("Success:", Object.keys(data));
    }
  } catch (e) {
    console.error("Fetch Error:", e);
  }
}
run();
