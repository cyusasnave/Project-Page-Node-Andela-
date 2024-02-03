import  express  from "express";
import projectController from "../controller/projectController.js";

const router = express.Router()

router.get("/", projectController.allProjects)

export default router