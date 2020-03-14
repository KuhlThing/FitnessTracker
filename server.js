const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv");

const PORT = process.env.PORT || 3000;

// const db = require("./models/index");
const app = express();
// const seeder = require("./seeders/seed");
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Create new workout using workout model
// db.Workout.create({ name: "Fitness Tracker" })
//     .then(dbWorkout => {
//         console.log(dbWorkout);
//     }).catch(err => {
//         res.json(err);
//     })

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
