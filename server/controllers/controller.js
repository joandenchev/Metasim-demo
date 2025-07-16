import {dirname} from "../config/settings.js";
import path from "node:path";


export function getImage(req, res){
    const image = path.join(dirname, 'assets', path.basename(req.params.name))
    res.sendFile(image)
}

export function pageHandler(req, res) {
    res.sendFile(path.join(dirname, 'dist', 'index.html'))
}