import Voting from "../models/Voting";
import Volunteer from "../models/Volunteer";
import Project from "../models/Project";
export const vote=async(req,res,next)=>{
    try{
        let existingId;
        const {_id,team}=req.body;
        existingId=await Volunteer.findOne({"_id":_id});
        if(existingId){
            let existingVote;
            existingVote=await Voting.findOne({"_id":_id});
            if(!existingVote){
                let existingTeam=await Project.findOne({"_id":team});
                if(!existingTeam){
                    return res.status(404).json({message:"Project team doesn't exist!"});
                }
                else{
                    await Voting.create(req.body)
                    .then((data)=>{
                        res.status(201).json({message:"Voting successfully done!"});
                    }).catch((err)=>{
                        res.status(404).json({message:"Voting data not inserted!"});
                    });
                }
            }
            else{
                return res.status(404).json({message:"Volunteer has already voted!"});
            }
        }
        else{
            return res.status(404).json({message:"Volunteer data not found!"});
        }
    }
    catch(err){
        return console.log(err);
    }
};
export const getAllVotings=async(req,res,next)=>{
    try{
        await Voting.find()
        .then((data)=>{
            if(data){
                res.send(data);
            }
            else{
                res.status(404).json({message:"No votings found!"});
            }
        });
    }
    catch(err){
        return console.log(err);
    }
}