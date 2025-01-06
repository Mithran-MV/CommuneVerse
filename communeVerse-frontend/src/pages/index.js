import { useState } from "react";

export default function WelcomePage() {
    const statements = [
        "In a world full of social media apps, we've created something unique – a platform where artificial intelligence meets human connection, giving you the best of both worlds: community and conversation.",
        "What if your favorite social media app could also understand you, chat with you, and make your interactions smarter and more meaningful? That's exactly what we've built.",
        "Introducing a social media platform like no other – not just a space to share, but a place to talk, powered by an AI that understands, assists, and connects like a true companion.",
    ];

    return (
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 min-h-screen flex flex-col items-center text-white">
            {/* Header Section */}
            <header className="flex items-center justify-between w-full px-6 py-4 bg-orange-600 shadow-md">
                {/* Logo */}
                <img
                    src="/comuneVerse.png"
                    alt="CommuneVerse Logo"
                    className="w-24 h-auto rounded-full shadow-lg"
                />

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Login Button */}
                <button
                    onClick={() => (window.location.href = "/login")}
                    className="bg-white text-black px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition"
                >
                    Login
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center text-center px-6 mt-8">
                {/* Logo */}
                <img
                    src="/comuneVerse.png"
                    alt="CommuneVerse Logo"
                    className="w-40 h-auto mb-4 drop-shadow-xl"
                />

                {/* Welcome Text */}
                <h1 className="text-5xl font-extrabold mb-4">Welcome to CommuneVerse</h1>
                <p className="text-lg font-light mb-6 max-w-2xl">
                    Discover a world of exciting events, vibrant communities, and local connections! Let’s find your next adventure together. 🌟
                </p>

                {/* Statements Section */}
                <ul className="w-full max-w-3xl space-y-6">
                    {statements.map((statement, index) => (
                        <li
                            key={index}
                            className="flex items-center space-x-4 relative group"
                        >
                            <span className="text-white text-2xl font-bold">➤</span>
                            <p className="bg-white bg-opacity-20 px-6 py-4 rounded-lg shadow-md group-hover:bg-opacity-40 transition text-left text-white">
                                {statement}
                                <span className="hidden group-hover:block absolute -bottom-8 left-0 bg-orange-600 text-white text-sm px-3 py-1 rounded-lg shadow-md">
                                    Learn more →
                                </span>
                            </p>
                        </li>
                    ))}
                </ul>

                {/* Explore Button */}
                <button
                    onClick={() => (window.location.href = "/chat")}
                    className="mt-10 bg-black text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-800 transition transform hover:scale-105"
                >
                    Start Exploring
                </button>
            </main>

            {/* Footer Section */}
            <footer className="w-full text-center py-4 bg-orange-700">
                <p className="text-sm">@Powered by RMS Troopso...</p>
            </footer>
        </div>
    );
}
