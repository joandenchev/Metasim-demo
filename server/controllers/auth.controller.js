import {secure} from "../config/settings.js";
import {authenticateByRefreshToken, authenticateByCredentials, logoutInternally} from "../services/auth.service.js";


export async function login(req, res) {
    const {email, password} = req.body

    const tokens = await authenticateByCredentials(email, password)
    sendTokens(res, tokens)
}

export async function logout(req, res) {
    const token = req.cookies.refreshToken
    await logoutInternally(token)

    res.cookie('refreshToken', '', {
        httpOnly: true, secure: secure, sameSite: 'strict', expires: new Date(0),
    })
    res.sendStatus(204)
}

export async function renewAccessToken(req, res) {
    const refreshToken = req.cookies.refreshToken

    const tokens = await authenticateByRefreshToken(refreshToken)
    sendTokens(res, tokens)
}


function sendTokens(res, tokens) {
    res.cookie('refreshToken', tokens.refreshToken, {
        path: '/api/auth',
        httpOnly: true,
        secure: secure,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 45,
    })

    res.json({accessToken: tokens.accessToken})
}