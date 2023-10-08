import express from "express";
import { login,register } from "../controllers/volunteer-controller";
const volunteer_router=express.Router();
volunteer_router.post("/login",login);
volunteer_router.post("/register",register);
export default volunteer_router;