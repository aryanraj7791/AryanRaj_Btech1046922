# Task Management System (Kanban Board)

A full-stack Task Management System built using the Kanban approach, allowing users to manage tasks securely with authentication and drag-and-drop functionality.

---

## Project Overview

This application helps users organize tasks into three stages:
- Pending
- In Progress
- Completed

Users can sign up, log in, and manage their own tasks using a clean and responsive Kanban board interface.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- express-validator

### Frontend
- React
- React Router
- React DnD
- Axios
- Tailwind CSS
- React Toastify

---

## Backend Setup Instructions
- cd backend
- npm install
- npm run dev

## Frontend Setup Instructions
- cd frontend
- npm install
- npm start

## Frontend Environment Variables (.env)
REACT_APP_API_URL=http://localhost:5000/api

## Backend Environment Variables (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task_management
JWT_SECRET=3466b1d5a7bf9b680b1f3a1bb0e77773049e7c436e5255655e280cda878adb7871a92733a90274dcccd815a8647e92d4094f57fd3561612959718adca1103b4f
JWT_EXPIRE=7d
NODE_ENV=development


