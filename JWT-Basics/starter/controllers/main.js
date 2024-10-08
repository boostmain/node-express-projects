// check username, password in post(login) request
// if exist create new JWT 
// send back to front-end
// setup authenthication so only the request with JWT can access the dashbord 

require('dotenv').config()
const jwt = require('jsonwebtoken')



const CustomAPIError = require('../errors/custom-error')

const login = async(req,res)=>{
    const {username , password} = req.body
    
    //mongoose validation
    //Joi
    //check in the controller 

    if(!username || !password){
        throw new CustomAPIError('Please provide email and password' , 400)     
    }

    //just for demo, normally provided by DB !!!
    const id = new Date().getDate() 


    //try to keep payload small, better experience for user
    //just for demo, in production use long, complex and unguessable string value !!!!(JWT_SECRET)
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})

    res.status(200).json({msg : 'user created', token})
}
 
const dashbord = async(req,res)=>{
    console.log(req.user)

    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json( { msg : `Hello ${req.user.username}`  , secret : `Here is your authorized data , your lucky number is ${luckyNumber}`})


}

module.exports = {login , dashbord}