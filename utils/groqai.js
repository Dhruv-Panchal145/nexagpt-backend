import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.log(err);
  }
};

export default getOpenAIAPIResponse;