import express from "express";
import {login, logout, renewAccessToken} from "../controllers/auth.controller.js";

export const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/getNewAccessToken', renewAccessToken)