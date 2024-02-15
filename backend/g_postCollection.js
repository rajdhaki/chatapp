const mongoose = require('mongoose')


const postScema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    desc:{
        type: String,
        require: true,
    },
    category: String,
    imgUrl: String,
    price: Number,

})

const g_Post = new mongoose.model("store/gaming", postScema)

module.exports = g_Post
