const mongoose = require("mongoose");

const connnectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database conected", connect.connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connnectDb;