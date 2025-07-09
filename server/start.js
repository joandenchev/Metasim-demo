import express from 'express'
import * as path from "node:path"
import {fileURLToPath} from "node:url"
import * as https from "node:https"
import {Pool} from "pg"
import {compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import fs from "fs";

const dirname = path.dirname(fileURLToPath(import.meta.url))
config({path: path.join(dirname, 'env', '.env')})
const secure = process.env.USE_HTTP !== 'ALLOW' || process.argv[2] === '-s'

const server = express()
server.use(express.static(path.join(dirname, 'dist')))
server.use(express.json())
server.use(cookieParser())

const dbClient = new Pool({
    user: 'metasim',
    host: process.env.DB_HOST || 'localhost',
    database: 'metasim',
    password: '5633',
    port: 5432
})

async function connectToDb() {
    while (true){
        try {
            await dbClient.connect()
            console.log('Connected to the database!')
            break
        } catch (e) {
            console.error('Connection to DB failed!')
            await wait(1500)
        }
    }
}
connectToDb()

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



dbClient.on('error', (err) => {
    console.error('Error in PostgreSQL! ', err)
})

server.get('/api/image/:name', (req, res)=>{
    const name = path.basename(req.params.name)
    const image = path.join(dirname, 'assets', name)
    res.sendFile(image, err => {
        if (err) res.sendStatus(404)
    })
})

server.post('/api/login', async (req, res) => {

    const {email, password} = await req.body
    let records
    try{
        records = await dbClient.query('SELECT * FROM auth.users WHERE email = $1', [email])
    } catch (e){
        console.error('Error at /api/login selecting email\n', e.stack)
        res.sendStatus(500)
        return
    }

    if (records.rows.length > 0 && await compare(password, records.rows[0].password)) {

        const refreshToken = jwt.sign(
            { activeUser: email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '45d' }
        )

        try{
            await dbClient.query('insert into auth.sessions ("token", user_id) select $1, "id" from auth.users where email = $2', [refreshToken, email])
        } catch (e){
            console.error('Error at /api/login inserting new session\n', e.stack)
            res.sendStatus(500)
            return
        }

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: secure,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 45,
        })

        sendNewAccessToken(res, {activeUser: email})
    } else {
        res.sendStatus(401)
    }
})

server.post('/api/getNewAccessToken', async (req, res) => {
    if (req.cookies.refreshToken){
        let email
        try{
            const decoded = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET)
            email = decoded.activeUser
        }catch (e) {
            console.error('Error at /api/getNewAccessToken JWT verification\n', e.stack)
            res.status(401).send('Invalid refresh token.')
        }

        if (email){
            sendNewAccessToken(res, {activeUser: email})
        }

    } else {
        res.sendStatus(204)
    }
})

server.post('/api/logout', async (req, res) => {

    const token = req.cookies.refreshToken

    if (token) {
        try {
            await dbClient.query('delete from auth.sessions where token = $1', [token])
        } catch (e) {
            console.error('Error at /api/logout trying to delete session!\n', e.stack)
        }

        res.cookie('refreshToken', '', {
            httpOnly: true,
            secure: secure,
            sameSite: 'strict',
            expires: new Date(0),
        })
        res.sendStatus(204)
    } else {
        res.sendStatus(400)
    }
})

server.post('/api/courses', async (req, res) => {
    try {
        const body = await req.body
        const records = await dbClient.query('select * from records.courses where title like $1 or description like $2', [`%${body.search}%`, `%${body.search}%`])
        res.json(records.rows)
    } catch (e) {
        console.error('Error at /api/courses trying to get courses\n', e.stack)
        res.sendStatus(500)
    }
})
server.patch('/api/edit', (req, res)=>{
    authentication(req, res, async ()=>{
        try{
            const {id, title, description} = await req.body
            if (title) await dbClient.query('update records.courses set title = $1 where "id" = $2', [title, id])
            if (description) await dbClient.query('update records.courses set description = $1 where "id" = $2', [description, id])
            res.sendStatus(204)
        } catch (e){
            console.error('Error at /api/edit trying to edit a course\n', e.stack)
            res.sendStatus(500)
        }
    })
})

server.get('/*h', pageHandler)

if(secure){
    invokeHttps()
} else {
    server.listen(process.env.SERVICE_PORT, () => {
        console.log("The server has started. Active port is " + process.env.SERVICE_PORT)
    })
}

function pageHandler(req, res) {
    res.sendFile(path.join(dirname, 'dist', 'index.html'))
}
function invokeHttps() {
    https.createServer({
        pfx: fs.readFileSync(path.join(dirname, 'env', 'localhostCert.pfx')),
        passphrase: 'privatecert'
    }, server).listen(process.env.SERVICE_PORT, () => {
        console.log('HTTPS server listening on port ' + process.env.SERVICE_PORT)
    });
}

function sendNewAccessToken(res, payload) {
    const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
    )
    res.json({
        accessToken: accessToken
    })
}

function authentication(req, res, onSuccess){
    let activeUser
    try {
         activeUser = jwt.verify(req.headers.authorization.split(' ')[1], process.env.ACCESS_TOKEN_SECRET).activeUser
    } catch (e) {
        res.status(401).send('Expired or invalid access token.')
        return
    }
    onSuccess(activeUser)
}