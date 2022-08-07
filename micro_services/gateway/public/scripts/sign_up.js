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

let userData = {}
    name_user.addEventListener('input', (event) => {
        userData.name = event.target.value
    })
    
    password.addEventListener('input', (event) => {
        userData.password = event.target.value
    })
    
    submit_signup.addEventListener('click', async () => {
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
        }
    })