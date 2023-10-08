import Project from "../models/Project";
export const register = async (req, res, next) => {
    try {
        // Extract project details from the request body
        const { _id, title, domain, excludingTl, teamLeader, teamMembers } = req.body;
        if(excludingTl>4 || excludingTl<1){
            return res.status(400).json({ message: "Give correct number(1-4) of team members excluding TL" });
        }
        const existingProjectId = await Project.findOne({"_id":_id});
        if (existingProjectId) {
            // If a project with the same _id and title exists, return a 400 status
            return res.status(400).json({ message: "Project with the same id already exists" });
        }
        const existingProjectTitle = await Project.findOne({"title":title});
        if (existingProjectTitle) {
            // If a project with the same _id and title exists, return a 400 status
            return res.status(400).json({ message: "Project with the same title already exists" });
        }
        const existingTeamLeaderName = await Project.findOne({
            "teamLeader.name": teamLeader.name
        });
        if (existingTeamLeaderName) {
            return res.status(400).json({ message: "Team leader with the same name already exists" });
        }
        const existingTeamLeaderMail = await Project.findOne({
            "teamLeader.mail": teamLeader.mail
        });
        if (existingTeamLeaderMail) {
            return res.status(400).json({ message: "Team leader with the same mail already exists" });
        }
        // Check if any team member has the same name and email
        const existingTeamMemberName = await Project.findOne({
            "teamMembers.name": { $in: teamMembers.map(member => member.name) }
        });
        if (existingTeamMemberName) {
            return res.status(400).json({ message: "Team member with the same name already exists" });
        }
        const existingTeamMemberMail = await Project.findOne({
            "teamMembers.mail": { $in: teamMembers.map(member => member.mail) }
        });
        if (existingTeamMemberMail) {
            return res.status(400).json({ message: "Team member with the same mail already exists" });
        }
        // If all checks pass, save the new project
        const newProject = new Project(req.body);
        await newProject.save();
        return res.status(201).json({ message: "Project Registration Successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Unable to create the registration" });
    }
};
export const getAllProjects=async(req,res,next)=>{
    try{
        await Project.find()
        .then((data)=>{
            if(data){
                res.send(data);
            }
            else{
                res.status(404).json({message:"No projects found!"});
            }
        });
    }
    catch(err){
        return console.log(err);
    }
};
export const getIdProjects=async(req,res,next)=>{
    try{
        const {_id}=req.body;
        await Project.findOne({"_id":_id})
        .then((data)=>{
            if(data){
                res.send(data);
            }
            else{
                res.status(404).json({message:"No projects found with that id!"});
            }
        });
    }
    catch(err){
        return console.log(err);
    }
};
export const getTitleProjects=async(req,res,next)=>{
    try{
        const {title}=req.body;
        await Project.findOne({"title":title})
        .then((data)=>{
            if(data){
                res.send(data);
            }
            else{
                res.status(404).json({message:"No projects found with that title!"});
            }
        });
    }
    catch(err){
        return console.log(err);
    }
};
export const getDomainProjects=async(req,res,next)=>{
    try{
        const {domain}=req.body;
        await Project.find({"domain":domain})
        .then((data)=>{
            if(data){
                res.send(data);
            }
            else{
                res.status(404).json({message:"No projects found with that domain!"});
            }
        });
    }
    catch(err){
        return console.log(err);
    }
};