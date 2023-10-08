import mongoose from "mongoose";
const Schema=mongoose.Schema;
const volunteerSchema=new Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{collection:"volunteer"});
export default mongoose.model("Volunteer",volunteerSchema);
// volunteer