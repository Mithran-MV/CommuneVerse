import { useState } from "react";

export default function InterestsPage() {
    const [selectedInterests, setSelectedInterests] = useState([]);

    const interests = [
        "Music", "Tech", "Fitness", "Travel", "Food", "Lifestyle", "Entertainment", "Sports",
        "Health", "Business", "Comedy", "Spiritual", "Learning", "Shopping", "Gaming",
        "Pet Lovers", "Automobile", "Fashion", "Photography", "Art"
    ];

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else if (selectedInterests.length < 3) {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    return (
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 min-h-screen flex flex-col items-center justify-center text-white">
            {/* Logo */}
            <div className="mb-8">
                <img
                    src="/comuneVerse.png"
                    alt="CommuneVerse Logo"
                    className="w-48 h-48 mx-auto drop-shadow-xl" // Increased logo size
                />
            </div>

            {/* Interests Selector */}
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-center mb-4">Select Your Interests</h2>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Select at least 1 category (Max 3)
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    {interests.map((interest, index) => (
                        <button
                            key={index}
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-2 rounded-lg shadow-md ${
                                selectedInterests.includes(interest)
                                    ? "bg-orange-500 text-white"
                                    : "bg-gray-100 text-black"
                            } hover:bg-orange-400 hover:text-white transition`}
                        >
                            {interest}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => {
                        if (selectedInterests.length > 0) {
                            alert(`Interests Selected: ${selectedInterests.join(", ")}`);
                            window.location.href = "/home";
                        } else {
                            alert("Please select at least one interest.");
                        }
                    }}
                    className="mt-8 w-full bg-orange-500 text-white py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
                >
                    Submit
                </button>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center">
                <p className="text-sm">@Powered by RMS Troopso...</p>
            </footer>
        </div>
    );
}
