const mongoose = require("mongoose");

// TODO: Add more info fields
const driverSchema = mongoose.Schema({
  driverNumber: [Number],
  firstName: String,
  lastName: String,
  nationality: String,
  dateOfBirth: String,
  races: [
    {
      race: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Race",
      },
      position: {
        type: String,
      },
      grid: {
        type: String,
      },
    },
  ],
  teams: [String],
  wikipediaLink: String,
  seasonsDriven: [Number],
  pictureLink: String,
});

export default mongoose.model("Driver", driverSchema);
