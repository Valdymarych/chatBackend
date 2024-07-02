import mongoose from "mongoose";

let UserSchema = mongoose.Schema({
    name: {type:String,require:true},
    email: {type:String,unique:true,require:true},
    password: {type:String,require:true},
    groups: [{type:mongoose.Schema.Types.ObjectId,ref:"Group"}]
})

export let User = mongoose.model("User",UserSchema)