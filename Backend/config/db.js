import mongoose from "mongoose"; // Use import instead of require

const dbconnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/job");
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

export default dbconnect; // Use export default instead of module.exports

