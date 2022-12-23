const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    address: {
        type: String
    },
    email: {
        required: true,
        type: String
    },
    role: {
        type: String
    },
    urlImg: {
        type: String
    },
    dateCreate: {
        type: String
    },
    Cart: {
        type: [[Object, Number]]
    },


})

module.exports = mongoose.model('DataUser', dataSchema)