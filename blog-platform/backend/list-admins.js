import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

const listAdmins = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully!");

    const admins = await Admin.find({}, { password: 0 }); // Exclude password hash
    console.log("\nRegistered Admin Accounts in Database:");
    console.log("=========================================");
    if (admins.length === 0) {
      console.log("❌ No admin accounts found in the database!");
      console.log("You must run 'npm run create-admin <username> <password>' to register one.");
    } else {
      admins.forEach((admin, i) => {
        console.log(`${i + 1}. Username: "${admin.username}" (Created: ${admin.createdAt})`);
      });
    }
    console.log("=========================================\n");
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error connecting to database or querying admins:", error.message);
    process.exit(1);
  }
};

listAdmins();
