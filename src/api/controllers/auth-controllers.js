
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') 
const {secret} = require('../config')


const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

// const handleError = (res, error) => {
//     res.status(500).json({error})
// }


const getUsers = (req, res) => {
    User
        .find()
        .then((data) => {
            res.status(200).json(data)
        })
        
}

const registration = async(req, res) => {
    try {
        const {username, password} = req.body
        const newUser = await User.findOne({username})
        if (newUser) {
            return res.status(400).json('Пользователь с таким именем уже существует')
        }
        const hashPassword = bcrypt.hashSync(password, 7)
        const user = new User({...req.body, password: hashPassword})
        user
            .save()
            .then(res.status(200).json({message:'Регистрация прошла успешно'}))
    } catch(err) {
        res.status(500).json(`Ошибка регистрации ${err}`)
    }
}


const login = async (req, res) => {

    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user) {
            return res.status(400).json('Пользователь не найден')
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) {
            return res.status(400).json('Неправильный пароль')
        }
        const {name} = user
        const token = generateAccessToken(user._id)
        return res.status(200).json({token, name, username, message: `Здравствуйте, ${name}`})
    } catch(err) {
        res.status(500).json(`Ошибка входа ${err}`)
    }
    
            

}

module.exports = {
    getUsers,
    registration,
    login
}