const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const db = require("./models/model.js")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/workout", {  useNewUrlParser: true,  useFindAndModify: false});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"))
})

app.get("/api/workouts",(req, res) => {
  db.find().then(workouts => res.json(workouts))
})

app.post("/api/workouts", ({ body }, res) => {
  db.create(body).then(workouts => res.json(workouts))
})

app.put("/api/workouts/:id", ({ body, params }, res) => {
  db.findByIdAndUpdate(params.id, {$push:{exercises:body}}).then(workouts => res.json(workouts))
})

app.get("/api/workouts/range",(req, res) => {
  db.find().then(workouts => res.json(workouts))
})


// app.post("/submit", ({ body }, res) => {
//   const book = body;

//   book.read = false;

//   db.books.save(book, (error, saved) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.send(saved);
//     }
//   });
// });

// app.get("/read", (req, res) => {
//   db.books.find({ read: true }, (error, found) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.json(found);
//     }
//   });
// });

// app.get("/unread", (req, res) => {
//   db.books.find({ read: false }, (error, found) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.json(found);
//     }
//   });
// });

// app.put("/markread/:id", ({ params }, res) => {
//   db.books.update(
//     {
//       _id: mongojs.ObjectId(params.id)
//     },
//     {
//       $set: {
//         read: true
//       }
//     },

//     (error, edited) => {
//       if (error) {
//         console.log(error);
//         res.send(error);
//       } else {
//         console.log(edited);
//         res.send(edited);
//       }
//     }
//   );
// });

// app.put("/markunread/:id", ({ params }, res) => {
//   db.books.update(
//     {
//       _id: mongojs.ObjectId(params.id)
//     },
//     {
//       $set: {
//         read: false
//       }
//     },

//     (error, edited) => {
//       if (error) {
//         console.log(error);
//         res.send(error);
//       } else {
//         console.log(edited);
//         res.send(edited);
//       }
//     }
//   );
// });

app.listen(3000, () => {
  console.log("App running on port 3000!");
});