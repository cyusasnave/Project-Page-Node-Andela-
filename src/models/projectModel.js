import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectModelSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user"
  }
})

export default mongoose.model("Project", projectModelSchema)