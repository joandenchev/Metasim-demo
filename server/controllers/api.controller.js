import {searchCourses, editCourse as editCourseService} from "../services/api.service.js";

export async function getCourses(req, res) {
    const search = req.body.search

    const records = await searchCourses(search)
    res.json(records)
}

export async function editCourse(req, res) {
    const {id, title, description} = req.body

    await editCourseService(id, title, description)
    res.sendStatus(204)
}