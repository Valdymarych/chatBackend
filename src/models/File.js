import mongoose from "mongoose";

let FileSchema = mongoose.Schema({
    name: {type:String,require:true},
    type: {type:String,require:true},  // " txt |  jpeg  | png  | mp4 "
    size: {type:Number,default:0}, 
    path: {type:String,default:""},
    owner: {type:mongoose.ObjectId,ref:"User", require:true},
    link: {type:String,require:true}
})

export let File = mongoose.model("File",FileSchema)