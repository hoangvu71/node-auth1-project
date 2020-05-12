const db = require("../data/config")

module.exports = {
    add,
    find,
    findBy
}

function add(user) {
    return db("users").insert(user)
}

function find() {
    return db("users").select("id", "username")
}

function findBy(user) {
    return db("users").where(user).first()
}