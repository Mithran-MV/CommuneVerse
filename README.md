# README

## Project Overview
**CommuneVerse** is a comprehensive full-stack application designed to address the challenge of community discovery and engagement. This solution integrates advanced chatbot capabilities to help users discover events, activities, and community gatherings based on their interests and location. The application leverages cutting-edge technologies to provide:

1. **Natural Language Processing (NLP):** Enables the chatbot to understand and process user queries conversationally.
2. **Personalized Recommendations:** Tailored suggestions for events and activities based on user preferences and interaction history.
3. **Location-Based Discovery:** Utilizes location services to provide geo-specific recommendations for community gatherings and events.
4. **Continuous Learning:** Incorporates machine learning to adapt and improve recommendations based on user feedback and behavior over time.

The project is implemented using a modular architecture, comprising a powerful backend API and a dynamic frontend interface for seamless user experience.

## Prerequisites

### Tools and Dependencies
- **Node.js** (v14 or higher): Required for running the backend and frontend.
- **npm** (Node Package Manager): Comes with Node.js and is used for installing dependencies.
- **Git**: For version control (optional).

### Installations
1. [Download and install Node.js](https://nodejs.org/).
2. Clone this repository or extract the project files.

## Directory Structure
```
kynnovative_project/
│
├── communeVerse-frontend/  # Frontend application
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   ├── .env.local         # Frontend-specific environment variables
│   └── package.json       # Frontend dependencies
│
├── communeVerse-backend/   # Backend application
│   ├── app.js             # Main backend server file
│   ├── .env               # Backend-specific environment variables
│   └── package.json       # Backend dependencies
│
└── README.md               # Project documentation
```

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd kynnovative_project/communeVerse-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables:
   - Create a `.env` file in the backend directory with the required keys. Refer to `.env.example` if available.
   
4. Start the backend server:
   ```bash
   node app.js
   ```
   The backend server should now be running on the specified port (e.g., `http://localhost:5000`).

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../communeVerse-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables:
   - Create a `.env.local` file in the frontend directory with the required keys. Refer to `.env.local.example` if available.

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend server should now be running on `http://localhost:3000`.

## Running the Project
1. Start the backend server as described above.
2. Start the frontend server.
3. Open a browser and navigate to `http://localhost:3000` to access the application.

## Environment Variables

### Backend
Ensure the `.env` file includes:
- `PORT`: Port number for the backend server (default: 5000).
- `OPENAI_API_KEY`: API key for OpenAI integrations.
- `DATABASE_URL`: URL for the database (if applicable).

### Frontend
Ensure the `.env.local` file includes:
- `NEXT_PUBLIC_API_URL`: Backend API base URL (e.g., `http://localhost:5000`).

## Troubleshooting
- **Issue**: `npm install` fails.
  - **Solution**: Ensure you are using a supported Node.js version. Try deleting `node_modules` and `package-lock.json`, then reinstall dependencies.

- **Issue**: Environment variables not recognized.
  - **Solution**: Verify the `.env` and `.env.local` files are correctly formatted and saved.


