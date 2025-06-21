import axios from 'axios';
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

export const handleChatAssistant = async (req, res) => {
    const { message, language = "English" } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required." });
    }

    const prompt = `
You are an AI Health Coach specializing in respiratory health.
A user has asked the following question. Provide a short, empathetic, and helpful answer in ${language}.
Avoid making diagnoses. Keep it under 5 lines.

User's Question:
"${message}"
`;

    try {
        const geminiRes = await axios.post(
            `${GEMINI_API_URL}?key=${API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const reply = geminiRes.data.candidates[0].content.parts[0].text.trim();
        res.json({ reply });

    } catch (error) {
        console.error("Gemini Error:", error.response?.data || error.message);
        res.status(500).json({ error: "AI assistant failed to respond." });
    }
};
