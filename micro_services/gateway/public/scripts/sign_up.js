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

const name_user = document.getElementById('name_user')
const password = document.getElementById('password')
const submit_signup = document.getElementById('submit_signup')
let userData = {}

name_user.addEventListener('input', e => {
    userData.name = e.target.value
})

password.addEventListener('input', e => {
    userData.password = e.target.value
})

const submitForm = async () => {
    const response = await fetch(`${constants.url}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(userData)
    })
    userData = {}
    name_user.value = ''
    password.value = ''
    if (response.ok) {
        const form = document.querySelector('.form')
        const main = document.querySelector('.main')
        form.remove()
        main.insertAdjacentHTML('afterbegin', createAlert('Now you can login', 'http://127.0.0.1:3000/sign_in'))
        const button = document.getElementById('comeback')
        button.focus()
    }
}

submit_signup.addEventListener('click', submitForm)

password.addEventListener('keyup', e => {
    if(e.key === 'Enter') {
        submitForm()
    }
})