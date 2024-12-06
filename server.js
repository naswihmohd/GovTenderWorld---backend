const express = require ( 'express')
const userRouter = require('./router/userRouter')
const adminRouter= require('./router/adminRouter')
const emailRouter = require('./router/emailRoutes')
const authorityRouter = require('./router/authorityRouter')
const dbConnection = require('./Config/dbConfig')
const cookie = require('cookie-parser')
require('dotenv').config()
const cors = require ('cors')


const app = express()
dbConnection()

app.use(cors({origin:'http://localhost:3000', credentials:true}))
app.use(cookie())

app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use('/email',emailRouter)
app.use('/authority',authorityRouter)


app.listen(4000,()=>{
    console.log('server is running');
})