const createAlert = (message, href) => (
    `
        <div class="newsMessage">
            <h1 class="newsMessage">
                ${message}
            </h1>
            <button id="comeback" class="waves-effect waves-light btn" onclick="window.location.href = '${href}'">
                OK
            </button>
        </div>
    `
)

const submit_login = document.getElementById('submit_login')
const name_user = document.getElementById('name_user2')
const password = document.getElementById('password2')
let userData = {}

name_user.addEventListener('input', (e) => {
    userData.name = e.target.value
})

password.addEventListener('input', (e) => {
    userData.password = e.target.value
})

const submitForm = async () => {
    localStorage.removeItem('token')
    const response = await fetch(`${constants.url}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userData)
    })
    let data = await response.json()
    if (data.token) {
        localStorage.setItem('token', JSON.stringify(data.token))
    }
    userData = {}
    name_user.value = ''
    password.value = ''

    if (response.ok) {
        const form = document.querySelector('.form')
        const main = document.querySelector('.main')
        form.remove()
        main.insertAdjacentHTML('afterbegin', createAlert(`Hello, ${data.name}!<br/>Want to upload photos?`, 'http://127.0.0.1:3000/upload_image'))
        const button = document.getElementById('comeback')
        button.focus()
    }
}

submit_login.addEventListener('click', (e) => {
    e.preventDefault()
    if (!userData.password || !userData.name) {
        return
    }
    submitForm()
})