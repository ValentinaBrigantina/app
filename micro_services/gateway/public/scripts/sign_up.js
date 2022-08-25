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
const form_sign_up = document.getElementById('form_sign_up')
let userData = {}

name_user.addEventListener('input', e => {
    userData.name = e.target.value
})

password.addEventListener('input', e => {
    userData.password = e.target.value
})

form_sign_up.onsubmit = async (e) => {
    e.preventDefault()
    if (!userData.password || !userData.name) {
        return
    }
    const response = await fetch(`${constants.url}/user`, {
        method: 'POST',
        body: new FormData(form_sign_up)
    })
    if (response.ok) {
        const form = document.querySelector('.form')
        const main = document.querySelector('.main')
        form.remove()
        main.insertAdjacentHTML('afterbegin', createAlert('Now you can login', 'http://127.0.0.1:3000/sign_in'))
        const button = document.getElementById('comeback')
        button.focus()
    }
}