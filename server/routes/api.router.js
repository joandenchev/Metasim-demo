import express from "express";
import {getImage} from "../controllers/controller.js";
import {editCourse, getCourses} from "../controllers/api.controller.js";
import {authenticate} from "../midlewares/auth.js";


export const apiRouter = express.Router()

apiRouter.get('/image/:name', getImage)
apiRouter.post('/courses', getCourses)
apiRouter.patch('/edit', authenticate, editCourse)