const {verify} = require('../Helpers/Jwt')
const Models = require('../models/index')

async function authenticationMiddleware (req, res, next){
   try {
     const authHeader = req.get("x-access-token")
    if(!authHeader) return res.status(401).json({
      message : "You are not authenticated"
    })
    const {id, email } = verify(authHeader)
    const User = await Models.User.findOne({ where: { id, email }, attributes : ['id', 'email']})
    if(!User) return res.status(403).json({
      message : "Token is not valid!"
    })
    req.user = {id, email}
    next()
   } catch (err) {
    return res.status(500).json(`${err.message}. Please try again`)
   }
}

module.exports = authenticationMiddleware