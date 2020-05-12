const express = require("express")
const router = express.Router()
const Users = require("../users/users-model")
const bcrypt = require("bcryptjs")
const { sessions, restrict } = require("../middleware/restrict")
router.post("/register", async (req, res, next) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password
        }
        //------HASHING PASSWORD------\\
        user.password = await bcrypt.hash(user.password, 14)

        const isUserExist = await Users.findBy({ username: req.body.username }).first()
        console.log("This is isUserExist:", isUserExist)

        if (isUserExist) {
            return res.status(409).json({
                message: "Username is taken. Please input another one."
            })
        }

        const userAdd = await Users.add(user)
        res.status(201).json(userAdd)
    }
    catch (err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    const authError = { message: "Invalid Credentials" }
    try {
        const {username, password} = req.body
        const user = await Users.findBy({ username: req.body.username }).first()
        if (!user) {
            res.status(401).json(authError)
        }
        const passwordValid = await bcrypt.compare(req.body.password, user.password)
        if (!passwordValid) {
            return res.status(401).json(authError)
        }
        // const authToken = Math.random()
        // sessions[authToken] = user.id
        // res.setHeader("Set-Cookie", `token=${authToken}; Path=/`)
        req.session.user = user
        res.json({
            message: `Welcome ${user.username}`
        })
    }
    catch (err) {
        next(err)
    }
})
    router.get("/logout", restrict(), (req, res, next) => {
        req.session.destroy((err) => {
            if (err) {
                next(err)
            } else {
                res.json({
                    message: "Successfully logged out",
                })
            }
        })
    })



module.exports = router