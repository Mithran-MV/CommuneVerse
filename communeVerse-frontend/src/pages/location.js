export default function LocationPage() {
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

            {/* Location Selector */}
            <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Select Your Location</h2>
                <select className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none">
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                </select>
                <button
                    onClick={() => (window.location.href = "/preferences")}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg shadow-md hover:bg-orange-600 transition"
                >
                    Next
                </button>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center">
                <p className="text-sm">@Powered by RMS Troopso...</p>
            </footer>
        </div>
    );
}
