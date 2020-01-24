const express = require('express')
const User = require('./../models/User')
const router = new express.Router()
counter = 3
router.post('/signup', async(req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    }
    catch(error){
        res.status(400).send(error)
    }
})
router.post('/login', async(req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        counter = 3
        const token = await user.generateAuthToken()
        res.status(200).send('login successfully')
    }
    catch(error){
        // res.status(400).send('unauthorized')
        counter--
        if (counter >0){
            res.send(`account will block after ${counter} trials`)
        }else{
            res.send('account blocked')
        }
    }
})
//get my profile using auth token
router.get('/myprofile', auth, async(req, res)=>{
    res.send(req.user)
})

// logout from all devices
router.post('/logoutAll', auth, async(req, res)=>{
    try {   
        req.user.tokens = []
        await req.user.save()
        res.send('logout from all devices successfully')
        
    } catch (error) {
        res.send(error)
    }
})

//logout from single device
router.post('/logout', auth, async(req, res)=>{
    try {
            req.user.tokens = req.user.tokens.filter((tok)=>{
                return tok.token != req.token
            })
            await req.user.save()
            res.send('logout successfully')
    } catch (error) {
        res.send(error)
    }
})


module.exports = router