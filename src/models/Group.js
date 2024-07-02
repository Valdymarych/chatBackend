import mongoose from "mongoose";

let GroupSchema = mongoose.Schema({
    owner: {type:mongoose.ObjectId, ref:"User",require:true},
    name: {type:String,require:true},
    joinLink: {type:String},
    messages: [{type:mongoose.ObjectId,ref:"Message"}],
    users: [{type:mongoose.ObjectId,ref:"User"}]
})

export let Group = mongoose.model("Group",GroupSchema)