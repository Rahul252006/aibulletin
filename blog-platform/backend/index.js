import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);

// API 404 handler - ensures any unmatched API route returns a proper JSON 404 error
app.use("/api", (req, res) => {
  res.status(404).json({ message: `API endpoint not found: ${req.method} ${req.originalUrl}` });
});

app.use(express.static(path.join(__dirname, "../frontend"), {
  extensions: ["html", "htm"]
}));

app.get("{*path}", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  // Fall back to index.html only for page navigations (requests accepting HTML)
  // For missing JS/CSS/images/etc., fall through to return a clean 404 and prevent 'Unexpected token' syntax errors in the browser.
  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "../frontend/index.html"));
  }
  next();
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

