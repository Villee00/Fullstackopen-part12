const mongoose = require("mongoose");

const seasonSchema = mongoose.Schema({
  wikipediaLink: {
    type: String,
    require: true,
  },
  year: {
    type: Number,
    require: true,
  },
  races: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Race",
    },
  ],
  drivers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
  ],
});

export default mongoose.model("Season", seasonSchema);
