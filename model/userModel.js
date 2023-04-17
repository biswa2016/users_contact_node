const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email name"],
        unique: [
            true,
            "email id alredy taken"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add the password"],
    },
}, {
    timestamps: true
})


module.exports = mongoose.model("User", userSchema);