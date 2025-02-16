// const express = require("express");

// const dbconnect = require("./config/db");

// const app = express();
// const blogRoute = require("./routes/blogRoute");
// const {upload} = require('./utils/fileUpload');
 




// app.use(express.json());  // For JSON data
// app.use(express.urlencoded({ extended: true })); // For form data (non-file uploads)

// app.use("/api/v1", blogRoute);
// app.use("/uploads", express.static("uploads"));

// dbconnect();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // app.post('/profile', upload.single('avatar'), function (req, res, next) {
// //     console.log(req.file);
// // })


// app.post("/profile", upload.single("avatar"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }
//   res.json({
//     message: "File uploaded successfully",
//     file: req.file.filename,
//   });
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });


const express = require("express");
const dbconnect = require("./config/db");
const app = express();
const blogRoute = require("./routes/blogRoute");
const auth = require("./routes/auth");

const { upload } = require("./utils/fileUpload");

// ✅ Place these before defining routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded images)
app.use("/uploads", express.static("uploads"));

dbconnect();

// Routes
app.use("/api/v1", blogRoute);
app.use("/api/v1/user", auth);

// ✅ Fix the file upload route
app.post("/profile", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    file: req.file.filename,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
