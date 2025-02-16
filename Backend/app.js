import express from "express";
import userRoute from "./routes/user.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbconnect from "./config/db.js";





const app = express();
dotenv.config({});
app.use(cors());

dbconnect();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use("/api/v1/user", userRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
