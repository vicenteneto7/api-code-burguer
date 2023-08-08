import jwt from 'jsonwebtoken'
import AuthConfig from '../../config/auth'

export default (request, response, next) => {
    const authToken = request.headers.authorization
    
    if(!authToken){
        return response.status(401).json({ error: 'Token not provied' })
    }

    const token = authToken.split(' ')[1]
    
    try {
        jwt.verify(token, AuthConfig.secret, function (err, decoded){
            if(err) {
            throw new Error()
            }
              
            request.userId = decoded.id

            return next()
        })
    } catch(err) {
        return response.status(401).json({ error: 'Token is invalid'})
    }
}