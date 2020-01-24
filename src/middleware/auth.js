const jwt = require('jsonwebtoken')
const User = require('../models/User')
const adminAuth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'myToken')
        const user = await User.findOne({_id:decoded._id, 'tokens.token':token})
        if(!user)
        throw new Error()
        req.token = token
        req.user =  user
        next()

    }
    catch(e){
        res.send({error: 'unauthorized'})

    }
}
module.exports = adminAuth