import fs from 'fs'
import {File} from "../../models/File.js"
import {User} from "../../models/User.js"
import config from "../../config/config.js"
import fileService from './fileService.js'
const STATUSES=config.httpStatuses
class FileController {
    errorHandler(func) {
        return async (req,res)=>{
            try {
                return func(req,res)
            } catch (err) {
                res.status(STATUSES.SERVER_ERROR_500).json({done:false,message:"ERROR AT GROUP CONTROLLER"})
            }
        }
    }
    async uploadFile(req,res) {
        const file = req.files.file;
        const userId =  req.user._id
        let fileDb=await fileService.uploadFile(userId,file)
        res.status(STATUSES.CREATED_201).json({
            done:true,
            message: "FILE UPLOADED",
            _id: fileDb._id,
            name: fileDb.name,
            link: fileDb.link
        })
    }

}

const fileController = new FileController()

export default fileController