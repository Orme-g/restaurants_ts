const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({

    name: {
        type: String,
        default: 'Гость'
    },
    topic: String,

    likes: Number,

    Dislikes: Number,

    text: String,

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment

// db.comments.insertMany([
//     {
//     name: 'Валерий',
//     topic: '651c175ad4a20ba01f0359f5',
//     likes: 0,
//     dislikes: 23,
//     createdAt: ISODate(),
//     text: 'Не люблю шаверму!'
//     },
//     {
//         name: 'Петр',
//         topic: '651d8e2a02b0256dc1e6ba09',
//         likes: 0,
//         dislikes: 1,
//         createdAt: ISODate(),
//         text: 'Не понравился сервис, но еда была хорошей'
//         },
//         {
//             name: 'Костя',
//             topic: '651d8e2a02b0256dc1e6ba09',
//             likes: 0,
//             dislikes: 0,
//             createdAt: ISODate(),
//             text: 'Прекрасный интерьер и вкусные блюда'
//             },
//             {
//                 name: 'Илья',
//                 topic: '651d8e2a02b0256dc1e6ba0a',
//                 likes: 0,
//                 dislikes: 1,
//                 createdAt: ISODate(),
//                 text: 'Неожиданно хороший ресторан, рекомендую попробовать'
//                 },
//                 {
//                     name: 'Вика',
//                     topic: '651d8e2a02b0256dc1e6ba0a',
//                     likes: 0,
//                     dislikes: 1,
//                     createdAt: ISODate(),
//                     text: 'Замечательное отношение персонала к гостям'
//                     },
//                     {
//                         name: 'Эшли',
//                         topic: '651d8e2a02b0256dc1e6ba0b',
//                         likes: 5,
//                         dislikes: 1,
//                         createdAt: ISODate(),
//                         text: 'Музыка выбрана на высшем уровне, а еда просто вкуснота'
//                         },
//                         {
//                             name: 'Катя',
//                             topic: '651d8e2a02b0256dc1e6ba0c',
//                             likes: 11,
//                             dislikes: 0,
//                             createdAt: ISODate(),
//                             text: 'Некоторые блюда были слишком острыми для моего вкуса'
//                             },
//                             {
//                                 name: 'Гоша',
//                                 topic: '651d8e2a02b0256dc1e6ba0c',
//                                 likes: 14,
//                                 dislikes: 0,
//                                 createdAt: ISODate(),
//                                 text: 'Обслуживание было несколько медленным, но в целом мне понравилось.'
//                                 },
// ])