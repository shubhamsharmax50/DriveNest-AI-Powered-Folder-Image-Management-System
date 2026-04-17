# DriveNest - AI-Powered Folder & Image Management System

A simplified Google Drive clone for managing nested folders and images, featuring AI-powered commands via Groq.

## Features

- **Authentication**: JWT-based Signup/Login (bcrypt password hashing).
- **Nested Folder System**: Create infinite parent-child folder structures.
- **Image Management**: Upload images to specific folders (Cloudinary storage).
- **AI Integration**: Use natural language commands to create folders and list images (Groq AI).
- **Size Tracking**: Recursive folder size calculation.
- **Modern UI**: Dark-themed, responsive dashboard built with React and Tailwind CSS.

## Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS (v4), Axios, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose).
- **Services**: Cloudinary (Binary Storage), Groq (AI).

## Setup Instructions

### 1. Prerequisites
- Node.js installed.
- MongoDB Atlas account.
- Cloudinary account.
- Groq Cloud account.

### 2. Environment Variables
Create a `.env` file in the root directory with the following:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Groq AI
GROQ_API_KEY=your_groq_api_key
```

### 3. Installation

**Backend:**
```bash
npm install
node server.js
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### MongoDB Connection Error
If you see `Error connecting to MongoDB: Could not connect to any servers...`, you must **Whitelist your IP address** in MongoDB Atlas:
1. Go to **Network Access** in Atlas.
2. Click **Add IP Address**.
3. Choose **Add Current IP Address** or **Allow Access from Anywhere (0.0.0.0/0)**.

### Tailwind CSS Issues
This project uses **Tailwind CSS v4**. Ensure you are using a recent version of Node.js (20.19+ recommended) for smooth operation with Vite 8.

## Usage
- **Double Click** a folder to enter it.
- **Use the Breadcrumbs** to navigate back up.
- **Click the Sparkles** (AI input) to try: "Create a folder named Projects" or "Create a folder called Images inside Projects".
