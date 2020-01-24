const mongoose = require('mongoose')
const User = require('./User')
const accountSchema = new mongoose.Schema({
    currency: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: Number,
        required: true,
        trim: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})
const Account = mongoose.model('Account', accountSchema)
module.exports = Account