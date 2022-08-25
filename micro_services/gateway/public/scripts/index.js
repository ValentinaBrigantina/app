const checkToken = async () => {
    if (localStorage.token) {
        const response = await fetch(`${constants.url}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: localStorage.token})
        })
        const data = await response.json()
        if (!data.name) {
            localStorage.removeItem('token')
        }
    }
}

const renderingNav = () => {
    const btnAddImage = document.getElementById('btnAddImage')
    const btnChat = document.getElementById('btnChat')
    const btnSignUp = document.getElementById('btnSignUp')
    const btnSignIn = document.getElementById('btnSignIn')
    const btnMyProfile = document.getElementById('btnMyProfile')

    if (localStorage.token) {
        btnSignUp.remove()
        btnSignIn.remove()
    } else {
        btnAddImage.remove()
        btnChat.remove()
        btnMyProfile.remove()
    }
}

const onloadHandler = async () => {
    await checkToken()
    renderingNav()
    const sidenavs = document.querySelectorAll('.sidenav')
    const dropdown = document.querySelector('.dropdown-trigger')
    M.Sidenav.init(sidenavs)
    M.Dropdown.init(dropdown)

    signOut.addEventListener('click', async () => {
       localStorage.removeItem('token')
    })
}

document.addEventListener("DOMContentLoaded", onloadHandler)
