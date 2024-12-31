import { useState } from "react";
import ChatBox from "./components/ChatBox";

export default function Chat() {
    const [showProfile, setShowProfile] = useState(false);

    return (
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 min-h-screen flex flex-col justify-between text-white">
            {/* Top Bar */}
            <header className="bg-gradient-to-r from-orange-500 to-red-600 h-20 flex items-center justify-between px-6 shadow-md">
                {/* Home Button */}
                <button
                    onClick={() => (window.location.href = "/")}
                    className="bg-white text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
                >
                    🏠 Home
                </button>

                {/* Logo */}
                {/* Logo */}
                    <div className="flex-grow text-center">
                        <img
                            src="/comuneVerse.png"
                            alt="CommuneVerse Logo"
                            className="w-48 h-48 mx-auto drop-shadow-xl"
                        />
                    </div>


                {/* Profile Section */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="bg-white text-black px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
                    >
                        Profile
                    </button>
                    {showProfile && (
                        <div className="absolute top-12 right-0 bg-white text-black p-4 rounded-lg shadow-lg">
                            <p className="font-bold">Karthik</p>
                            <p className="text-sm text-gray-600">karthik@example.com</p>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Chat Content */}
            <main className="flex flex-col items-center px-6 mt-4 flex-grow">
                <div className="w-full max-w-4xl">
                    <ChatBox />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-orange-500 to-red-600 h-16 flex items-center justify-center text-sm font-semibold text-white">
                @Powered by RMS Troopso...
            </footer>
        </div>
    );
}
