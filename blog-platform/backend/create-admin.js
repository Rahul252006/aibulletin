import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.error("Error: Please provide both username and password.");
    console.log("Usage: node create-admin.js <username> <password>");
    process.exit(1);
  }

  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully!");

    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log(`Admin user "${username}" already exists.`);
      console.log("Updating password...");
      const salt = await bcrypt.genSalt(10);
      existing.password = await bcrypt.hash(password, salt);
      await existing.save();
      console.log("Password updated successfully!");
      mongoose.disconnect();
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    console.log(`Admin user "${username}" created successfully!`);
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error creating/updating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
