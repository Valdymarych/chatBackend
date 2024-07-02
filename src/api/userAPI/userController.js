import config from "../../config/config.js"
import { User } from "../../models/User.js"
import userService from './userService.js'
import {validationResult} from 'express-validator'
import groupService from '../groupAPI/groupService.js'
const STATUSES=config.httpStatuses
class UserController {
    errorHandler(func) {
        return async (req,res)=>{
            try {
                return func(req,res)
            } catch (err) {
                res.status(STATUSES.SERVER_ERROR_500).json({done:false,message:"ERROR AT GROUP CONTROLLER"})
            }
        }
    }

    async createUser(req,res){
        let errors=validationResult(req)
        if (!errors.isEmpty()){
            return res.status(STATUSES.BAD_REQUEST_400).json({
                message: "BAD REQUEST",
                done: false,
                errors
            })
        }
        const {email, password, name} = req.body
        let {user,token} = await userService.createUser(email,password,name)
        if (!user){
            return res.status(STATUSES.ALREADY_EXIST_409).json({
                message: "USER WANSNT REGISTRED",
                done: false,
            })
        }
        return res.status(STATUSES.CREATED_201).json({
            message: "USER REGISTRATED",
            done: true,
            token:token,
            name: user.name,
            groups: user.groups,
            _id:user._id
        })
    }

    async login(req,res){
        let errors=validationResult(req)
        if (!errors.isEmpty()){
            return res.status(STATUSES.BAD_REQUEST_400).json({
                message: "BAD REQUEST",
                done: false,
                errors
            })
        }
        const {email, password} = req.body
        let [done,payload] = await userService.login(email,password)
        if (!done){
            if (payload==1){
                return res.status(STATUSES.NOT_FOUND_404).json({
                    message: "USER UNAUTHORIZED",
                    done: false,
                })
            }
            if (payload==2){
                return res.status(STATUSES.BAD_REQUEST_400).json({
                    message: "PASSWORD IS INCORRECT",
                    done: false,
                })
            }
        }

        let {user,token}=payload
        let groups = await groupService.getGroupsWithLastMessage(user._id)
        return res.status(STATUSES.OK_200).json({
            message: "USER FOUND",
            done: true,
            token:token,
            name: user.name,
            groups: groups,
            _id:user._id
        })
    }

    async auth(req,res){
        const userId=req.user._id
        let [user,groups]=await Promise.all([
            userService.auth(userId),
            groupService.getGroupsWithLastMessage(userId)
        ])

        if (!user) {
            return res.status(STATUSES.NOT_FOUND_404).json({
                message: "USER WAS DELETED",
                done: false
            })
        }
        
        return res.status(STATUSES.OK_200).json({
            message: "USER FOUND",
            done: true,
            _id: userId,
            name: user.name,
            groups: groups
        })
    }
}
const userController = new UserController()
export default userController

