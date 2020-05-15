const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: String },
    exercises: [{ exercise: String, duration: Number }]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
