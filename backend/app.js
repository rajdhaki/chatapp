const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const cors = require("cors")
const dotenv = require("dotenv")
const dbconnect = require('./connection')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


dotenv.config()
dbconnect()

const PORT = process.env.PORT || 8000
const chatApplication = require("./collection")
const g_Post = require('./g_postCollection')
const c_Post = require('./c_postCollection')
const gen_Post = require('./gen_postCollection')
const Post = require('./postCollection')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static('uploads'))

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on("joinRoom", (room) => socket.join(room))

    socket.on('newMsg', ({ newMsg, room }) => {
        console.log(room, newMsg)
        io.in(room).emit("latestMsg", newMsg)
    })
});


app.get('/', (req, res) => {
    res.send("Hello there")
})


// Creating user account 

app.post('/creatUser', (req, res) => {

    const User = new chatApplication(req.body)
    User.save().then(() => { res.status(201); console.log(User) }).catch((e) => res.status(400))
    res.send(User)

})

app.get('/creatUser', async (req, res) => {
    try {
        const getUser = await chatApplication.find()
        res.send(getUser)

    } catch (error) {
        console.log(error)
    }

})

// Craeting user login details

app.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await chatApplication.findOne({ email: email });
        console.log(user)

        if (user.password === password) {
            console.log("login");
            return res.send({ "message": "login successfully" });
        }
        else {
            console.log("password is wrong");

            return res.status(404).send("password is wrong");

        }

    } catch (e) {
        console.log(e)
        res.status(404).send("User Not Found")
    }
})

app.get('/post', async (req, res) => {
    try {
        const getData = await Post.find()
        res.send(getData)
    } catch (error) {
        console.log(error)
    }
})

app.get('/store/gaming', async (req, res) => {
    try {
        const getData = await g_Post.find()
        res.send(getData)
    } catch (error) {
        console.log(error)
    }
})

app.get('/store/coding', async (req, res) => {
    try {
        const getData = await c_Post.find()
        res.send(getData)
    } catch (error) {
        console.log(error)
    }
})

app.get('/store/general', async (req, res) => {
    try {
        const getData = await gen_Post.find()
        res.send(getData)
    } catch (error) {
        console.log(error)
    }
})


app.post('/post', upload.single('img'), async (req, res) => {
    console.log(req.file, req.body)

    try {
        const title = req.body.title
        const desc = req.body.desc
        const category = req.body.category
        const imgUrl = req.file.path
        const price = req.body.price

        if (!title || !desc || !imgUrl) {
            return res.send({ code: 400, message: "bad boy" })
        }
        const newPost = new Post({ title, desc, category, imgUrl, price })
        const sucess = await newPost.save()
        console.log(sucess, 116)
        res.send(sucess)

        if (category === "gaming") {
            const newPost = new g_Post({ title, desc, category, imgUrl, price })
            const sucess = await newPost.save()
            console.log(sucess, 164)
        }

        if (category === "coding") {
            const newPost = new c_Post({ title, desc, category, imgUrl, price })
            const sucess = await newPost.save()
            console.log(sucess, 170)
        }

        if (category === "general") {
            const newPost = new gen_Post({ title, desc, category, imgUrl, price })
            const sucess = await newPost.save()
            console.log(sucess, 175)
        }

    }
    catch (error) {
        console.log(error)
    }
})



server.listen(PORT, () => console.log(`app is listen at ${PORT}`))

