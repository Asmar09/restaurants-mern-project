
const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config/keys')


exports.authenticateJWT = (req,res,next) =>{
     
    const token = req.cookies.token
   if(!token){
      return res.status(401).json({
           errorMessage: 'Authentication denied'
       })
   }

   try{
       const decode = jwt.verify(token , jwtSecret)
   req.user = decode.user
   next()
   }catch(error){
       console.log("jwt error" , error);
       res.status(401).json({
        errorMessage: 'Invalid token'
    })
   } 
}

