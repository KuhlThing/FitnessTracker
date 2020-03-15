const mongoose = require("mongoose");
const express = require("express");

const PORT = process.env.PORT || 8080;

app = express();

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