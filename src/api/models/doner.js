const mongoose = require('mongoose')

const Schema = mongoose.Schema

const donerSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },

    rating: Number,

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },

    images: [String],
    
    title_image: {
        type: String,
        required: true
    },
    subtitle: String,
    text: String,
    bloquote: String,
    author: String,

    
})

const Doner = mongoose.model('Doner', donerSchema)

module.exports = Doner

