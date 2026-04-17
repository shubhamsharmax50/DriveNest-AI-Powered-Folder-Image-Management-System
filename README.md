# DriveNest - AI-Powered Folder & Image Management System

DriveNest is a full-stack, AI-enhanced file management system that allows users to organize images into nested folder structures, similar to Google Drive. It features a natural language AI assistant that can execute file system commands.

## 🚀 Live Links
- **Frontend (Vercel)**: [https://drive-nest-ai-powered-folder-image.vercel.app](https://drive-nest-ai-powered-folder-image.vercel.app)
- **Backend (Render)**: [https://drivenest-backend-ui3t.onrender.com](https://drivenest-backend-ui3t.onrender.com)

## ✨ Core Features
- **Modern Authentication**: User registration and login using JWT and Bcrypt (No Firebase used as per requirements).
- **Infinite Nesting**: Create folders inside folders with a robust parent-child database relationship.
- **Image Management**: 
    - Upload images to specific folders.
    - Cloud storage integration via **Cloudinary**.
    - Metadata (size, name, URL) stored in **MongoDB**.
- **Recursive Folder Size**: An advanced API that calculates the total size of a folder by summing all images within it and all its subfolders at any depth.
- **AI Assistant (Bonus)**: Built-in command bar powered by **Groq (LLaMA 3)**.
    - Commands: *"Create folder Projects"*, *"Create folder Assets inside subham"*, *"Show all images in Work"*.
- **Responsive UI**: Clean, dark-mode dashboard built with **Tailwind CSS v4** and **Lucide Icons**.

## 🛠️ Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, Axios, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas (Mongoose ODM).
- **Storage**: Cloudinary.
- **AI Engine**: Groq SDK (LLaMA 3).

## 📂 Project Structure
- `/` (Root): Backend logic, API routes, and Database models.
- `/frontend`: React application, UI components, and Tailwind configuration.

## ⚙️ Local Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shubhamsharmax50/DriveNest-AI-Powered-Folder-Image-Management-System.git
   ```

2. **Backend Configuration**:
   - Create a `.env` in the root folder.
   - Add: `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, and `GROQ_API_KEY`.
   - Run `npm install` and `node server.js`.

3. **Frontend Configuration**:
   - Go to `/frontend` folder.
   - Run `npm install`.
   - Run `npm run dev`.

## 🌐 Deployment Details
- **Backend**: Hosted on **Render** (Auto-sync with GitHub).
- **Frontend**: Hosted on **Vercel** (Configured with production environment variables).

---
Developed with ❤️ for organized digital assets.
