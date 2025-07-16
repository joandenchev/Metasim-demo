import {searchCourses as searchCoursesInDb, updateDescription, updateTitle} from "../models/database.js";

export async function searchCourses(search){
    return searchCoursesInDb(search)
}

export async function editCourse(id, title, description){
    if (title) await updateTitle(id, title)
    if (description) await updateDescription(id, description)
}