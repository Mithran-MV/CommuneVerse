import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

(async () => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: "What is 2+2?" },
            ],
            max_tokens: 10,
        });
        console.log("OpenAI API Response:", response);
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
})();
