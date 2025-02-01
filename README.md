# 🛒 Product & Category Management App

A **MERN-based** full-stack application for managing products and categories, with **pagination**, **CRUD operations**, and **server-side restrictions**.

## 🚀 Tech Stack
- **Frontend**: React.js, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MySQL
- **Database**: MySQL
- **State Management**: useState, useEffect
- **Deployment**: GitHub Pages (Frontend) & Vercel/Render (Backend)

---

## 📌 Features
✅ Add, Update, Delete Products  
✅ Pagination (Only allows access up to Page 9)  
✅ Responsive UI with Tailwind CSS  
✅ Error Handling & Alerts  
✅ Server-Side Data Fetching (Backend limits data access)  

---

## 🛠 Installation Guide

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/yourusername/product-management-app.git
cd product-management-app2️⃣ Backend Setup
bash
Copy
Edit
cd backend
npm install
Configure MySQL:

Open backend/config/dbconfig.js
Update your MySQL credentials
Start Backend:

bash
Copy
Edit
npm start
Backend will run on http://localhost:5000

3️⃣ Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm start
Frontend will run on http://localhost:3000

🔄 Run Backend & Frontend Together
bash
Copy
Edit
npm run dev
(Make sure concurrently is installed in your root package.json)

🚀 Deployment Guide
1️⃣ Deploy Backend (Vercel/Render)
Use Render (https://render.com/)
Deploy the backend folder
Update frontend/src/services/api.js with your deployed API URL
2️⃣ Deploy Frontend (GitHub Pages)
bash
Copy
Edit
npm install -g gh-pages
npm run build
npm run deploy
(Ensure "homepage": "https://yourusername.github.io/product-management-app" is added to package.json)

🐛 Troubleshooting
1️⃣ Can't access Page 10?
✅ Expected behavior! The backend limits data retrieval to Page 9 only.

2️⃣ Backend not connecting to MySQL?
✅ Ensure MySQL is running & credentials are correct in dbconfig.js.

3️⃣ CORS Error?
✅ Add this middleware in server.js:

js
Copy
Edit
const cors = require('cors');
app.use(cors());
📜 License
This project is MIT Licensed. Feel free to use, modify, and distribute.

🚀 Developed by Your Name

yaml
Copy
Edit

---

### ✅ **Steps to Follow**
1. **Update GitHub Repository URL** in `git clone` & `"homepage"` in `package.json`.
2. **Push the latest code** to GitHub:
   ```bash
   git add .
   git commit -m "Added README and Deployment Guide"
   git push origin main
Deploy using GitHub Pages & Vercel/Render.
Let me know if you need changes! 🚀🔥
 Scrrenshot - of ruuning![Product screenshot](https://github.com/user-attachments/assets/3a37ada5-bc45-468f-8e71-dbc138b519ef)
![pagination aleart](https://github.com/user-attachments/assets/8bb1c25c-4ce6-43a1-83de-f0b0f94007b0)

![Api tested sucseefully All](https://github.com/user-attachments/assets/58268ec7-6924-4849-a4c7-00354e6dcc5b)
