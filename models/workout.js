const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: true
            },
            name: String,
            duration: Number,
            distance: Number,
            weight: Number,
            reps: Number,
            sets: Number,
        }
    ],
    totalDuration: Number
});

WorkoutSchema.methods.getDuration = function () {
    let total = 0;
    console.log(this.exercises)
    for (let i = 0; i < this.exercises.length; i++) {
       total += this.exercises[i].duration;
       console.log(total)
    }
    this.totalDuration = total;
    return this.totalDuration;
 };

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;