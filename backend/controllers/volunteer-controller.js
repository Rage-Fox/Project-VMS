import Volunteer from "../models/Volunteer";
import bcrypt from "bcryptjs";
export const login=async(req,res,next)=>{
    const {_id,password}=req.body;
    let existingUser;
    try{
        existingUser=await Volunteer.findOne({"_id":_id});
    }
    catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message:"Volunteer not found!"});
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password!"});
    }
    return res.status(200).json({message:"Login successful!"});
};
export const register=async(req,res,next)=>{
    const{_id,name,mail}=req.body;
    let existingId,existingName,existingMail;
    try{
        existingId=await Volunteer.findOne({"_id":_id});
        existingName=await Volunteer.findOne({"name":name});
        existingMail=await Volunteer.findOne({"mail":mail});
        if(existingId){
            return res.status(404).json({message:"Volunteer Id already exists!"});
        }
        if(existingName){
            return res.status(404).json({message:"Volunteer name already exists!"});
        }
        if(existingMail){
            return res.status(404).json({message:"Volunteer mail already exists!"});
        }
        else{
            const password=req.body.password;
            req.body.password=bcrypt.hashSync(password);
            await Volunteer.create(req.body)
            .then((data)=>{
                res.status(201).send(data);
            }).catch((err)=>{
                res.status(404).json({message:"Volunteer registration data not inserted!"});
            });
        }
    }
    catch(err){
        return console.log(err);
    }
};
export const getAllRegistrations=async(req,res,next)=>{
    try{
        await Volunteer.find()
        .then((data)=>{
            if(data){
                res.send(data);
            }
            else{
                res.status(404).json({message:"No volunteers found!"});
            }
        });
    }
    catch(err){
        return console.log(err);
    }
};
export const resetVolunteerPassword=async(req,res,next)=>{
    const {_id,password}=req.body;
    const hashedPassword=bcrypt.hashSync(password);
    let existingUser;
    try{
        existingUser=await Volunteer.findById(_id);
    }
    catch(err){
        return console.log(err);
    }
    if(existingUser){
        existingUser.password=hashedPassword;
        await existingUser.save();
    }
    return res.status(200).json({message:"New volunteer password resetted successfully!"});
};