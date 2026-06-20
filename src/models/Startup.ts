import mongoose from "mongoose";

const StartupSchema = new mongoose.Schema(
  {
    idea: String,
    market: String,
    research: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Startup ||
  mongoose.model("Startup", StartupSchema);