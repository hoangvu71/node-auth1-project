const express = require("express")
const server = express()
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const secret = require("dotenv").config()
const port = 5000
const authRouter = require("./auth/auth-router")
const userRouter = require("./users/users-router")
const dbConfig = require("./data/config")
server.use(express.json())

server.use(session({
    name: "token",
    resave:false, //avoid creating sessions that have not changed
    saveUninitialized: false, //GDPR laws against setting cookie automatically
    secret: process.env.COOKIE_SECRET,
    cookie: {
        // maxAge: 15 * 1000
        httpOnly: true,
    },
    store: new KnexSessionStore({
        createtable: true, // If the session table doesn't exist, create it automatically
        knex: dbConfig,
    })
}))

server.get("/", (req, res) => {
    res.json({
        message: "First step done!"
    })
})

server.use("/auth", authRouter)
server.use("/users", userRouter)

server.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`)
})