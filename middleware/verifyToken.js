const jwt = require ('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.cookies.accessToken

    if(token){
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(!err){
                req.user= user
                next()
            }else{
                res.status(401).json({message:"access denied"})
            }
        })
    }else{
        res.status(401).json({message:"access denied"})
    }
}

module.exports= verifyToken