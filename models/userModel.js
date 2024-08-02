const mongoose = require('mongoose')
const {mongo} = require("mongoose");

const userSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true
        },
        username : {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        member_since: {
            type: String,
            required: true,
        }
    } ,
    {
        timestamps: true
    }
)



const User = mongoose.model('User', userSchema);

module.exports = User;