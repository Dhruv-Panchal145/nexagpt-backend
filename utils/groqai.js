import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    // Check API response status
    if (!res.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(
        data.error?.message || `Gemini API failed: ${res.status}`
      );
    }

    // Check whether candidates exist
    const assistantReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!assistantReply) {
      console.error("Unexpected Gemini Response:", data);
      throw new Error("Gemini returned no text response");
    }

    return assistantReply;

  } catch (err) {
    console.error("Gemini API Error:", err.message);
    throw err;
  }
};

export default getOpenAIAPIResponse;