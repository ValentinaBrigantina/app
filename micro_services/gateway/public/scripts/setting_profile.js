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

const name_user = document.getElementById('name_user')
const textOfButton = document.querySelector('.textOfBtn')
const form_setting_profile = document.getElementById('form_setting_profile')
name_user.focus();

(async () => {
   await correctValues()
}) ()

form_setting_profile.onsubmit = async (e) => {
    e.preventDefault()

    const dataUser = await getUserData()
    const userId = dataUser.id
    const response = await fetch(`${constants.url}/user/${userId}`, {
        method: 'PUT',
        body: new FormData(form_setting_profile)
    })
}

// document.addEventListener("DOMContentLoaded", correctValues)
