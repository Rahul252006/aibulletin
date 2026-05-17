# ModernBlog - SEO Optimized CMS Platform

A production-ready, full-stack MERN blogging platform built for speed, SEO, and developer experience.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT & bcryptjs
- **Styling**: Tailwind CSS (Dark theme, glassmorphism UI)

## Features
- Futuristic, premium dark-mode UI
- Fully responsive design
- Admin Dashboard (Create, Edit, Delete, Publish articles)
- Rich SEO meta tags (Open Graph, Twitter, JSON-LD Structured Data)
- Dynamic URL routing with slugs
- Fast lazy-loaded images & minimal frontend bundle
- Secure JWT-based admin authentication

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string

### Environment Variables
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blog
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```
Create a `.env` file in the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000/api
```

### Installation

1. Clone the repository
2. Install Backend Dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install Frontend Dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the App Locally

1. Start the Backend:
   ```bash
   cd backend
   node index.js
   ```
2. Start the Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Admin Setup
To create your first admin user, make a POST request to `http://localhost:5000/api/auth/setup` with a JSON body containing `username` and `password`. After setup, remove or comment out the setup route in `backend/routes/authRoutes.js` for security.

## Deployment & Optimization
- **Frontend**: Deploy on Vercel. Connect your GitHub repo, select the `frontend` directory as root, and use default Vite build settings. Add `VITE_API_URL` pointing to your deployed backend.
- **Backend**: Deploy on Render/Railway as a Web Service. Set start command to `node index.js`. Provide `MONGO_URI` and `JWT_SECRET` in environment variables.
- **Database**: Host on MongoDB Atlas. Ensure network IP access is configured to allow your backend IP.
- **Lighthouse**: Optimized semantic HTML, fast loading React structure, and dynamic `<Helmet>` injection ensures 85+ Lighthouse SEO/Performance scores.
