

const User = require('../models/User')
const bcrypt  = require('bcryptjs')

exports.signupController = async (req,res) =>{

    const {username , email, password} = req.body
  try{
         const user = await User.findOne({email})
           if(user){
               return res.status(400).json({
                   errorMessage: 'Email is already exist'
               })
           }
            const newUser = new User()
            newUser.username = username
            newUser.email = email

            const salt = await bcrypt.genSalt(10)
            newUser.password = await bcrypt.hash(password, salt)

            await newUser.save()

            res.json({
                successMessage: "Register Successfully.. Now go to SignIn"
            })

  }catch(error){
        console.log("Server Error while creating new user" , error);
        res.status(500).json({
            errorMessage: "Server Error while creating new user"
        })
  }
}