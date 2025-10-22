const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());

// file upload middleware
const fileupload = require("express-fileupload");
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

// database connection
const db = require("./config/database");
db.connectDB();

// cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// routes
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

// start server
app.listen(PORT, () => {
  console.log(`App is running at port ${PORT}`);
});
