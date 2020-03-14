const db = require("../models/index");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;


module.exports = function (app) {

    app.get("/api/workouts", function (req, res) {
        db.Workout.find({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });

    app.get("/api/workouts/range", function (req, res) {
        db.Workout.find({})
            .sort({ "day": 1 })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });

    app.get("/api/workouts/:id", function (req, res) {
        db.Workout.findOne({
            where: {
                id: req.params.id
            }
        }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        })
    })

    app.post("/api/workouts", function (req, res) {
        const workout = new db.Workout();
        db.Workout.create(workout)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            })
    });

    app.put("/api/workouts/:id", function (req, res) {
        var query = { _id: req.params.id };
        db.Workout.findOneAndUpdate(query, {
            $push: { exercises: [req.body] }
        }, function (err, dbWorkout) {
            if (err) {
                res.json(err);
            } else {
                res.json(dbWorkout);
            }
        })
    })


}