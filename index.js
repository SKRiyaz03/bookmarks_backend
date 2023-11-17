const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const bookmarkRouter = require("./routes/bookmark");
const categoryRouter = require("./routes/category");
const searchController = require("./controllers/search");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 1234;
const URL = process.env.MONGO_URL;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection


mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas Successfully");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});


app.use("/bookmark", bookmarkRouter);
app.use("/tags", categoryRouter);
app.use("/search", searchController);
// API Endpoint to Get All Bookmarks
// Start the Express Server
app.listen(PORT, async () => {
  await mongoose.connect(URL);
  console.log(`Server is running on port ${PORT}`);
});
