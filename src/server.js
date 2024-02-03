


import express from "express"
import expressEjsLayouts from "express-ejs-layouts"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import MethodOverrideOptions from "method-override";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";
dotenv.config();

import indexRouter from "./routes/index.js";
import userRouter from "./routes/users.js";
import projectRouter from "./routes/project.js";

const app = express();
const port = 1000;

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout.ejs")
app.use(express.static("src/public"))
app.use(expressEjsLayouts)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(MethodOverrideOptions("_method"))

app.use("/", indexRouter)
app.use("/users", userRouter)
app.use("/projects", projectRouter)

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("Error", error => console.error(error))
db.once("open", error => console.log("Connected to Database"))

app.listen(port, () => console.log(`Server is running on port ${port}`))