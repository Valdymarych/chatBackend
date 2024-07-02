import fs from 'fs'
import {File} from "../../models/File.js"
import {User} from "../../models/User.js"
import config from "../../config/config.js"
class FileService {
    async initDir(user) {
        let path=`${config.uploadsPath}\\${user._id}`
        fs.mkdirSync(path)
        return true
    }

    async uploadFile(userId,file) {
        let path = `${config.uploadsPath}\\${userId}\\${file.name}`
        let link = `${config.API_url}/files/${userId}/${file.name}`
        let fileType = file.name.split(".").pop()
        let fileDb = new File({
            name: file.name,
            type: fileType,
            size: file.size,
            path: path,
            user: userId,
            link: link
        })
        path = `${config.uploadsPath}\\${userId}\\${fileDb._id}.${fileType}`
        link = `${config.API_url}/files/${userId}/${fileDb._id}.${fileType}`
        file.mv(path)
        fileDb.path=path;
        fileDb.link=link;
        await fileDb.save()
        return fileDb;
    }
}

const fileService = new FileService()

export default fileService;