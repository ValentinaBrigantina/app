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

const createFormDelete = () => (
    `
        <div class="form">
            <h5 style="text-align: center">Are you sure you want to delete your account?</h5>
            <div class="row">
                <form class="col s10" id="deletion_confirmation">
                    <div class="flexBtn">
                        <input class="btn" id="back" type="button" value="Back" onclick="window.location.href = '${constants.url}/'">
                        <input class="btn" id="delete_profile" type="button" value="Delete" onclick="deleteProfile()">
                    </div>
                </form> 
            </div>
        </div>
    `
)

const getUserData = async () => {
    const response = await fetch(`${constants.url}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ 'token': localStorage.token })
    })
    const dataUser = await response.json()
    return dataUser
}

const deleteProfile = async () => {
    const userData = await getUserData()
    const response = await fetch(`${constants.url}/user/${userData.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
    if (response.ok) {
        const form = document.querySelector('.form')
        form.remove()
        main.insertAdjacentHTML('afterbegin', createAlert('Profile deleted', `${constants.url}/`))
        const button = document.getElementById('comeback')
        button.focus()
    }
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
    if (!result) {
        M.toast({html: 'Invalid password!', classes: 'alert'})
    }
    return result
}

const checkPassword = () => {
    if (!password.value) {
        M.toast({html: 'Enter your password!', classes: 'alert'})
    }
    return password.value
}

const forms = document.querySelectorAll('.form')
const main = document.querySelector('.main')
const name_user = document.getElementById('name_user')
const password = document.getElementById('password')
const btnDeleteProfile = document.getElementById('delete_profile')
const textOfButton = document.querySelector('.textOfBtn')
const form_setting_profile = document.getElementById('form_setting_profile')
name_user.focus();

(async () => {
   await correctValues()
}) ()

form_setting_profile.onsubmit = async (e) => {
    e.preventDefault()

    const userData = await getUserData()
    if (!checkPassword() || ! await isPassword(password.value, userData.id)) {
        return
    } else {
        const response = await fetch(`${constants.url}/user/${userData.id}`, {
            method: 'PUT',
            body: new FormData(form_setting_profile)
        })
        if (response.ok) {
            forms.forEach((form) => {
                form.remove()
            })
            main.insertAdjacentHTML('afterbegin', createAlert('Your changes are saved!', `${constants.url}/`))
            const button = document.getElementById('comeback')
            button.focus()
        }
    }
    
}

btnDeleteProfile.addEventListener('click', async () => {
    const userData = await getUserData()
    if (!checkPassword() || !await isPassword(password.value, userData.id)) {
        return
    }
    forms.forEach((form) => {
        form.remove()
    })
    main.insertAdjacentHTML('afterbegin', createFormDelete())
})