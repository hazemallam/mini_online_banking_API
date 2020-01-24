const express = require('express')
const Account = require('../models/Account')
const auth = require('../middleware/auth')
const router = new express.Router()

//create account for specified user
router.post('/account', auth, async(req, res)=>{
    const account = new Account({... req.body, userID:req.user._id})
    try{
        await account.save()
        res.send(account)
    }
    catch(e){
        res.send(e)
    }
})
//get all acounts that belongs to the user who login
router.get('/account', auth, async(req, res)=>{
    const account = await Account.find({userID: req.user._id}).sort({description:1})
    res.send(account)
})
 
module.exports = router