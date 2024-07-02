import jwt from "jsonwebtoken"
import config from "../config/config.js"

const STATUSES=config.httpStatuses
const authMiddleware = (req,res,next)=>{
    try {
        if (req.method==="OPTIONS") {
            return next()
        }
        const token=req.headers.authorization.split(" ")[1]
        if (!token){
            return res.status(STATUSES.UNAUTHORIZED_401).json({
                done:false,
                message: "you must login first"
            })
        }
        const decoded = jwt.verify(token,config.secretKey_JWT)
        req.user=decoded;
        next()
    } catch (err) {
        return res.status(STATUSES.UNAUTHORIZED_401).json({
            done:false,
            message: "auth middleware error"
        })
    }
}

export default authMiddleware