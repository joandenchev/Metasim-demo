import express from 'express'
import * as path from "node:path"
import * as https from "node:https"
import cookieParser from "cookie-parser"
import fs from "fs";
import {dirname, secure} from "./config/settings.js";
import {router} from "./routes/router.js";
import {globalErrorHandler} from "./midlewares/errors.js";


const server = express()

server.use(express.static(path.join(dirname, 'dist')))
server.use(express.json())
server.use(cookieParser())

server.use(router)
server.use(globalErrorHandler)

if (secure) useHttps()
else useHttp()


function useHttps() {
    https.createServer({
        pfx: fs.readFileSync(path.join(dirname, 'env', 'localhostCert.pfx')), passphrase: process.env.CERT_PASSPHRASE
    }, server).listen(process.env.SERVICE_PORT, () => {
        console.log('HTTPS server listening on port ' + process.env.SERVICE_PORT)
    })
}

function useHttp() {
    server.listen(process.env.SERVICE_PORT, () => {
        console.log("The server has started. Active port is " + process.env.SERVICE_PORT)
    })
}