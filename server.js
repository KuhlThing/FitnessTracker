const mongoose = require("mongoose");
const logger = require("morgan");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev"));


// Configure App
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Setup Routing
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Start the Web Server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} at http://localhost:${PORT}`);
});