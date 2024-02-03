import mongoose from "mongoose";
import projectModel from "./projectModel.js";

const Schema = mongoose.Schema;

const userModelSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  repeatPassword: {
    type: String,
    required: true
  }
})

userModelSchema.pre("findByIdAndDelete", function(next) {
  projectModel.findById({ user: this.id }).exec((error, projects) => {
    if (error) {
      next(error)
    } else if (projects.length > 0) {
      next(new Error("This User has projects still!"))
    } else {
      next()
    }
  })
})

export default mongoose.model("user", userModelSchema)