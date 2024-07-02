import Router from 'express'
import config from '../../config/config.js';
import fileController from './fileController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

let fileRouter = new Router()
 
fileRouter.post("",authMiddleware,fileController.errorHandler(fileController.uploadFile))

 
export default fileRouter