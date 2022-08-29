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

const getUserData = async () => {
    const response = await fetch(`${constants.url}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({token: localStorage.token})
    })
    const dataUser = await response.json()
    return dataUser
}

const correctValues = async () => {
    const dataUser = await getUserData()
    name_user.value = dataUser.name  

    if (dataUser.image) {
        textOfButton.replaceWith('Change avatar')
    }
}

const isPassword = async (password, id) => {
    const response = await fetch(`${constants.url}/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            'password': password,
            'id': id,
        })
    })
    const result = await response.json()
    return result
}

const name_user = document.getElementById('name_user')
const password = document.getElementById('password')
const textOfButton = document.querySelector('.textOfBtn')
const form_setting_profile = document.getElementById('form_setting_profile')
name_user.focus();

(async () => {
   await correctValues()
}) ()

form_setting_profile.onsubmit = async (e) => {
    e.preventDefault()

    if (!password.value) {
        M.toast({html: 'Enter your password!', classes: 'alert'})
        return
    }
    const dataUser = await getUserData()
    const userId = dataUser.id
    const passwordVerification = await isPassword(password.value, userId)
    if (!passwordVerification) {
        M.toast({html: 'Invalid password!', classes: 'alert'})
        return
    }
    
    const response = await fetch(`${constants.url}/user/${userId}`, {
        method: 'PUT',
        body: new FormData(form_setting_profile)
    })
    if (response.ok) {
        const form = document.querySelector('.form')
        const main = document.querySelector('.main')
        form.remove()
        main.insertAdjacentHTML('afterbegin', createAlert('Your changes are saved!', 'http://127.0.0.1:3000/'))
        const button = document.getElementById('comeback')
        button.focus()
    }
}
