const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")

const sessions = {}

function restrict() {
    const authError = { message: "Invalid Credentials" }
    return async (req, res, next) => {
        try {
            // const { username, password } = req.headers
            // if (!username, !password) {
            //     return res.status(401).json(authError)
            // }
            // const user = await Users.findBy({ username }).first()
            // //Is user exist
            // if (!user) {
            //     res.status(401).json(authError)
            // }

            // const passwordValid = await bcrypt.compare(password, user.password)
            // if (!passwordValid) {
            //     return res.status(401).json(authError)
            // } 
            // const {cookie} = req.headers
            // if (!cookie) {
            //     return res.status(401).json(authError)
            // }

            // const authToken = cookie.replace("token=", "")
            // if (!sessions[authToken]) {
            //     return res.status(401).json(authError) 
            // }
            if (!req.session || !req.session.user) {
                return res.status(401).json(authError)
            }


            next()
            
        }
        catch (err) {
            next(err)
        }
    }
}


module.exports = {
    sessions,
    restrict,
}