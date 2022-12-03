
import mongoose from 'mongoose'
import config from './config'

(async () => {
    try {
        //BD CLOUD 
        const db = await mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.onawl.mongodb.net/${config.MONGO_DATABASE}`, { autoIndex: false });
        console.log('La bd se conectada a:', db.connection.name)
    } catch (error) {
        console.error(error)
    }
})()