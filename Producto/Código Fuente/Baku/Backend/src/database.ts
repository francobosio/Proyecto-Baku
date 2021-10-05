
import mongoose from 'mongoose'
import config from './config'

(async () => {
    try {
   const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`);
   console.log('La bd se conectada a:', db.connection.name)
    } catch (error) {
        console.error(error)
    }
})()