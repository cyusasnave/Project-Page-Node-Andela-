import  express  from "express";
import userController from "../controller/userController.js";

const router = express.Router()

// All Users route
router.get("/", userController.allUsers)

// All Users route
router.get("/new", userController.newUser)

// All Users route
router.post("/", userController.addUser)

// Show User route
router.get("/:id", userController.showUser)

// Show User route
router.get("/:id/edit", userController.EditUser)

// Update user route
router.put("/:id", userController.UpdateUsers)

// Delete user route
router.delete("/:id", userController.DeleteUsers)

export default router