import { app } from './app.js'
import { connectToMongoDB } from './mongodbConnection.js'
import config from './config/config.js'
const PORT = config.serverPort

connectToMongoDB()

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
}) 