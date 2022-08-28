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

const name_user = document.getElementById('name_user')
const textOfButton = document.querySelector('.textOfBtn')
name_user.focus();

(async () => {

    const dataUser = await getUserData()
    name_user.value = dataUser.name  

    if (dataUser.image) {
        textOfButton.replaceWith('Change avatar')
    }
}) ()
