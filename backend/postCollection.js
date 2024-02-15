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

const Post = new mongoose.model("post", postScema)


module.exports = Post
