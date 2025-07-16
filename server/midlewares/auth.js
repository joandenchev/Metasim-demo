import {verifyAccessToken} from "../services/tokens.js";


export function authenticate(req, res, next){
    const token = req.headers.authorization.split(' ')[1]
    req.userId = verifyAccessToken(token).userId
    next()
}
