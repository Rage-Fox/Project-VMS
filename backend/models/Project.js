import mongoose from "mongoose";
const Schema = mongoose.Schema;
const teamMemberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    }
});
const teamLeaderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    }
});
const projectSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    excludingTl: {
        type: Number,
        required: true
    },
    teamLeader: teamLeaderSchema,
    teamMembers: [teamMemberSchema],
    description: {
        type: String,
        required: true
    }
}, { collection: "project" });
export default mongoose.model("Project", projectSchema);
// project