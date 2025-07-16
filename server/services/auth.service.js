import {compare} from "bcrypt";
import {deleteSessionByToken, findUserByEmail, getSessionsByUserId, insertRefreshToken} from "../models/database.js";
import {CustomError} from "../midlewares/errors.js";
import {signNewAccessToken, signNewRefreshToken, verifyRefreshToken} from "./tokens.js";


export async function authenticateByCredentials(email, password) {
    let user = await findUserByEmail(email)

    if (!(user && await compare(password, user.password))) {
        throw new CustomError('Invalid credentials.', 401)
    }

    return makeSession(user.id)
}

export async function authenticateByRefreshToken(token) {
    const userId = verifyRefreshToken(token).userId
    const sessions = await getSessionsByUserId(userId)
    let isSessionValid = false

    for (const session of sessions) {
        if (session.token === token) {
            isSessionValid = true
            break
        }
    }

    if (!isSessionValid) throw new CustomError('Session expired.', 401)

    await  deleteSessionByToken(token)
    return makeSession(userId)
}

export async function logoutInternally(token) {
    verifyRefreshToken(token)
    await deleteSessionByToken(token)
}


async function makeSession(userId){
    const refreshToken = signNewRefreshToken({userId: userId})
    await insertRefreshToken(refreshToken, userId)
    const accessToken = signNewAccessToken({userId: userId})
    return {
        refreshToken: refreshToken,
        accessToken: accessToken
    }
}