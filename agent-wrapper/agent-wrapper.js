export const runAgent = async (transcript) => {
  const prompt = `
You are an AI meeting assistant. Analyze the following transcript.

Transcript:
${transcript}

Give your output in this format:
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
  return getSummary.response;
};
