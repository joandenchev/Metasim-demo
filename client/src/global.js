import {reactive} from "vue"

// for bigger projects I would consider using better state management tools like Pinia or composables
export const global = reactive({
    authToken: false
})

export async function fetchAuth(url, options) {
    options.headers = {
        ...(options.headers || {}), Authorization: `Bearer ${global.authToken}`
    }


    let res = await fetch(url, options)

    if (res.status === 401) {
        await renewAccessToken()
        options.headers = {
            ...(options.headers || {}), Authorization: `Bearer ${global.authToken}`
        }
        res = await fetch(url, options)
    }

    return res
}

export async function renewAccessToken() {
    try {
        const res = await fetch('/api/auth/getNewAccessToken', {method: 'POST'})

        if (!res.ok) {
            console.log('Error status: ' + res.status)
            global.authToken = false
        } else {
            const resBody = await res.json()
            global.authToken = resBody.accessToken
        }
    } catch (e) {
        console.error('Error Fetching a new access token!\n', e.stack)
    }
}
