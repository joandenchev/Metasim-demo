import {Pool} from "pg";

const dbClient = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST ?? 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ?? 5432
})

async function connectToDb() {
    while (true) {
        try {
            await dbClient.connect()
            console.log('Connected to the database!')
            break
        } catch (e) {
            console.error('Connection to DB failed!')
            await new Promise(resolve => setTimeout(resolve, 2500))
        }
    }
} await connectToDb()


// returns only the first user
export async function findUserByEmail(email) {
    const r = await dbClient.query('SELECT * FROM auth.users WHERE email = $1', [email])
    return r.rows[0]
}

export async function insertRefreshToken(refreshToken, userId) {
    await dbClient.query('insert into auth.sessions ("token", "user_id") values($1, $2)', [refreshToken, userId])
}

export async function deleteSessionByToken(token) {
    await dbClient.query('delete from auth.sessions where token = $1', [token])
}

export async function getSessionsByUserId(id) {
    const sessions = await dbClient.query('select * from auth.sessions where user_id = $1', [id])
    return sessions.rows
}

export async function searchCourses(search) {
    const courses = await dbClient.query('select * from records.courses where title like $1 or description like $2', [`%${search}%`, `%${search}%`])
    return courses.rows
}

export async function updateTitle(id, title) {
    await dbClient.query('update records.courses set title = $1 where "id" = $2', [title, id])
}

export async function updateDescription(id, description) {
    await dbClient.query('update records.courses set description = $1 where "id" = $2', [description, id])
}