const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: { type: String },
  description: { type: String },
  image_url: { type: String },
  reps: { type: Number },
  sets: { type: Number },
  weight: { type: Number },
  routineId: { type: Schema.Types.ObjectId, ref: 'Routine' },


}, {
    timestamps: true
  });

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;