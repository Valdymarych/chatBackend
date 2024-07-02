import mongoose from "mongoose";
import config from './config/config.js'
export let connectToMongoDB = () => {

    const uri = config.mongoURI
    
    const conn = mongoose
        .connect(uri)
        .then(() => console.log( "mongodb connected" ))
        .catch(() => console.log( "mongodb error !!!!" ))

    return conn
}
