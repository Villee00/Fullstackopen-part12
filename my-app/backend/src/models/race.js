import mongoose from "mongoose";

const raceSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  circuit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Circuit",
  },
  grandPrix: {
    type: String,
    unique: true,
    required: true,
  },
  pictureLink: {
    type: String,
  },
  weather: {
    type: String,
    required: true,
  },
  laps: {
    type: Number,
  },
  length: {
    type: Number,
  },
  results: [
    {
      driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      grid: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Race", raceSchema);
