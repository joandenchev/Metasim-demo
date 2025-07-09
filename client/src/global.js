import { reactive } from "vue"

// for bigger projects I would consider using better state management tools like Pinia or composables
export const global = reactive({
    authToken: false
})

export async function fetchAuth(url, options){
    options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${global.authToken}`
    }

    try{
        let res = await fetch(url, options)

        if (res.status === 401) {
            await renewAccessToken()
            options.headers = {
                ...(options.headers || {}),
                Authorization: `Bearer ${global.authToken}`
            }
            res = await fetch(url, options)
        }
        console.log(res.status)
        return res

    } catch (e) {
        throw new Error(e)
    }
}

export async function renewAccessToken(){
    try{
        const res = await fetch('/api/getNewAccessToken', { method: 'POST' })

        if (res.status !== 200 && res.status !== 204){
            if (res.status === 401){
                console.log(await res.text())
            } else {
                console.log('Error status: ' + res.status)
            }
            global.authToken = false
        } else {
            if (res.status === 204) return

            const resBody = await res.json()
            global.authToken = resBody.accessToken
        }
    } catch (e) {
        console.error('Error Fetching a new access token!\n', e.stack)
    }
}
