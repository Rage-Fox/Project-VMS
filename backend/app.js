import express from "express";
import mongoose from "mongoose";
import admin_login_router from "./routes/admin-login-routes";
import project_router from "./routes/project-routes";
import volunteer_router from "./routes/volunteer-routes";
import voting_router from "./routes/voting-routes";
const app = express();
app.use(express.json());
app.use("/admin",admin_login_router);
app.use("/projects",project_router);
app.use("/volunteer",volunteer_router);
app.use("/voting",voting_router);
mongoose.connect("mongodb+srv://admin:nimda@cluster0.nnz6qgl.mongodb.net/VMS")
.then(() => app.listen(8000))
.then(() => console.log("Securely connected to MongoDB and listening to port 8000"))
.catch((err) => console.log(err));
