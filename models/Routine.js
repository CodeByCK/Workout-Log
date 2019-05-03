const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoutineSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  exerciseList: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  name: { type: String, required: true },
  description: { type: String }
}, {
    timestamps: true
  });

const Routine = mongoose.model("Routine", RoutineSchema);

module.exports = Routine;