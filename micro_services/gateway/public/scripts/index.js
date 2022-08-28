const checkToken = async () => {
    if (localStorage.token) {
        const response = await fetch(`${constants.url}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: localStorage.token})
        })
        const dataUser = await response.json()
        if (!dataUser.name) {
            localStorage.removeItem('token')
        }
        return dataUser
    }
}

const renderAvatar = (avatar, name) => (
        `
            <div class="avatar">
                <img class="responsive-img" src="${avatar}" alt="${name}">
            </div>
        
        `
)

const renderingNav = async () => {
    const btnAddImage = document.getElementById('btnAddImage')
    const btnChat = document.getElementById('btnChat')
    const btnSignUp = document.getElementById('btnSignUp')
    const btnSignIn = document.getElementById('btnSignIn')
    const btnMyProfile = document.getElementById('btnMyProfile')

    const dataUser = await checkToken()

    if (localStorage.token) {
        btnSignUp.remove()
        btnSignIn.remove()
console.log('dataUser', dataUser);
        const image = dataUser.image ? dataUser.image : "images/service/ext.png"
        const avatar = renderAvatar(image, dataUser.name)
        btnMyProfile.insertAdjacentHTML('beforeend', avatar)

    } else {
        btnAddImage.remove()
        btnChat.remove()
        btnMyProfile.remove()
    }
}

const onloadHandler = async () => {
    await renderingNav()
    const sidenavs = document.querySelectorAll('.sidenav')
    const dropdown = document.querySelector('.dropdown-trigger')
    M.Sidenav.init(sidenavs)
    M.Dropdown.init(dropdown)

    signOut.addEventListener('click', async () => {
       localStorage.removeItem('token')
    })
}

document.addEventListener("DOMContentLoaded", onloadHandler)
