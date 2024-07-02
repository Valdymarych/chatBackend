import mongoose, { isObjectIdOrHexString } from "mongoose";

let MessageSchema = mongoose.Schema({
    type: {type:String,require:true},//"text" | "image"  | "file"
    payload: {type:mongoose.Schema.Types.Mixed,require:true}, // ObjectId or text
    owner : {type:mongoose.ObjectId, ref:"User", require:true },
    group : {type:mongoose.ObjectId, ref:"Group", require:true}
})

export let Message = mongoose.model("Message",MessageSchema)