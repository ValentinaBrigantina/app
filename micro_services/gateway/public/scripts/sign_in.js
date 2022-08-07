const createAlert = (message, href) => {
    return `
        <div class="newsMessage">
            <h1 class="newsMessage">
                ${message}
            </h1>
            <button id="comeback" class="waves-effect waves-light btn" onclick="window.location.href = '${href}'">
                OK
            </button>
        </div>
    `
}

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
    let data = await response.json()
    
    if (data.token) {
        localStorage.setItem('token', JSON.stringify(data.token))
    }
    userDataLogin = {}
    name_user2.value = ''
    password2.value = ''

    if (response.ok) {
        const form = document.querySelector('.form')
        const main = document.querySelector('.main')
        form.remove()
        main.insertAdjacentHTML('afterbegin', createAlert(`Hello, ${data.name}!<br/>Want to upload photos?`, 'http://127.0.0.1:3000/upload_image'))
    }
})