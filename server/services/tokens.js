import jwt from "jsonwebtoken";
import {CustomError} from "../midlewares/errors.js";

export function signNewRefreshToken(payload) {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '45d' }
    )
}

export function signNewAccessToken(payload) {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
    )
}

export function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    } catch (e) {
        throw new CustomError('Invalid refresh token.', 401)
    }
}

export function verifyAccessToken(token) {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (e) {
        throw new CustomError('Invalid access token.', 401)
    }
}