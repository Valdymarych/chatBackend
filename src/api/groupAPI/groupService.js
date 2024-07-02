import {File} from "../../models/File.js"
import {User} from "../../models/User.js"
import {Group} from "../../models/Group.js"
import {Message} from "../../models/Message.js"
import config from "../../config/config.js"
import mongoose from "mongoose"
class GroupService {

    async getGroupsWithLastMessage(userId) {
        let user = await User.findById(userId,{groups:1}).populate(
            {
                path:"groups",
                select:["name","messages","owner"],
                populate:{
                    path:"messages",
                    perDocumentLimit:1,
                    options:{
                        sort: {
                            _id:-1
                        }
                    }
                }
            }
        );
        
        let groups=user.groups
        for (let i=0; i<user.groups;i++){
            groups[i].owner=groups[i].owner===userId
        }

        return groups
    }

    async getGroupById(userId,groupId) {
        let [group,_] = await Promise.all([
            Group.findByIdAndUpdate(groupId,{$addToSet: {users:userId}},{name:1, messages:1,_id:1,owner:1}).populate(
                {
                    path: "messages",
                    perDocumentLimit:50,
                    options:{
                        sort: {
                            _id:-1
                        }
                    },
                    populate: {
                        path: "owner",
                        options: {
                            select: {
                                name:1,
                                _id:1
                            }
                        }
                    }
                }
            ),
            User.findByIdAndUpdate(userId,{$addToSet: {groups:groupId}})]
        )
        
        group.owner=group.owner.toString()===userId

        return group
    }

    async createGroup(userId,groupName){
        let group = new Group({
            owner:userId,
            messages: [],
            name: groupName,
            users: [userId]
        })
        group.joinLink = config.API_url+`/groups/${group._id}`
        await Promise.all([
            group.save(),
            User.findByIdAndUpdate(userId,{$push: {groups:group._id}})
        ])
        return group;
    }

    async deleteGroupById(userId,groupId) {
        
        let group=await Group.findById(groupId,{users:1,owner:1})
        if (!group) {
            return {done:true, message:"GROUP ISNT EXIST"}
        }
        let users=group.users
        let owner=group.owner
        if (owner.toString()===userId){
            await Promise.all([
                await User.updateMany({_id:{$in:users}},{$pull:{groups:groupId }},{multi:true}),
                await Group.findByIdAndDelete(groupId)
            ])
            return {done:true, message:"GROUP DELETED", group:group}
        } else {
            return {done:false, message:"USER IS NOT OWNER"}
        }
    }

    async postMessage(userId,groupId,type,payload){
        let message = new Message({
            owner:userId,
            payload: payload,
            type:type,
            group: groupId
        })

        await Promise.all([
            Group.findByIdAndUpdate(groupId,{$push: {messages:message._id}}),
            message.save()
        ])

        return message;
    }
}

const groupService = new GroupService()

export default groupService;