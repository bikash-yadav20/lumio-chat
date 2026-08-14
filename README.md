Lumio Chat---
A modern real-time chat application built with React, Node.js, Express, MySQL, Sequalize, and Socket.IO.

Lumio chat allows users to communicate in real time through private and group conversation, while providing features such as user blocking, profile management, group creation.

Lumio chat is deployed using Vercel for the frontend and Railway for Node.js backend, and MySQL Database.

Live Demo:
https://lumio-chat-fawn.vercel.app/chat-me

Features:-

Real-time one-to-one messaging
Group conversations
Block and unblock users
profile management
Update profile informations
Online/offline user status
Unseen message count
Real-time updates using Socket.IO
Responsive UI
Protected API routes

Tech Stack used in Lumio chat:-

Frontend: React.js, vite, Tailwind CSS, Axios, Socket.IO Client, React Router.

Backend: Node.js, Express.js, Socket.IO, Sequalize ORM, Jwt Authentication.

Database: MySQL

Deployment: Vercel, Railway

⚙️ Installation-
1. Clone the repository
git clone https://github.com/bikash-yadav20/lumio-chat.git 
cd lumio-chat

2. Setup backend
cd chat-api
npm install

Create a .env file:

DB_USER=root
DB_NAME=chatApp
DB_PASSWORD=yourpassord
DB_HOST=localhost
DB_PORT=3306
PORT=3000
JWT_SECRET_KEY= "chatapisecret"

# Cloudinary secret key
CLOUD_NAME= "youcloudname"
API_KEY="yourapikay"
API_SECRET="yourapisecret"

FRONTEND_URL="http://localhost:5173"

Start the backend:
npm run start or npm run dev

3. Setup frontend:
cd chatME-web
npm install

create a .env file:
VITE_BASE_URL="http://localhost:3000"
VITE_SOCKET_URL="http://localhost:3000"
npm run dev

Author: Bikash Yadav
GitHub: @bikash-yadav20

📄 License
This project is currently for learning and portfolio puposes
