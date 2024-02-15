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

const c_Post = new mongoose.model("store/coding", postScema)

module.exports = c_Post
