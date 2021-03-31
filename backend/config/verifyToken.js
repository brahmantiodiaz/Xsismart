const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){
    try {
        const token = req.headers["x-access-token"] || req.body.token || req.query.token
        if (token) {
            jwt.verify(token, global.config.jwt_secret, (error, decode)=> {
                if (error) {
                    return res.send(403,{
                        success:false,
                        message: 'No authentication',
                        error:error
                    })
                }
                req.decode=decode;
                next();
            })
        } else{
            return res.send(403,{
                success:false,
                message:'token not found'
            })
        }
    } catch (error) {
        return res.send(403,{
            success:false,
            error:'token request'
        })
    }
}