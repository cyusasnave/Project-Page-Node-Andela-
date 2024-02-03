import express from "express"
import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import projectModel from "../models/projectModel.js"
import userValidationSchema from "../validations/userValidations.js"


// All users controller
const allUsers = async (req, res) => {
  const users = await userModel.find()
  res.render("users/index", { users: users })
}
// New user controller
const newUser = (req, res) => {
  res.render("users/new", { user: new userModel()})
}
// Add user controller
const addUser = async (req, res) => {
  const {error} = userValidationSchema.validate(req.body);
  if(error) {
   return res.render("users/new", {
      user: req.body,
      validateError: error.details[0].message
    })
  }
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const hashedRepeatPassword = await bcrypt.hash(req.body.repeatPassword, salt)
  const user = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    repeatPassword: hashedRepeatPassword
  })
  try {
    await user.save()
    res.redirect(`/users/${user.id}`)
  } catch (error) {
    res.render("users/new", {
      user: user,
      errorMessage: "Error creating user!"
    })
  }
 // res.send("User Added!")
}

// Show user controller
const showUser = async (req, res) => {
  try {
  const user = await userModel.findById(req.params.id)
  let project = await projectModel.find({ user: user.id})
  res.render("users/show", { 
    user: user,
    projectByUser: project 
  })
  } catch (error) {
    console.log(error)
  }
}

// Edit user controller
const EditUser = async (req, res) => {
  const user = await userModel.findById(req.params.id)
  res.render("users/edit", { user: user})
}

// Update user controller
const UpdateUsers = async (req, res) => {
  let user
  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const hashedRepeatPassword = await bcrypt.hash(req.body.repeatPassword, salt)
    
    user = await userModel.findById(req.params.id)
      user.firstName = req.body.firstName,
      user.lastName = req.body.lastName,
      user.email = req.body.email,
      user.password = hashedPassword,
      user.repeatPassword = hashedRepeatPassword

    const {error} = userValidationSchema.validate(req.body);
    if(error) {
      return res.render("users/edit", {
        user: user,
        validateError: error.details[0].message
      })
    }
    await user.save()

    // res.redirect(`/users/${user.id}`)
    res.redirect("/users")
  } catch (error) {
    res.render("users/new", {
      user: user,
      errorMessage: "Error Editing user!"
    })
  }
  // res.send("Updated user" + req.params.id)
}
// Delete user controller
const DeleteUsers = async (req, res) => {
  let user
  try {
    user = await userModel.findByIdAndDelete(req.params.id)
    await projectModel.deleteMany({ user: req.params.id})

    res.redirect("/users")
  } catch (error) {
    console.log(error)
    if (user == null) {
      res.redirect("/")
    } else {
      res.redirect(`/users/${user.id}`)
     }
    
  }
  // res.send("Delete user" + req.params.id)
}

export default {
  allUsers,
  newUser,
  addUser,
  UpdateUsers,
  DeleteUsers,
  showUser,
  EditUser
}