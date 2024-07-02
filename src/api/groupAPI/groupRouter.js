import Router from 'express'
import config from '../../config/config.js';
import groupController from './groupController.js'
import authMiddleware from '../../middlewares/authMiddleware.js'

let groupRouter = new Router()

groupRouter.get("",authMiddleware,groupController.errorHandler(groupController.getAllGroups))

groupRouter.get("/:id",authMiddleware,groupController.errorHandler(groupController.getGroupById))

groupRouter.post("",authMiddleware,groupController.errorHandler(groupController.createGroup))

groupRouter.delete("/:id",authMiddleware,groupController.errorHandler(groupController.deleteGroupById))

groupRouter.post("/:id",authMiddleware,groupController.errorHandler(groupController.postMessage))

export default groupRouter