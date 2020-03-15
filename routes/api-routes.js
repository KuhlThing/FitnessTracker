const db = require("../models");

String.prototype.toObjectId = function () {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

module.exports = function (app) {

  app.get("/api/workouts", async (req, res) => {
    const agg = await db.Workout.aggregate([
      { $unwind: "$exercises" },
      {
        $group: {
          _id: "$_id",
          day: { "$first": "$day" },
          exercises: { $push: "$exercises" },
          totalDuration: { $sum: "$exercises.duration" },
        }
      },
      { $sort: { day: 1 } }
    ]);
    res.json(agg);
  });

  app.post("/api/workouts", async (req, res) => {
    const workout = new db.Workout();
    const data = await db.Workout.create(workout);
    res.json(data);
  });

  app.put("/api/workouts/:id", async (req, res) => {
    try {
      const data = await db.Workout.updateOne(
        {
          _id: req.params.id.toObjectId()
        },
        {
          $push: { exercises: req.body }
        },
        {
          runValidators: true
        });
      console.log(data);
      res.json(data);

    } catch (err) {
      console.log(JSON.stringify(err.errors['exercises'].message));
      res.sendStatus(400);
    }
  });

  app.get("/api/workouts/range", async (req, res) => {
    const data = await db.Workout.find({}).sort({ 'day': 1 });
    res.json(data.slice(-7));
  });
}
