import express from "express";
import {pageHandler} from "../controllers/controller.js";


export const pageRouter = express.Router()

pageRouter.get(/.*/, pageHandler)