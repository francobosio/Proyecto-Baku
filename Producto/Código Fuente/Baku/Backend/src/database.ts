
import mongoose from 'mongoose'
import config from './config'

(async () => {
    try {
        //BD CLOUD 
        const db = await mongoose.connect(`mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@cluster0.onawl.mongodb.net/${config.MONGO_DATABASE}`);
        //BD LOCAL
        //const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`);
   console.log('La bd se conectada a:', db.connection.name)
    } catch (error) {
        console.error(error)
    }
})()