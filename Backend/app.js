import express from "express";
import userRoute from "./routes/user.route.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbconnect from "./config/db.js";
import companyroute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";





const app = express();
dotenv.config({});


dbconnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyroute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
