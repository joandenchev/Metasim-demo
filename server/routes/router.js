import express from "express";
import {authRouter} from "./auth.router.js";
import {pageRouter} from "./page.router.js";
import {apiRouter} from "./api.router.js";


export const router = express.Router()

router.use('/api/auth', authRouter)
router.use('/api', apiRouter)
router.use('/', pageRouter)
