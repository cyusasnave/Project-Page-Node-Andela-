import express from "express"
import projectModel from "../models/projectModel.js"
import userController from "./userController.js"
import userModel from "../models/userModel.js"
import projectValidationSchema from "../validations/projectValidation.js"


// All projects controller
const allProjects = async (req, res) => {
  let projects
  try {
    projects = await projectModel.find({}).sort({ timestamp: -1 }).limit(6).exec()
    const users = await userModel.find()
    res.render("index", { 
      projects: projects,
      users: users 
    })
  } catch (error) {
    console.log(error)
    projects = [];
  }
}

// New project controller
const newProject = async (req, res) => {
  renderNewPage(res, new projectModel())
}

// add project controller
const addProject = async (req, res) => {
  const users = await userModel.find()
  const {error} = projectValidationSchema.validate(req.body);
  if (error) {
    
    return res.render("projects/new", {
      users: users,
      project: req.body,
      validateError: error.details[0].message
    })
  }
  const project = new projectModel({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    user: req.body.user,
  })
  try {
    await project.save()
    res.redirect("/projects")
  } catch (error) {
    renderNewPage(res, project, true)
  }
  // res.send("Add Project Here!")
}

// Show controller
const showProject = async (req, res) => {
  const projects = await projectModel.find().sort({ timestamp: -1 })
  const users = await userModel.find()
  res.render("projects/index", { 
    projects: projects,
    users: users
   })
}

// edit project controller
const editProject = async (req, res) => {
  try {
  const project = await projectModel.findById(req.params.id)
   renderEditPage(res, project)
  } catch (error) {
    renderEditPage(res, project, true)
  }
}

// update project controller
const UpdateProject = async (req, res) => {
  let project 
  try {
    project = await projectModel.findById(req.params.id)
    project.title = req.body.title,
    project.description = req.body.description,
    project.link = req.body.link,
    project.user = req.body.user

  const {error} = projectValidationSchema.validate(req.body);
  if (error) {
    const users = await userModel.find()
    return res.render("projects/edit", {
      users: users,
      project: project,
      validateError: error.details[0].message
    })
  }

    await project.save()
    res.redirect("/projects")
  } catch (error) {
    renderEditPage(res, project, true)
  }
}
// delete project controller
const deleteProject = async (req, res) => {
  let project
  try {
    project = await projectModel.findByIdAndDelete(req.params.id)
    res.redirect("/projects")
  } catch (error) {
    console.log(error)
    if (project == null) {
      res.redirect("/")
    }
    
  }
}

const renderNewPage = async (res, project, hasError = false) => {
  try {
    const users = await userModel.find()
    const passes = {
      users: users,
      project: project
    }
    if (hasError) {
      passes.errorMessage = "Error Creating Project!"
    }
    
    res.render("projects/new", passes)
  } catch (error) {
    console.log(error)
    res.redirect("/projects")
  }
}

const renderEditPage = async (res, project, hasError = false) => {
  try {
    const users = await userModel.find()
    const passes = {
      users: users,
      project: project,
    }
    if (hasError) passes.errorMessage = "Error Editing Project!"
    res.render("projects/edit", passes)
  } catch (error) {
    console.log(error)
    res.redirect(`/projects/${project.id}/edit`)
  }
}

export default {
  allProjects,
  newProject,
  addProject,
  editProject,
  UpdateProject,
  deleteProject,
  showProject
}