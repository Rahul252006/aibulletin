import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import Article from "./models/Article.js";

async function run() {
  await connectDB();
  try {
    const article = new Article({
      title: "Fire on Rajdhani Express near Madhya Pradesh's Ratlam",
      content: "Rajdhani Express fire today: At around 9:48 hrs..."
    });
    const res = await article.save();
    console.log("Saved", res);
  } catch (err) {
    console.error("Error:", err);
  }
  process.exit(0);
}
run();
