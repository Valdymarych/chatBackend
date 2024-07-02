import config from "../../config/config.js"
import { User } from "../../models/User.js"
import groupService from './groupService.js'
const STATUSES=config.httpStatuses
class GroupController {
    errorHandler(func) {
        return async (req,res)=>{
            try {
                return func(req,res)
            } catch (err) {
                res.status(STATUSES.SERVER_ERROR_500).json({done:false,message:"ERROR AT GROUP CONTROLLER"})
            }
        }
    }
    

    async getAllGroups(req,res) {
        let groups=await groupService.getGroupsWithLastMessage(req.user._id)
        return res.status(STATUSES.OK_200).json({
            done:true,
            groups:groups,
            message:"GROUPS FOUND"
        })
    }

    async getGroupById(req,res) {
        let groupId = req.params.id;
        let userId = req.user._id
        let group = await groupService.getGroupById(userId,groupId)
        return res.status(STATUSES.OK_200).json({
            done:true,
            group:group,
            message:"GROUP FOUND",
        })
    }

    async createGroup(req,res) {
        let userId = req.user._id
        let group = await groupService.createGroup(userId,req.body.name)
        return res.status(STATUSES.CREATED_201).json({
            done:true,
            group:group,
            message:"GROUP CREATED",
            joined:true
        })
    }

    async deleteGroupById(req,res) {
        let userId = req.user._id
        let groupId = req.params.id;
        let {done, message, group} = await groupService.deleteGroupById(userId,groupId)
        if (!group) {
            return res.status(STATUSES.OK_200).json({
                done:done,
                message:message,
            })

        } 
        return res.status(STATUSES.DELETED_200).json({
            done:done,
            group:group,
            message:message,
        })
    }

    async postMessage(req,res) {
        let userId = req.user._id
        let type=req.body.type
        let payload=req.body.payload
        let groupId=req.params.id
        let message= await groupService.postMessage(userId,groupId,type,payload)
        return res.status(STATUSES.CREATED_201).json({
            done:true,
            message:message,
            log:"message posted",
        })
    }

}
const groupController = new GroupController()
export default groupController

