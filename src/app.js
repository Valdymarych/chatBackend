import express from 'express';
import { Message } from './models/Message.js';
import cors from 'cors';
import config from './config/config.js';
import userRouter from './api/userAPI/userRouter.js';
import groupRouter from './api/groupAPI/groupRouter.js';
import fileUpload from 'express-fileupload'
import fileRouter from './api/fileAPI/fileRouter.js';
const STATUSES = config.httpStatuses
export let app = express()


const corsOptions = config.corsOptions

app.use(fileUpload({}))
app.use(cors(corsOptions))
app.use(express.json())

app.use('/user',userRouter)
app.use('/groups',groupRouter)
app.use('/file',fileRouter)
