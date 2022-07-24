let userDataLogin = {}
name_user2.addEventListener('input', (event) => {
    userDataLogin.name = event.target.value
})

password2.addEventListener('input', (event) => {
    userDataLogin.password = event.target.value
})

submit_login.addEventListener('click', async () => {

    localStorage.removeItem('token')

    const response = await fetch(`${constants.url}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userDataLogin)
    })
    let token = await response.json()
    
    if (token.token) {
        localStorage.setItem('token', JSON.stringify(token.token))
    }
    userDataLogin = {}
    name_user2.value = ''
    password2.value = ''
})