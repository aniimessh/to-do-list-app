const mongoose  = require("mongoose");

const connectToDatabase = (req, res) => {
    try{
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database Succesfully")
    }catch(error){
        console.log("Failed to connect Database");
        console.log(error.message)
    }
}

module.exports = connectToDatabase
