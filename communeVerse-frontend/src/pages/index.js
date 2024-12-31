import { useState } from "react";

export default function WelcomePage() {
    const [showProfile, setShowProfile] = useState(false);

    return (
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 min-h-screen flex flex-col items-center justify-between text-white">
            {/* Header Section */}
            <header className="flex items-center justify-between w-full px-6 py-4 bg-orange-500">
             

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Profile Section */}
                <div className="relative">
                    <button
                        onClick={() => (window.location.href = "/login")} // Corrected the redirection logic
                        className="bg-white text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
                    >
                        Login
                    </button>
                </div>

            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center text-center">
                {/* Logo */}
                <img
                    src="/comuneVerse.png"
                    alt="CommuneVerse Logo"
                    className="w-60 h-60 mb-6 drop-shadow-xl" // Increased size
                />
                <h1 className="text-4xl font-bold">Welcome to CommuneVerse</h1>
                <p className="mt-4 text-lg">
                    Discover a world of exciting events, vibrant communities, and local connections! Let’s find your next adventure together. 🌟
                </p>

                <button
                    onClick={() => (window.location.href = "/chat")}
                    className="mt-8 bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition"
                >
                    Start Exploring
                </button>
            </main>

            {/* Footer Section */}
            <footer className="w-full text-center py-4 bg-orange-600">
                <p className="text-sm">@Powered by RMS Troopso...</p>
            </footer>
        </div>
    );
}
