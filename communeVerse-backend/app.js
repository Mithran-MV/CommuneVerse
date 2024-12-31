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
    const query = `INSERT INTO users (name, email, location, preferences) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, email, location, JSON.stringify(preferences)], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error adding user", details: err });
        } else {
            res.status(201).json({ message: "User added successfully", userId: results.insertId });
        }
    });
});

// Fetch All Events
app.get("/events", (req, res) => {
    const { location, category } = req.query;
    const query = `SELECT * FROM events WHERE location = ? OR (category = ? OR ? IS NULL)`;
    db.query(query, [location, category, category], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error fetching events", details: err });
        } else {
            res.json(results);
        }
    });
});

// Fetch Single Event by ID
app.get("/events/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM events WHERE id = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Error fetching event details", details: err });
        } else if (results.length === 0) {
            res.status(404).json({ error: "Event not found" });
        } else {
            res.json(results[0]);
        }
    });
});

// Chat with GPT for Event Suggestions\

app.post("/chat", async (req, res) => {
    const { userId, query } = req.body;

    try {
        // Step 1: Fetch user details from the database
        const userQuery = `
            SELECT preferences, location FROM users WHERE id = ? LIMIT 1
        `;
        db.query(userQuery, [userId], (err, results) => {
            if (err || results.length === 0) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            const { preferences, location } = results[0];
            let userPreferences = [];

            // Parse user preferences into an array
            if (typeof preferences === "string") {
                userPreferences = preferences.split(",").map((pref) => pref.trim());
            } else if (Array.isArray(preferences)) {
                userPreferences = preferences;
            }

            // Step 2: Query the database for matching events
            const eventQuery = `
                SELECT title, date, location, description, img_url
                FROM events
                WHERE location = ? AND (category IN (?) OR ? IS NULL)
                ORDER BY date ASC
            `;
            db.query(
                eventQuery,
                [location, userPreferences, userPreferences.length > 0 ? null : null],
                async (eventErr, eventResults) => {
                    if (eventErr) {
                        res.status(500).json({
                            error: "Error fetching events from database",
                            details: eventErr,
                        });
                        return;
                    }

                    // Step 3: Generate a friendly conversational message using GPT
                    const prompt = `
                        You are a friendly event assistant. Based on the user's query "${query}" and their preferences for ${userPreferences.join(
                        ", "
                    )}, create a friendly conversational introduction for the user. The message should only summarize and not include event details.
                    `;

                    try {
                        const gptResponse = await openai.chat.completions.create({
                            model: "gpt-3.5-turbo",
                            messages: [
                                { role: "system", content: "You are a helpful assistant." },
                                { role: "user", content: prompt },
                            ],
                            max_tokens: 100,
                            temperature: 0.7,
                        });

                        const message =
                            gptResponse?.choices?.[0]?.message?.content ||
                            "Hey there! 👋 Based on your query, here are some exciting events happening in Chennai that you might love.";

                        // Step 4: Format event details as `res_event`
                        const resEvent = {};
                        eventResults.forEach((event, index) => {
                            resEvent[index + 1] = {
                                title: event.title,
                                date: event.date,
                                location: event.location,
                                description: event.description,
                                img_url: event.img_url,
                            };
                        });

                        // Format final response
                        const response = {
                            message,
                            res_event: resEvent,
                        };

                        // Log the interaction into the database
                        const logQuery = `
                            INSERT INTO interactions (user_id, query, response)
                            VALUES (?, ?, ?)
                        `;
                        db.query(
                            logQuery,
                            [userId, query, JSON.stringify(response)],
                            (logErr) => {
                                if (logErr) {
                                    console.error(
                                        "Error logging interaction into database:",
                                        logErr
                                    );
                                }
                            }
                        );

                        // Send the response back to the user
                        res.json(response);
                    } catch (gptError) {
                        console.error("Error generating message using GPT:", gptError);
                        res.status(500).json({
                            error: "Error generating message using GPT",
                            details: gptError.message,
                        });
                    }
                }
            );
        });
    } catch (err) {
        res.status(500).json({ error: "Error processing chat request", details: err });
    }
});




// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
