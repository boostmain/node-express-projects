require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const mainRouter = require('./routes/main')
// const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1',mainRouter)

// app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.port || 5000

const start = async()=>{
    try{
        app.listen(port , console.log(`server listening on port ${port}`))
    }
    catch(error){
        console.log(error)
    }
}

start()