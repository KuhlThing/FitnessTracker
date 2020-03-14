const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

  day: {
    type: Date,
    default: () => new Date(),
  },

  exercises: [{
      type: {type: String},
      name: {type: String},
      duration: {type: Number},
      weight: {type: Number},
      reps: {type: Number},
      sets: {type: Number}
  }]

});

const workouts = mongoose.model("Workouts", UserSchema);

module.exports = workouts;