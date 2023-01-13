const mongoose = require('mongoose');

const connectDB = async () => {

    console.log("The database connection url is", process.env.LOCAL_MONGODB_URI);
    try {
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB  successfully connected to ${connect.connection.host}`)
    } catch (error) {
        console.log('Connection could not be created, possible cause: ' + error.message);
    }

}

module.exports = connectDB;