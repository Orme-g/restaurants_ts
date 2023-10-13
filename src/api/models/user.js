
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        // unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: String,

    password: {
        type: String,
        required: true
    }, 
    email: {
        type: String
    },
    role: {
        type: String, 
        default: 'User'
    },

    birthday: Date,

    registeredAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User