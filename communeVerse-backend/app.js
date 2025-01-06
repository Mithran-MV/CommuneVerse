import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// OpenAI Configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Add a New User
app.post("/users", (req, res) => {
    const { name, email, location, preferences } = req.body;

    if (!name || !email || !location || !preferences) {
        return res.status(400).json({ error: "All fields are required: name, email, location, preferences" });
    }

    const query = `INSERT INTO users (name, email, location, preferences) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, location, JSON.stringify(preferences)], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error adding user", details: err });
        }
        res.status(201).json({ message: "User added successfully", userId: results.insertId });
    });
});

// Fetch All Events
app.get("/events", (req, res) => {
    const { location, category } = req.query;
    const query = `SELECT * FROM events WHERE location = ? OR (category = ? OR ? IS NULL)`;
    db.query(query, [location, category, category], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching events", details: err });
        }
        res.json(results);
    });
});

// Fetch Single Event by ID
app.get("/events/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM events WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching event details", details: err });
        } else if (results.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.json(results[0]);
    });
});

// Chat with GPT for Event Suggestions

app.post("/chat", async (req, res) => {
    const { userId, query } = req.body;

    if (!userId || !query) {
        return res.status(400).json({ error: "User ID and query are required" });
    }

    try {
        // Step 1: Fetch user details from the database
        const userQuery = `SELECT preferences, location FROM users WHERE id = ? LIMIT 1`;
        db.query(userQuery, [userId], async (err, userResults) => {
            if (err || userResults.length === 0) {
                return res.status(404).json({ error: "User not found" });
            }

            const { preferences, location } = userResults[0];
            const userPreferences = Array.isArray(preferences)
                ? preferences
                : preferences.split(",").map((pref) => pref.trim());

            // Step 2: Fetch events under user preferences
            const eventQuery = `SELECT title, date, location, description, img_url FROM events WHERE category IN (?)`;
            db.query(eventQuery, [userPreferences], async (err, eventResults) => {
                if (err) {
                    return res.status(500).json({ error: "Error fetching user preference events", details: err });
                }

                // Step 3: Prepare prompt for OpenAI
                const prompt = `
                    You are a friendly and interactive event recommendation assistant. Craft your responses as if you are having a lively conversation with the user. Use a casual and interactive tone, and reference the user's location and query explicitly.

                    Your responses must be formatted in **valid JSON** with this structure:
                    {
                        "message": "A friendly and interactive response based on the user's location and query.",
                        "events": {
                            "1": {
                                "title": "Event Title",
                                "date": "Event Date",
                                "location": "Event Location",
                                "description": "Event Description"
                            },
                            "2": {
                                "title": "Event Title",
                                "date": "Event Date",
                                "location": "Event Location",
                                "description": "Event Description"
                            }
                        }
                    }

                    Focus on being conversational and engaging. For example:
                    "Hey there! 🌟 I'm excited to share some awesome tech events happening in Chennai that match your love for technology and music. Let’s dive in and explore some amazing events you won’t want to miss! 🎵💻 #TechMusicFun"

                    User Query: "${query}"
                    User Location: ${location}
                `;

                try {
                    const response = await openai.chat.completions.create({
                        model: "gpt-3.5-turbo",
                        messages: [
                            { role: "system", content: "You are a helpful assistant." },
                            { role: "user", content: prompt },
                        ],
                        max_tokens: 500,
                        temperature: 0.7,
                    });

                    // Log the raw OpenAI response
                    console.log("Raw OpenAI response:", response.choices[0].message.content);

                    // Process OpenAI response
                    let rawResponse = response.choices[0].message.content;
                    if (rawResponse.startsWith("```")) {
                        rawResponse = rawResponse.replace(/```(\w+)?/g, "").trim();
                    }

                    const assistantMessage = JSON.parse(rawResponse);

                    // Add the user preference events to the response
                    const usePreferenceEvent = eventResults.map((event) => ({
                        title: event.title,
                        date: event.date,
                        location: event.location,
                        description: event.description,
                        img_url: event.img_url,
                    }));

                    // Final response with message, events, and usePreferenceEvent
                    const finalResponse = {
                        ...assistantMessage,
                        usePreferenceEvent,
                    };

                    // Log interaction in the database
                    const insertQuery = `INSERT INTO interactions (user_id, query, response) VALUES (?, ?, ?)`;
                    db.query(insertQuery, [userId, query, JSON.stringify(finalResponse)], (err) => {
                        if (err) {
                            console.error("Error logging interaction:", err);
                        }
                    });

                    // Send the final response back to the user
                    res.json(finalResponse);
                } catch (parseError) {
                    console.error("Error parsing OpenAI response:", parseError.message);
                    console.error("OpenAI response content:", response.choices[0].message.content);

                    res.status(500).json({
                        error: "Invalid JSON from OpenAI",
                        details: parseError.message,
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ error: "Error processing chat request", details: err.message });
    }
});



// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
