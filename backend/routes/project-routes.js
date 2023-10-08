import express from "express";
import { register } from "../controllers/project-controller";
const project_router=express.Router();
project_router.post("/register",register);
export default project_router;