const express = require('express')
const cors = require('cors')
require('./db/mongoose')
//routes
const userRouter = require('./routes/user')
const accountRouter = require('./routes/account')
const app = express()
app.use(cors())
port = process.env.PORT || 5000
app.use(express.json())
//use routes
app.use(userRouter)
app.use(accountRouter)
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})