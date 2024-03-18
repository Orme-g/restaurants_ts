const express = require("express")

const { registration, login, getUsers, changePassword } = require("../controllers/auth-controllers")

const router = express.Router()

router.post("/register", registration)
router.post("/login", login)
router.get("/users", getUsers)
router.patch("/profile", changePassword)

module.exports = router
