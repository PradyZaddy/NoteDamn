export const runAgent = async (transcript, userId) => {
  const prompt = `
You are an AI meeting assistant. Analyze the following transcript.

Transcript:
${transcript}

Give your output in this format:
Title: ...
Summary: ...
Key Points:
- ...
- ...
Action Items:
- ...
- ...
`;

  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'mistral:instruct',
      stream: false,
      prompt: prompt,
    }),
  });

  const getSummary = await res.json();
  const aiOutput = getSummary.response;

  const titleMatch = aiOutput.match(/Title:\s*(.*)/);
  const summaryMatch = aiOutput.match(/Summary:\s*([\s\S]*?)Key Points:/);
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled';
  const summary = summaryMatch ? summaryMatch[1].trim() : aiOutput;

  try {
    const saveRes = await fetch('http://localhost:8000/api/summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        title,
        summary,
      }),
    });
    const saved = await saveRes.json();
    console.log('Saved to MongoDB:', saved);
  } catch (err) {
    console.error('Failed to save to DB:', err);
  }

  return aiOutput;
};
