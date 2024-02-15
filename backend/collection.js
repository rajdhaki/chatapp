const mongoose = require('mongoose')

const userScema = new mongoose.Schema({
    fname: {
        type: String,
        require: true,
        min: 2,
    },

    lname: {
        type: String,
        require: true,
        min: 2,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
        min: 6,
    },
},

)



const chatApplication = new mongoose.model("chatApplication", userScema)

module.exports = chatApplication


