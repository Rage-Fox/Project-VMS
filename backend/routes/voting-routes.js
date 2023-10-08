import express from "express";
import { vote } from "../controllers/voting-controller";
const voting_router=express.Router();
voting_router.post("/vote",vote);
export default voting_router;