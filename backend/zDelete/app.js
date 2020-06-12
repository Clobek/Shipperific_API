let token;

const login = async () => {
    console.log('start')
    // if token already exists in local storage, don't make another one
    if(window.localStorage.getItem('token')) {
        console.log('token exists')
        token = JSON.parse(window.localStorage.getItem('token'))
    } else {
        console.log('no token')
        const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        body: JSON.stringify({username: 'bryce', password: 'ship'}),
        headers: {"Content-Type": "application/json"}
    })
    const newToken = await response.json()
    console.log(newToken)
    token = newToken
    window.localStorage.setItem('token', JSON.stringify(token))}
}

const test = async () => {
    const response = await fetch('http://localhost:3000/test', {
        method: "GET",
        headers: {
            "Authorization": `bearer ${token}`
        }
    })
    const result = await response.json()
    console.log(result)
}

const logout = () => {
    token = '';
    window.localStorage.removeItem('token')
}