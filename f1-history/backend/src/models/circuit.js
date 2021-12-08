import mongoose from "mongoose";

const circuitSchema = mongoose.Schema({
  name: String,
  location: String,
  length: Number,
  capacity: Number,
});

export default mongoose.model("Circuit", circuitSchema);
