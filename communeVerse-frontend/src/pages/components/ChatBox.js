import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ChatBox() {
    const [query, setQuery] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const suggestions = [
        "Tell me about tech events in Chennai!",
        "What music events are happening nearby?",
        "Are there any fitness workshops?",
        "What's fun to do in Chennai this weekend?",
    ];

    useEffect(() => {
        const introMessage = {
            user: "bot",
            message: "Hey there! 👋 Looking for something fun or interesting to do? Why not ask me about tech events, music gigs, or fitness workshops? 😊",
            events: [],
        };
        setMessages([introMessage]);
    }, []);

    const sendMessage = async (inputQuery) => {
        const userQuery = inputQuery || query;
        if (!userQuery.trim()) return;

        setLoading(true);
        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: 1, query: userQuery }),
            });
            const data = await response.json();
            setLoading(false);

            const botMessage = {
                user: "bot",
                message: data.message,
                events: Object.values(data.res_event || {}),
            };

            setMessages([...messages, { user: "user", message: userQuery }, botMessage]);
            setQuery("");
        } catch (error) {
            setLoading(false);
            setMessages([
                ...messages,
                { user: "user", message: userQuery },
                { user: "bot", message: "Oops! Something went wrong. Please try again later.", events: [] },
            ]);
        }
    };

    return (
        <div className="relative bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white" style={{ height: "fit-content" }}>
    
            {/* Header */}
         
            {/* Chat Container */}
            <div className="max-w-4xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg">
                <div className="h-[600px] overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="space-y-4">
                            {msg.user === "user" && (
                                <p className="text-right">
                                    <span className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md">
                                        {msg.message}
                                    </span>
                                </p>
                            )}

                            {msg.user === "bot" && (
                                <div>
                                    <p className="text-left">
                                        <span className="inline-block bg-gray-200 text-black rounded-lg px-4 py-2 shadow-md">
                                            {msg.message}
                                        </span>
                                    </p>
                                    {msg.events && msg.events.length > 0 && (
                                        <Slider
                                            dots={true}
                                            infinite={true}
                                            speed={500}
                                            slidesToShow={1}
                                            slidesToScroll={1}
                                            className="mt-4"
                                        >
                                            {msg.events.map((event, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col items-center space-y-4"
                                                >
                                                    {event.img_url && (
                                                        <img
                                                            src={event.img_url}
                                                            alt={event.title}
                                                            className="w-full h-[250px] object-cover rounded-lg"
                                                        />
                                                    )}
                                                    <div className="text-center space-y-2">
                                                        <h3 className="text-xl font-bold text-gray-800">
                                                            {event.title}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm">
                                                            {event.description}
                                                        </p>
                                                        <div className="text-gray-500 text-sm space-y-1">
                                                            <p>📅 {event.date}</p>
                                                            <p>📍 {event.location}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-4">
                                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm shadow-md hover:bg-blue-600 transition">
                                                            View More
                                                        </button>
                                                        <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm shadow-md hover:bg-green-600 transition">
                                                            Bookmark
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </Slider>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <p className="text-left">
                            <span className="inline-block bg-gray-300 rounded-lg px-4 py-2 animate-pulse">
                                Typing...
                            </span>
                        </p>
                    )}
                </div>
            </div>

            {/* Suggestions */}
            <div className="mt-4 text-center">
                <p className="text-gray-100 mb-2">Or maybe try asking one of these:</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={index}
                            onClick={() => sendMessage(suggestion)}
                            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex mt-4 max-w-4xl mx-auto">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me something..."
                    className="flex-grow border rounded-l-lg p-4 text-lg shadow-inner"
                />
                <button
                    onClick={() => sendMessage()}
                    className="bg-blue-500 text-white px-6 rounded-r-lg text-lg hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
