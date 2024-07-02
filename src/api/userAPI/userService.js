import {File} from "../../models/File.js"
import {User} from "../../models/User.js"
import {Group} from "../../models/Group.js"
import config from "../../config/config.js"
import jwt from 'jsonwebtoken'
import fileService from '../fileAPI/fileService.js';
import bcrypt from 'bcryptjs'

class UserService {
    async createUser(email,password,name){
        const candidate = await User.findOne({email})
        if (candidate) {return false}
        let hashedPassword = await bcrypt.hash(password, config.userPasswordSaltLength)
        let user = new User({
            email: email,
            password: hashedPassword
        })

        await user.save();
        await fileService.initDir(user);
        let token = userService.getToken(user);
        return {user, token}
    }

    async login(email,password) {
        const user = await User.findOne({email})
        if (!user) {return [false,1]}
        if (!await bcrypt.compare(password,user.password)){return [false,2]}
        let token = userService.getToken(user)
        return [true,{user,token}]
    }

    async auth(_id) {
        const user = await User.findById(_id)
        return user
    }

    getToken(user){
        return jwt.sign({_id:user._id.toString()},config.secretKey_JWT,{expiresIn: "1h"})
    }
}

const userService = new UserService()

export default userService;