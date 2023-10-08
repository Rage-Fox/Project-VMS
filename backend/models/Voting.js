import mongoose from "mongoose";
const Schema=mongoose.Schema;
const votingSchema=new Schema({
    _id:{
        type:String,
        required:true
    },
    team:{
        type:String,
        required:true
    }
},{collection:"voting"});
export default mongoose.model("Voting",votingSchema);
// voting