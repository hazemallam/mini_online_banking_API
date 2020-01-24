const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Account = require('./Account')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim : true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('not valid email')
            }
            
        }
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    type:{
        type: Number,
        default:1
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]


    
},{ timestamps: { createdAt: 'created_at' } })

//relation
userSchema.virtual('account', {
    ref:'Account',
    localField:'_id',
    foreignField:'userID'
})

//generate token for each new user
userSchema.methods.generateAuthToken= async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'myToken')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
//check validation for email and password used for logging
userSchema.statics.findByCredentials = async(email, password) =>{
    const user = await User.findOne({email})
    if(!user)
    throw new Error ('email not found')
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch)
    throw new Error('password error')
    return user
}
//encrpt password for each modify
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password'))
    user.password = await bcrypt.hash(user.password, 9)
    next()
})
const User = mongoose.model('User', userSchema)
module.exports = User