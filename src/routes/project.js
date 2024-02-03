import  express  from "express";
import projectController from "../controller/projectController.js";
import userController from "../controller/userController.js";

const router = express.Router()

// All projects route
router.get("/", projectController.allProjects)

// All projects route
router.get("/new", projectController.newProject)

// All projects route
router.post("/", projectController.addProject)

// show project
router.get("/all", projectController.showProject)

// Edit project route
router.get("/:id/edit", projectController.editProject)

// Update project route
router.put("/:id", projectController.UpdateProject)

// Delete project route
router.delete("/:id", projectController.deleteProject)

export default router